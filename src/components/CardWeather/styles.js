/* eslint-disable import/no-anonymous-default-export */
import { styled, keyframes } from "styled-components";
import { Flex, Text } from "@aws-amplify/ui-react";

const loading = keyframes`
  0% { background-color: #58667A; }
  50% { background-color: #47556B; }
  100% { background-color: #58667A; }
`;

const CardSkeleton = styled(Flex)`
  width: 37.5rem;
  height: 20.625rem;
  min-width: 37.5rem;
  min-height: 20.625rem;
  border-radius: 1.5rem;
  overflow: hidden;
  animation: ${loading} 2.5s ease-in-out infinite;

  @media screen and (max-width: 37.5rem) {
    min-width: 20rem;
    width: 20rem;
    min-height: 31.25rem;
    height: 31.25rem;
  }
`;

const StyledCardWeather = styled(Flex)`
  width: fit-content;
  min-height: fit-content;
  border-radius: 1.5rem;
  flex-direction: row;
  border-radius: 1.5rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  gap: 0;
  background-color: #222831;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const InfoArea = styled(Flex)`
  min-width: 17.5rem;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
`;

const TextInfo = styled(Flex)`
  width: 100%;
  flex-direction: column;
  height: fit-content;
  gap: 0.5rem;
  z-index: 10;
`;

const TextItem = styled(Flex)`
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  gap: 0.5rem;
`;

const ItemName = styled(Text)`
  color: white;
  font-size: 1rem;
  font-weight: 700;
`;

const ItemStatus = styled(Text)`
  color: white;
  font-size: 1rem;
  font-weight: 500;
`;

const ImageArea = styled(Flex)`
  position: relative;
  border-radius: 1.5rem;
  flex-direction: column;
  min-width: 20rem;
  width: fit-content;
  height: 100%;
  justify-content: space-between;
  padding: 2.5rem 2rem;
  border-radius: 1.5rem;
`;

const WeatherData = styled(Flex)`
  flex-direction: column;
  width: 100%;
  gap: 0.125rem;
  height: fit-content;
  z-index: 10;
`;

const WeatherHStack = styled(Flex)`
  flex-direction: column;
  width: 100%;
  gap: 0rem;
  height: fit-content;
  z-index: 10;
`;

const WeatherGradient = styled(Flex)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: linear-gradient(135deg, #72edf2 10%, #5151e5 100%);
  border-radius: 1.5625rem;
  opacity: 0.8;
  z-index: 1;
`;

const WeatherImage = styled(Flex)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url("https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80");
  border-radius: 1.5625rem;
  opacity: 0.8;
  z-index: 0;
`;

export default {
  StyledCardWeather,
  CardSkeleton,
  InfoArea,
  TextInfo,
  TextItem,
  ItemName,
  ItemStatus,
  ImageArea,
  WeatherData,
  WeatherGradient,
  WeatherImage,
  WeatherHStack,
};
