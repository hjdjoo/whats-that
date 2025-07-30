import { Buffer } from "buffer";
import { type EncryptedData } from "@src/types";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toB64(data: Uint8Array | Buffer) {
  return Buffer.from(data).toString("base64");
}

function toBuffer(data: string) {
  return Buffer.from(data, "base64");
}

async function deriveAesKey(passphrase: string, salt: Uint8Array) {
  // generate crypto key from hashing password;
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  // return AES key derived from crypto key;
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100_000,
      hash: "SHA-256"
    },
    cryptoKey,
    {
      name: "AES-GCM",
      length: 256
    },
    false,
    ["encrypt", "decrypt"]
  )

}

export async function encryptApiKey(passphrase: string, apiKey: string) {

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const aesKey = await deriveAesKey(passphrase, salt);

  // encrypt apiKey with AES Key
  const cipherBuffer = Buffer.from(await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv
    },
    aesKey,
    encoder.encode(apiKey)))

  return {
    salt: toB64(salt),
    iv: toB64(iv),
    cipher: cipherBuffer.toString("base64"),
  } as EncryptedData
};

// accept encrypted key;
export async function decryptApiKey(data: EncryptedData, passphrase: string) {
  // get aes key, salt, and iv from data;
  const { salt, iv, cipher } = data;

  const aesKey = await deriveAesKey(passphrase, toBuffer(salt));
  // use to decrypt api key with crypto.subtle.decrypt;
  const plainBuffer = Buffer.from(await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: toBuffer(iv)
    },
    aesKey,
    toBuffer(cipher),
  ));

  // return string from base 64.
  return decoder.decode(plainBuffer);

}