import React, { useState } from "react";

export default function useSelection() {
  const [text, setText] = useState<string>("");
  const [buttonCss, setButtonCss] = useState({
    left: "0",
    top: "0",
  });

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
  return {
    text,
    buttonCss,
  };
}
