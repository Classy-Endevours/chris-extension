import React, { useEffect, useState } from "react";

export default function useChange() {
  const [buttonCss, setButtonCss] = useState({
    left: "0",
    top: "0",
    display: "none",
  });
  const [textArea, setTextArea] = useState<string>("");

  const handleText = (e) => {
    // @ts-ignore
    setTextArea(document.activeElement.value);
  };
  const handleFocusIn = (e) => {
    // @ts-ignore
    const tempMeasure = e.path[0].getBoundingClientRect();

    if (
      document.activeElement.nodeName == "TEXTAREA" ||
      document.activeElement.nodeName == "INPUT"
    ) {
      setButtonCss({
        display: "block",
        top: tempMeasure.top + e.path[0].offsetTop,
        left: tempMeasure.left + e.path[0].offsetWidth,
      });
      // @ts-ignore
      document.addEventListener("keypress", handleText);
    }
  };

  const handleFocusOut = () => {
    setTextArea("");

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
