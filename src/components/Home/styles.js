/* eslint-disable import/no-anonymous-default-export */
import { styled } from "styled-components";
import { Button, Flex } from "@aws-amplify/ui-react";

const PageWrapper = styled(Flex)`
  position: relative;
  min-height: 100vh;
  width: 100%;
  height: 100%;
`;

const HomeLayout = styled(Flex)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: fit-content;
  height: fit-content;
  gap: 1.5rem;
  padding: 1.5rem;
`;

const BackgroundTexture = styled(Flex)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url("./backgroundTexture.svg");
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
  opacity: 0.1;
`;

const BackgroundColor = styled(Flex)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333c4a;
  z-index: -2;
`;

const SignOutButton = styled(Button)`
  background-color: white;
  border: 0;
  border-radius: 0.5rem;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

export default {
  PageWrapper,
  HomeLayout,
  BackgroundTexture,
  BackgroundColor,
  SignOutButton,
};
