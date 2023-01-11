import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
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

function Inject() {
  const { text, buttonCss } = useSelection();
  const { textArea, buttonCssTextArea } = useChange();
  console.log({ buttonCssTextArea });
  const openWebsite = () => {
    window.open("https://whale-app-vsgoj.ondigitalocean.app/", "_blank");
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
          sx={{ position: "absolute", ...buttonCssTextArea }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            key="Open Website"
            icon={
              <IconButton onClick={openWebsite}>
                <LaunchIcon />
              </IconButton>
            }
            tooltipTitle={"Open Website"}
          />
          <SpeedDialAction
            key="Open Modal"
            icon={
              <IconButton onClick={handleOpen}>
                <WebIcon />
              </IconButton>
            }
            tooltipTitle={"Open Modal"}
          />
        </SpeedDial>
      )}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", ...buttonCssTextArea }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key="Open Website"
          icon={
            <IconButton onClick={openWebsite}>
              <LaunchIcon />
            </IconButton>
          }
          tooltipTitle={"Open Website"}
        />
        <SpeedDialAction
          key="Open Modal"
          icon={
            <IconButton onClick={handleOpen}>
              <WebIcon />
            </IconButton>
          }
          tooltipTitle={"Open Modal"}
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
