/* eslint-disable import/no-anonymous-default-export */
import { styled, keyframes } from "styled-components";
import { Flex, Text } from "@aws-amplify/ui-react";

const CardDevice = styled(Flex).withConfig({
  shouldForwardProp: (prop) => !["active"].includes(prop),
})`
  min-width: fit-content;
  min-height: fit-content;
  width: 10rem;
  height: 10.625rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  padding: 1rem;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.primary_light};
  background-image: ${(props) =>
    props.active ? "linear-gradient(135deg, #72edf2 10%, #5151e5 100%)" : ""};
  outline: ${(props) => (props.active ? "none" : "1px solid white")};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease-in-out;
  user-select: none;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    outline: ${(props) => props.theme.colors.gradient_low} solid 2px;
  }
`;

const DeviceInfo = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const DeviceName = styled(Text)`
  color: ${(props) => props.theme.colors.white};
  font-size: 1.25rem;
  font-weight: 700;
  line-height: normal;
  text-align: center;
`;

const loading = keyframes`
  0% { outline: 2px solid white; }
  50% { outline: 2px solid  red; }
  100% { outline: 2px solid  white; }
`;

const rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const CardSkeleton = styled(Flex).withConfig({
  shouldForwardProp: (prop) => !["lastState"].includes(prop),
})`
  min-width: 10rem;
  min-height: 10rem;
  width: 10rem;
  height: 10.625rem;
  border-radius: 2rem;
  /* animation: ${loading} 1.5s ease-in-out infinite; */
  background-color: #58667a;
  background-image: ${(props) =>
    props.lastState
      ? "linear-gradient(135deg, #72edf2 10%, #5151e5 100%)"
      : ""};
  justify-content: center;
  align-items: center;
`;

const Spinner = styled(Flex)`
  width: 2rem;
  height: 2rem;
  border: 4px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 0.75s linear infinite;
`;

export default {
  CardDevice,
  DeviceInfo,
  DeviceName,
  CardSkeleton,
  Spinner,
};
