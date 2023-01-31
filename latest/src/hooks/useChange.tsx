import React, { useEffect, useState } from "react";

export default function useChange() {
  const [buttonCss, setButtonCss] = useState({
    left: "0",
    top: "0",
    display: "none",
  });
  const [textArea, setTextArea] = useState<string>("");

  const handleText = (e) => {
    console.log({
      v: e.target.value,
    });
    setTextArea(e.target.value);
  };
  const handleFocusIn = (e) => {
    if (
      document.activeElement.nodeName == "TEXTAREA" ||
      document.activeElement.nodeName == "INPUT"
    ) {
      // @ts-ignore
      const tempMeasure = document.activeElement.getBoundingClientRect();
      setButtonCss({
        display: "block",
        top: `${tempMeasure.top + tempMeasure.height}px`,
        left: `${tempMeasure.left + tempMeasure.width}px`,
      });
      // @ts-ignore
      document.addEventListener("keypress", handleText);
    }
  };

  const handleFocusOut = () => {
    // setTextArea("");

    // @ts-ignore
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
  return {
    textArea,
    buttonCssTextArea: buttonCss,
  };
}
