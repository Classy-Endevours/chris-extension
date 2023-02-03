import React, { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Modal from "@mui/material/Modal";
// @ts-ignore
import { ScreenCapture } from "react-screen-capture";
import ScreenshotIcon from "@mui/icons-material/Screenshot";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Actions = ({ css, extensionProviders, text }) => {
  const [selectedText, setSelectedText] = useState(text);
  const [textLoader, setTextLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [extType, setExtType] = useState({
    selectedObject: "" as any,
    type: "",
  });
  const [apiResponse, setApiResponse] = useState<any>("");
  const snippingRef = useRef();
  const [screenCaptureState, setScreenCaptureState] = useState<any>("");

  function gotMessage(message, sender, sendResponse) {
    console.log({ message });

    if (message.snipping === "startSnipping") {
      // @ts-ignore
      snippingRef.current.click();
    }

    // autoChat(message.tme, message.txt, message.rid);
  }
  // Listen to messages sent from other parts of the extension.
  useEffect(() => {
    chrome.runtime.onMessage.addListener(gotMessage);
  }, []);

  const handleScreenCapture = (screenCapture: any) => {
    setScreenCaptureState(screenCapture);
    handleOpen();
  };
  console.log({ screenCaptureState });

  useEffect(() => {
    setSelectedText(text);
  }, [text]);

  const fetchData = async (data: any) => {
    try {
      setTextLoader(true);
      const response = await axios({
        method: extType.selectedObject.webhookMethod,
        url: extType.selectedObject.webhookUrl,
        data,
      });
      setApiResponse(response.data);
      setTextLoader(false);
    } catch (error) {
      alert(error.message);
      setTextLoader(false);
    }
  };

  const openWebsite = (selectedObject: any, type: string) => {
    // window.open(url, "_blank");
    setExtType({ selectedObject, type });
    handleOpen();
  };
  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", ...css }}
        icon={<SpeedDialIcon />}
        direction="down"
        FabProps={{
          size: "small",
          onClick: () => {},
        }}
      >
        {extensionProviders.map((item) => (
          <SpeedDialAction
            key={item.title}
            icon={
              <IconButton
                onClick={() => openWebsite(item, "text")}
                size="small"
              >
                {/* <LaunchIcon fontSize="small" /> */}
                <img
                  src={`http://localhost:8080/api/s3/${item.imageKey}`}
                  width="25px"
                  height="25px"
                  alt={item.title}
                />
              </IconButton>
            }
            tooltipTitle={item.title}
            FabProps={{
              size: "small",
            }}
          />
        ))}
      </SpeedDial>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box display="flex" flexDirection="column">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                mb={2}
              >
                Extension
              </Typography>
              <Box display="flex" flexDirection="column">
                {extType.type === "text" ? (
                  <>
                    <Box display="flex">
                      <TextField
                        label={extType.selectedObject.json.text}
                        size="small"
                        value={selectedText}
                        onChange={(
                          e: React.ChangeEvent<
                            HTMLTextAreaElement | HTMLInputElement
                          >
                        ) => setSelectedText(e.target.value)}
                      />

                      <Button
                        sx={{ ml: 2 }}
                        onClick={() =>
                          fetchData({
                            [extType.selectedObject.json.text]: selectedText,
                          })
                        }
                      >
                        Submit
                      </Button>
                    </Box>
                    <Box display="flex">
                      {textLoader ? (
                        <CircularProgress />
                      ) : (
                        <Typography>
                          {extType.selectedObject.output.text.isArray
                            ? apiResponse.map(
                                (item: any) =>
                                  item[extType.selectedObject.output.text.value]
                              )
                            : apiResponse[
                                extType.selectedObject.output.text.value
                              ]}
                        </Typography>
                      )}
                    </Box>
                  </>
                ) : (
                  <>
                    <Box display="flex">
                      {screenCaptureState !== "" && (
                        <img
                          src={screenCaptureState}
                          alt="react-screen-capture"
                          width="50%"
                          style={{ position: "relative" }}
                        />
                      )}
                      <Button
                        sx={{ ml: 2 }}
                        onClick={() =>
                          fetchData({
                            [extType.selectedObject.json.text]: selectedText,
                          })
                        }
                      >
                        Submit
                      </Button>
                    </Box>
                    <Box display="flex">
                      {textLoader ? (
                        <CircularProgress />
                      ) : (
                        <Typography>
                          {extType.selectedObject.output.image.isArray
                            ? apiResponse.map(
                                (item: any) =>
                                  item[
                                    extType.selectedObject.output.image.value
                                  ]
                              )
                            : apiResponse[
                                extType.selectedObject.output.image.value
                              ]}
                        </Typography>
                      )}
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
      {/* @ts-ignore */}
      <ScreenCapture onEndCapture={handleScreenCapture}>
        {({ onStartCapture }) => (
          <IconButton
            onClick={onStartCapture}
            size="small"
            ref={snippingRef}
            sx={{ display: "none" }}
          >
            <ScreenshotIcon fontSize="small" />
          </IconButton>
        )}
      </ScreenCapture>
    </>
  );
};

export default Actions;
