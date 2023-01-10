import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";

function Inject() {
  const [text, setText] = useState<string>("");
  const [buttonCss, setButtonCss] = useState({
    left: "0",
    top: "0",
  });
  const [textArea, setTextArea] = useState<string>("");
  const handleText = (e) => {
    if (e.key == "Enter") {
      // @ts-ignore
      setTextArea(document.activeElement.value + "\n");
    }
  };
  const handleFocusIn = (e) => {
    // @ts-ignore
    const tempMeasure = e.path[0].getBoundingClientRect();
    console.log({ tempMeasure: e.path[0] });
    setButtonCss({
      top: tempMeasure.top + e.path[0].offsetTop,
      left: tempMeasure.left + e.path[0].offsetWidth,
    });

    if (
      document.activeElement.nodeName == "TEXTAREA" ||
      document.activeElement.nodeName == "INPUT"
    ) {
      document.addEventListener("keypress", handleText);
    }
  };
  const handleFocusOut = () => {
    setTextArea("");
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
  document.onmouseup = (e) => {
    const textTemp = getSelectedText();

    setText(textTemp);
    if (buttonCss.left == "0") {
      setButtonCss({
        left: e.pageX + "px",
        top: e.pageY + "px",
      });
    }
  };
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

  return (
    <div>
      {text}
      {textArea}
      {text != "" && (
        <button style={{ position: "absolute", ...buttonCss }}>Click</button>
      )}
      {textArea != "" && (
        <button style={{ position: "absolute", ...buttonCss }}>Click</button>
      )}
      <br />- Loaded from text selection
    </div>
  );
}
window.addEventListener("load", () => {
  console.log("loaded");

  const injectDOM = document.createElement("div");
  injectDOM.className = "inject";
  injectDOM.style.textAlign = "center";
  document.body.appendChild(injectDOM);
  ReactDOM.render(<Inject />, injectDOM);
  // ReactDOM.render(<Inject />, document.getElementById('inject'));
});
