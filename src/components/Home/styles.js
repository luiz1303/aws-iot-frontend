import { styled } from "styled-components";
import { Flex } from "@aws-amplify/ui-react";

export const HomeLayout = styled(Flex)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  gap: 1.25rem;
  padding: 2.5rem;
  padding-top: 4rem;
`;

export const BackgroundTexture = styled(Flex)`
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

export const BackgroundColor = styled(Flex)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.primary_dark};
  z-index: -2;
`;
