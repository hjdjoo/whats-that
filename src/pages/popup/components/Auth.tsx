import { useEffect, useState } from "react"

export default function Auth() {

  const [keyRequired, setKeyRequired] = useState<boolean>(true);

  useEffect(() => {

    if (!localStorage.getItem("openai-key-hash")) {
      setKeyRequired(true)
    } else (
      setKeyRequired(false)
    );

  }, []);

  return (
    <form id="wt-auth-form"
      action="submit"
      className="flex-col items-center">
      {
        keyRequired &&
        <label htmlFor="wt-openai-key">
          {`Enter your OpenAI API Key: `}
          <input id="wt-key" type="text" />
        </label>
      }
      <label htmlFor="wt-pass">
        {keyRequired ? "Set an Extension Password" : "Enter Your Extension Password: "}
        <input id="wt-pass" type="password" />
      </label>
      <button>
        Submit
      </button>
    </form>
  )

}