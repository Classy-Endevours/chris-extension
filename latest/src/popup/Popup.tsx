import React, { useEffect, useState } from "react";
// @ts-ignore
import { ScreenCapture } from "react-screen-capture";
import ScreenshotIcon from "@mui/icons-material/Screenshot";
import IconButton from "@mui/material/IconButton";

export default function Popup() {


  const handleScreenCapture = (screenCapture: any) => {
    console.log('change');
    
    // event is triggered in inject.js whenever below code is run
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { snipping: "startSnipping" },
        function (response) {}
      );
    });
  };
  return (
    <div className="popupContainer">
      {/* @ts-ignore */}
      <IconButton onClick={handleScreenCapture} size="small">
        <ScreenshotIcon fontSize="small" />
      </IconButton>
    </div>
  );
}
