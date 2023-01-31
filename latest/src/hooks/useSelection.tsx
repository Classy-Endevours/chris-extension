import React, { useState } from "react";

export default function useSelection() {
  const [text, setText] = useState<string>("");
  const [buttonCss, setButtonCss] = useState({
    display: "none",
    left: "0",
    top: "0",
  });

  document.onmouseup = (e) => {
    const textTemp = getSelectedText();

    setText(textTemp);
    if (textTemp !== "") {
      if (buttonCss.left == "0") {
        setButtonCss({
          display: "block",
          left: e.pageX + "px",
          top: e.pageY + "px",
        });
      }
    } else {
      setButtonCss({
        display: "none",
        left: "0",
        top: "0",
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
