/* eslint-disable react-hooks/exhaustive-deps */
// import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

import {
  StyledCardWeather,
  WeatherStatus,
  Local,
  Temperature,
  SubitemWrapper,
  SubitemValue,
  SubitemName,
} from "./styles";
import { Flex, Image } from "@aws-amplify/ui-react";

import { fetchWeatherData } from "../../utils/api";

const CardWeather = () => {
  const [data, setData] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);

  useEffect(() => {
    const fetchGeoData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });

      fetchWeatherData(latitude, longitude).then((data) => {
        setData(data);
      });
    };
    fetchGeoData();
  }, [data, latitude, longitude]);

  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  const status = data?.[0]?.weather?.[0]?.description || "...";
  const local = data?.[0]?.name || "...";
  const temperature = data?.[0]?.main?.temp || "...";
  const minTemp = data?.[0]?.main?.temp_min || "...";
  const maxTemp = data?.[0]?.main?.temp_max || "...";
  const humidity = data?.[0]?.main?.humidity || "...";
  const wind = data?.[0]?.wind?.speed || "...";
  const iconName = data?.[0]?.weather?.[0]?.icon;
  const iconPath = `https://openweathermap.org/img/wn/${iconName}@2x.png`;

  return (
    <StyledCardWeather>
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <Image src={iconPath} width="fit-content" />
        <Flex direction="column" gap="0.5rem">
          <WeatherStatus>{capitalizeFirstLetter(status)}</WeatherStatus>
          <Local>{local}</Local>
        </Flex>
        <Temperature>{Math.floor(temperature)}ºC</Temperature>
      </Flex>
      <Flex
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <SubitemWrapper>
          <SubitemValue>{Math.floor(minTemp)}ºC</SubitemValue>
          <SubitemName>Temperatura Mínima</SubitemName>
        </SubitemWrapper>
        <SubitemWrapper>
          <SubitemValue>{Math.floor(maxTemp)}ºC</SubitemValue>
          <SubitemName>Temperatura Máxima</SubitemName>
        </SubitemWrapper>
        <SubitemWrapper>
          <SubitemValue>{humidity}%</SubitemValue>
          <SubitemName>Umidade</SubitemName>
        </SubitemWrapper>
        <SubitemWrapper>
          <SubitemValue>{wind}km/h</SubitemValue>
          <SubitemName>Vento</SubitemName>
        </SubitemWrapper>
      </Flex>
    </StyledCardWeather>
  );
};

export default CardWeather;
