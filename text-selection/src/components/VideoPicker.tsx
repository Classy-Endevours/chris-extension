import { Button } from "@mui/material";
import React from "react";
function VideoFilePicker({ showVideo, handleChange, children }) {
  const FileInput = () => (
    <Button variant="contained" component="label">
      Upload File
      <input
        hidden
        onChange={handleChange}
        type="file"
        id="x"
        accept="video/mp4"
      />
    </Button>
  );

  return showVideo ? (
    <>
      {" "}
      {children} <FileInput />
    </>
  ) : (
    <FileInput />
  );
}

export default VideoFilePicker;
