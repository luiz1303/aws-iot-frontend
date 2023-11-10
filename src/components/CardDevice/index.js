import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

import { StyledCardDevice, DeviceName, DeviceStatus } from "./styles";

const CardDevice = () => {
  return (
    <StyledCardDevice>
      <FontAwesomeIcon icon={faLightbulb} size="2x" color="white" />
      <DeviceName>Device Name</DeviceName>
      <DeviceStatus>Device Status</DeviceStatus>
    </StyledCardDevice>
  );
};

export default CardDevice;
