import React from "react";
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

const Actions = ({ css, extensionProviders }) => {
  const openWebsite = (url: string) => {
    window.open(url, "_blank");
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
      {extensionProviders.map((item) => (
        <SpeedDialAction
          key={item.title}
          icon={
            <IconButton
              onClick={() => openWebsite(item.webhookUrl)}
              size="small"
            >
              {/* <LaunchIcon fontSize="small" /> */}
              <img
                src={`http://localhost:8080/api/s3/${item.json.image}`}
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
  );
};

export default Actions;
