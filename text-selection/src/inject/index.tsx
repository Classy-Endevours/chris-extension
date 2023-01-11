import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import useChange from "../hooks/useChange";
import useSelection from "../hooks/useSelection";

function Inject() {
  const { text, buttonCss } = useSelection();
  const { textArea, buttonCssTextArea } = useChange();

  return (
    <div>
      {text}
      {textArea}
      {text != "" && (
        <button style={{ position: "absolute", ...buttonCss }}>Click</button>
      )}
      <button style={{ position: "absolute", ...buttonCssTextArea }}>
        Click
      </button>
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
