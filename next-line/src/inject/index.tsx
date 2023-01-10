import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";

function Inject() {
  const [text, setText] = useState<string>("");
  const [active, setActive] = useState(document.activeElement);
  const handleText = (e) => {
    if (e.key == "Enter") {
      // @ts-ignore
      setText(document.activeElement.value + "\n");
    }
  };
  const handleFocusIn = () => {
    if (
      document.activeElement.nodeName == "TEXTAREA" ||
      document.activeElement.nodeName == "INPUT"
    ) {
      document.addEventListener("keypress", handleText);
    }
  };
  const handleFocusOut = () => {
    setText("");
    document.removeEventListener("keypress", handleText);
  };
  useEffect(() => {
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return <div>{text}<br />- Loaded from next line</div>;
}
window.addEventListener("load", () => {
  console.log("loaded");

  const injectDOM = document.createElement("div");
  injectDOM.className = "inject";
  injectDOM.style.textAlign = "center";
  injectDOM.style.position = "absolute";
  injectDOM.style.top = "400px";
  injectDOM.style.left = "100px";
  document.body.appendChild(injectDOM);
  ReactDOM.render(<Inject />, injectDOM);
  // ReactDOM.render(<Inject />, document.getElementById('inject'));
});
