import React from 'react'
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

const Actions = ({ css }) => {
    const openWebsite = () => {
        window.open("https://whale-app-vsgoj.ondigitalocean.app/", "_blank");
      };
  return (
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
      </SpeedDial>
  )
}

export default Actions