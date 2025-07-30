// import { createCipheriv, createDecipheriv, pbkdf2Sync } from "crypto";
// import randomBytes from "randombytes"

// type EncryptionData = {
//   cipher: Buffer<ArrayBuffer>
//   salt: Buffer<ArrayBufferLike>
//   iv: Buffer<ArrayBufferLike>
//   tag: Buffer<ArrayBufferLike>
// }

// export function encryptApiKey(passphrase: string, apiKey: string) {
//   const salt = randomBytes(16);
//   const passKey = pbkdf2Sync(passphrase, salt, 100_000, 32, "sha256");
//   const iv = randomBytes(12);
//   const cipher = createCipheriv("aes-256-gcm", passKey, iv);

//   const tag = cipher.getAuthTag();

//   const cipherText = Buffer.concat([
//     cipher.update(apiKey, "utf8"),
//     cipher.final()
//   ])

//   return {
//     cipher: cipherText,
//     salt: salt,
//     iv: iv,
//     tag: tag,
//   }

// }

// export function decryptApiKey(data: EncryptionData, passphrase: string) {

//   const { cipher, salt, iv, tag } = data;
//   const key = pbkdf2Sync(passphrase, salt, 100_000, 32, "sha256");
//   const decipher = createDecipheriv("aes-256-gcm", key, iv);

//   decipher.setAuthTag(tag);

//   const plaintext = Buffer.concat([
//     decipher.update(cipher),
//     decipher.final()
//   ]);

//   return plaintext.toString("utf8");

// }