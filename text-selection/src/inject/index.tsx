import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";

function Inject() {
  const [text, setText] = useState<string>("");
  useEffect(() => {
    document.onmouseup = () => {
      const textTemp = getSelectedText();
      if (textTemp != "") setText(textTemp);
    };
    document.onmousedown = () => {
      setText("");
    };
  }, []);
  const getSelectedText = () => {
    if (window.getSelection) {
      return window.getSelection().toString();
      //   @ts-ignore
    } else if (document?.selection) {
      //   @ts-ignore
      return document?.selection.createRange().text;
    }
    return "";
  };

  return <div>{text}<br />- Loaded from text selection</div>;
}
window.addEventListener("load", () => {
  console.log("loaded");

  const injectDOM = document.createElement("div");
  injectDOM.className = "inject";
  injectDOM.style.textAlign = "center";
  injectDOM.style.position = "absolute";
  injectDOM.style.top = "100px";
  injectDOM.style.left = "100px";
  document.body.appendChild(injectDOM);
  ReactDOM.render(<Inject />, injectDOM);
  // ReactDOM.render(<Inject />, document.getElementById('inject'));
});
