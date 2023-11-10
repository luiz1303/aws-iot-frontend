import { styled } from "styled-components";
import { Flex, Text } from "@aws-amplify/ui-react";

export const StyledCardWeather = styled(Flex)`
  min-width: fit-content;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1.5rem;
  padding: 1.5rem;
  gap: 1.5rem;
  background-color: ${(props) => props.theme.colors.primary_light};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

export const WeatherStatus = styled(Text)`
  color: ${(props) => props.theme.colors.white};
  font-size: 1.25rem;
  font-weight: medium;
  line-height: normal;
`;

export const Local = styled(Text)`
  color: ${(props) => props.theme.colors.neutral_light};
  font-size: 0.75rem;
  font-weight: medium;
  line-height: normal;
`;

export const Temperature = styled(Text)`
  color: ${(props) => props.theme.colors.white};
  font-size: 3rem;
  font-weight: medium;
  line-height: normal;
`;

export const SubitemWrapper = styled(Flex)`
  flex-direction: column;
  gap: 0.25rem;
  justify-content: center;
  align-items: center;
  max-width: 3.75rem;
  text-align: center;
`;

export const SubitemValue = styled(Text)`
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  font-weight: 500;
  line-height: normal;
`;

export const SubitemName = styled(Text)`
  color: ${(props) => props.theme.colors.neutral_light};
  font-size: 0.75rem;
  font-weight: 600;
  line-height: normal;
`;
