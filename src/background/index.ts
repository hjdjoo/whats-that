console.log("background script loaded");

import browser from "webextension-polyfill";
import { decryptApiKey } from "@src/utils/crypto.web";
import { isExtMessage } from "@src/utils/isExtMessage";

let apiKey: string;

browser.runtime.onMessage.addListener((message: any, _sender, sendMessage) => {

  if (isExtMessage(message)) {
    switch (message.type) {
      case "auth:login":

        const { token } = message.data;
        browser.storage.local.get("wt-credentials")
          .then((res) => {
            const encryptedData = JSON.parse(String(res));
            decryptApiKey(encryptedData, token)
              .then((res) => {
                apiKey = res;
                console.log("api key saved locally: ", apiKey)
                sendMessage("API Key decrypted and stored in memory.")
              });
          })
          .catch((e) => {
            throw new Error(`${e}`)
          })
    }
  };

  return true;
})
