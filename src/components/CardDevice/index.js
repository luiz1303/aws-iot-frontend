/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { Text } from "@aws-amplify/ui-react";

import S from "./styles";

const CardDevice = ({
  handleChangeDevice,
  deviceName,
  active,
  loading,
  ...rest
}) => {
  const [lastState, setLastState] = useState(active);

  useEffect(() => {
    if (active !== lastState) {
      setLastState(active);
    }
  }, [active]);

  if (loading) {
    return (
      <S.CardSkeleton lastState={lastState}>
        <S.Spinner />
      </S.CardSkeleton>
    );
  }

  return (
    <S.CardDevice
      onClick={!loading ? () => handleChangeDevice() : null}
      active={active}
    >
      <FontAwesomeIcon icon={faLightbulb} size="2x" color="white" />
      <S.DeviceInfo>
        <S.DeviceName>{deviceName}</S.DeviceName>
        <Text color="white" fontWeight="400">
          {active ? "Ligado" : "Desligado"}
        </Text>
      </S.DeviceInfo>
    </S.CardDevice>
  );
};

export default CardDevice;
