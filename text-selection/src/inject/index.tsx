import React, { useEffect, useState, createElement } from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import useChange from "../hooks/useChange";
import useSelection from "../hooks/useSelection";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import WebIcon from "@mui/icons-material/Web";
import LaunchIcon from "@mui/icons-material/Launch";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// @ts-ignore
import { ScreenCapture } from "react-screen-capture";
import ScreenshotIcon from "@mui/icons-material/Screenshot";

function Inject() {
  const { text, buttonCss } = useSelection();
  const { textArea, buttonCssTextArea } = useChange();
  const [screenCaptureState, setScreenCaptureState] = useState<any>("");
  console.log({ buttonCss });
  const openWebsite = () => {
    window.open("https://whale-app-vsgoj.ondigitalocean.app/", "_blank");
  };

  const handleScreenCapture = (screenCapture: any) => {
    setScreenCaptureState(screenCapture);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      {text}
      {textArea}
      {text != "" && (
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", ...buttonCss }}
          icon={<SpeedDialIcon />}
          direction="down"
          FabProps={{
            size: "small",
            onClick: () => {},
          }}
        >
          <SpeedDialAction
            key="Open Website"
            icon={
              <IconButton onClick={openWebsite} size="small">
                <LaunchIcon fontSize="small" />
              </IconButton>
            }
            tooltipTitle={"Open Website"}
            FabProps={{
              size: "small",
            }}
          />
          <SpeedDialAction
            key="Open Modal"
            icon={
              <IconButton onClick={handleOpen} size="small">
                <WebIcon fontSize="small" />
              </IconButton>
            }
            tooltipTitle={"Open Modal"}
            FabProps={{
              size: "small",
            }}
          />

          <SpeedDialAction
            key="Screenshot"
            icon={
              // @ts-ignore
              <ScreenCapture onEndCapture={handleScreenCapture}>
                {({ onStartCapture }) => (
                  <IconButton onClick={onStartCapture} size="small">
                    <ScreenshotIcon fontSize="small" />
                  </IconButton>
                )}
              </ScreenCapture>
            }
            tooltipTitle="Screenshot"
            FabProps={{
              size: "small",
            }}
          />
        </SpeedDial>
      )}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", ...buttonCssTextArea }}
        icon={<SpeedDialIcon />}
        direction="down"
        FabProps={{
          size: "small",
          onClick: () => {},
        }}
      >
        <SpeedDialAction
          key="Open Website"
          icon={
            <IconButton onClick={openWebsite} size="small">
              <LaunchIcon fontSize="small" />
            </IconButton>
          }
          tooltipTitle={"Open Website"}
          FabProps={{
            size: "small",
          }}
        />
        <SpeedDialAction
          key="Open Modal"
          icon={
            <IconButton onClick={handleOpen} size="small">
              <WebIcon fontSize="small" />
            </IconButton>
          }
          tooltipTitle={"Open Modal"}
          FabProps={{
            size: "small",
          }}
        />
        <SpeedDialAction
          key="Screenshot"
          icon={
            // @ts-ignore
            <ScreenCapture onEndCapture={handleScreenCapture}>
              {({ onStartCapture }) => (
                <IconButton onClick={onStartCapture} size="small">
                  <ScreenshotIcon fontSize="small" />
                </IconButton>
              )}
            </ScreenCapture>
          }
          tooltipTitle="Screenshot"
          FabProps={{
            size: "small",
          }}
        />
      </SpeedDial>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              background: "#ffffff",
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField label="Text Area" value={textArea} />
            <Box display="flex" flexDirection="row-reverse">
              <Button variant="contained" sx={{ m: 1 }}>
                Save
              </Button>
              <Button variant="outlined" sx={{ m: 1 }}>
                Reset
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      {screenCaptureState != "" && (
        <img src={screenCaptureState} alt="react-screen-capture" />
      )}
      <br />- Loaded from text selection
    </div>
  );
}
window.addEventListener("load", () => {
  console.log("loaded");
  const injectDOM = createElement(Inject, {
    name: "Inject",
    style: {
      textAlign: "center",
    },
    className: "inject",
  });
  const docRoot = document.createElement("div");
  docRoot.setAttribute("id", "inject-container");
  document.body.appendChild(docRoot);
  const root = createRoot(document.getElementById("inject-container"));
  root.render(injectDOM);
  // ReactDOM.render(<Inject />, document.getElementById('inject'));
});
