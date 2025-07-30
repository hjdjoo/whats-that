import { useEffect, useState, type FormEvent } from "react";
import { encryptApiKey } from "@src/utils/crypto.web";
import browser from "webextension-polyfill";

export default function Auth() {

  const [keyRequired, setKeyRequired] = useState<boolean>(true);

  useEffect(() => {
    if (!localStorage.getItem("wt-credentials")) {
      setKeyRequired(true)
    } else (
      setKeyRequired(false)
    );
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const apiKey = formData.get("wt-api-key") as string;
    const pass = formData.get("wt-pass") as string;

    switch (keyRequired) {

      case true:
        if (!apiKey) {
          throw new Error("Missing API Key");
        } else if (!pass) {
          throw new Error("Missing passcode!");
        }

        const encryptedData = encryptApiKey(pass, apiKey);

        console.log(encryptedData);

        browser.storage.local.set({
          "wt-credentials": JSON.stringify(encryptedData)
        });
        setKeyRequired(false);
        break;
      case false:
        browser.runtime.sendMessage({
          type: "auth:login",
          data: {
            token: pass
          }
        })
    };
  };

  return (
    <form id="wt-auth-form"
      action="submit"
      onSubmit={handleSubmit}
      className="flex-col items-center">
      {
        keyRequired &&
        <label htmlFor="wt-api-key">
          {`Enter your OpenAI API Key: `}
          <input id="wt-api-key"
            type="text" />
        </label>
      }
      <label htmlFor="wt-pass">
        {keyRequired ? "Set an Extension Password" : "Enter Your Extension Password: "}
        <input id="wt-pass"
          type="password" />
      </label>
      <button type="submit">
        Submit
      </button>
    </form>
  )
}