/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { Text, Image } from "@aws-amplify/ui-react";

import S from "./styles";

import { fetchWeatherData } from "../../utils/api";

const CardWeather = ({ ...rest }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    const fetchGeoData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    };

    if (!loaded) {
      fetchGeoData();
    }
  }, []);

  useEffect(() => {
    if (!loaded && !!latitude && !!longitude) {
      fetchWeatherData(latitude, longitude).then((data) => {
        setWeatherData(data);
      });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (weatherData?.length > 0 && !!latitude && !!longitude) {
      setLoaded(true);
    }
  }, [weatherData]);

  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  const status = weatherData?.[0]?.weather?.[0]?.description || "...";
  const local = weatherData?.[0]?.name || "...";
  const temperature = weatherData?.[0]?.main?.temp || "...";
  const minTemp = weatherData?.[0]?.main?.temp_min || "...";
  const maxTemp = weatherData?.[0]?.main?.temp_max || "...";
  const humidity = weatherData?.[0]?.main?.humidity || "...";
  const wind = weatherData?.[0]?.wind?.speed || "...";
  const iconName = weatherData?.[0]?.weather?.[0]?.icon || "02d";
  const iconPath = iconName
    ? `https://openweathermap.org/img/wn/${iconName}@2x.png`
    : "";

  if (!loaded) {
    return <S.CardSkeleton />;
  }

  const weekDayMap = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const weekDay = currentDate.getDay();

  return (
    <S.StyledCardWeather>
      <S.ImageArea>
        <S.TextInfo gap="none">
          <Text
            color="white"
            fontSize="1.625rem"
            fontWeight="800"
            letterSpacing="0.0625rem"
            lineHeight="100%"
          >
            {weekDayMap[weekDay]}
          </Text>
          <S.WeatherHStack direction="row" gap="0.25rem">
            <Text
              color="white"
              fontSize="1rem"
              fontWeight="500"
              lineHeight="100%"
            >
              {local} - {day}/{month}/{year}
            </Text>
          </S.WeatherHStack>
        </S.TextInfo>
        <S.WeatherHStack>
          {iconPath && <Image src={iconPath} width="fit-content" />}
          <S.WeatherData>
            <Text
              lineHeight="100%"
              color="white"
              fontSize="3.5rem"
              fontWeight="900"
              letterSpacing="-0.125rem"
            >
              {Math.floor(temperature)}ºC
            </Text>
            <Text
              color="white"
              fontSize="1.125rem"
              fontWeight="800"
              letterSpacing="0.0625rem"
            >
              {capitalizeFirstLetter(status)}
            </Text>
          </S.WeatherData>
        </S.WeatherHStack>
        <S.WeatherGradient />
        <S.WeatherImage />
      </S.ImageArea>
      <S.InfoArea>
        <S.TextInfo>
          <S.TextItem>
            <S.ItemName>UMIDADE</S.ItemName>
            <S.ItemStatus>{humidity}%</S.ItemStatus>
          </S.TextItem>
          <S.TextItem>
            <S.ItemName>TEMP. MIN</S.ItemName>
            <S.ItemStatus>{Math.floor(minTemp)}ºC</S.ItemStatus>
          </S.TextItem>
          <S.TextItem>
            <S.ItemName>TEMP. MÁX</S.ItemName>
            <S.ItemStatus>{Math.floor(maxTemp)}ºC</S.ItemStatus>
          </S.TextItem>
          <S.TextItem>
            <S.ItemName>VENTO</S.ItemName>
            <S.ItemStatus>{wind}km/h</S.ItemStatus>
          </S.TextItem>
        </S.TextInfo>
      </S.InfoArea>
    </S.StyledCardWeather>
  );
};

export default CardWeather;
