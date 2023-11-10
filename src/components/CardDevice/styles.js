import { styled } from "styled-components";
import { Flex, Text } from "@aws-amplify/ui-react";

export const StyledCardDevice = styled(Flex)`
  min-width: fit-content;
  min-height: fit-content;
  width: 9.625rem;
  height: 10.625rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1.5rem;
  padding: 1rem;
  gap: 12px;
  background-color: ${(props) => props.theme.colors.primary_light};
  outline: 1px solid white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

export const DeviceName = styled(Text)`
  color: ${(props) => props.theme.colors.white};
  font-size: 1.25rem;
  font-weight: bold;
  line-height: normal;
`;

export const DeviceStatus = styled(Text)`
  color: ${(props) => props.theme.colors.neutral_light};
  font-size: 0.85rem;
  font-weight: medium;
  line-height: normal;
`;
