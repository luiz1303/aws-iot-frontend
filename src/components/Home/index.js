/* eslint-disable react-hooks/exhaustive-deps */
import { Auth, Amplify, Hub } from "aws-amplify";
import { Flex, Text } from "@aws-amplify/ui-react";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import awsconfig from "../../aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { PubSub } from "aws-amplify";
import { CardWeather } from "../";
import {
  AWSIoTProvider,
  CONNECTION_STATE_CHANGE,
  ConnectionState,
} from "@aws-amplify/pubsub";

import S from "./styles";
import CardDevice from "../CardDevice";
Amplify.configure(awsconfig);

const THING_NAME = "ESP32";
const SHADOW_TOPIC = `$aws/things/${THING_NAME}/shadow`;

Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: "us-east-1",
    aws_pubsub_endpoint:
      "wss://a2tdxstszflmkv-ats.iot.us-east-1.amazonaws.com/mqtt",
  })
);

const Home = () => {
  let currentVersion = 0;
  let showConnectionToast = useRef(true);
  const [lastShadowState, setLastShadowState] = useState();
  const [userInfo, setUserInfo] = useState();
  const [connected, setConnected] = useState(false);

  const handleSignOut = () => {
    Auth.signOut();
  };

  const handleUpdateState = () => {
    if (!!lastShadowState) {
      const message = {
        desired: { powerOn: lastShadowState?.reported?.powerOn ? 0 : 1 },
        reported: lastShadowState?.reported,
      };
      updateThingShadow(message);
    }
  };

  // Se inscreve nos tópicos da Sombra do Device
  const subscribeToThingShadowUpdates = async () => {
    // Retorna ao publicar no tópico get
    PubSub.subscribe(`${SHADOW_TOPIC}/get/accepted`).subscribe({
      next: async (data) => {
        if (data?.value?.version > currentVersion) {
          currentVersion = data?.value?.version;
          setLastShadowState(data?.value?.state);
        }
      },
      error: (error) => console.log(error),
    });

    // Retorna ao publicar no tópico update
    PubSub.subscribe(`${SHADOW_TOPIC}/update/accepted`).subscribe({
      next: (data) => {
        console.log("Shadow update:", data?.value?.state);
      },
      error: (error) => console.log(error),
    });
  };

  const getThingShadow = async () => {
    await PubSub.publish(`${SHADOW_TOPIC}/get`, {});
  };

  const updateThingShadow = async (state) => {
    const newShadowState = {
      state: state,
    };

    await PubSub.publish(`${SHADOW_TOPIC}/update`, newShadowState);
  };

  // Espera por alterações no estado da Conexão
  Hub.listen("pubsub", (data) => {
    const { payload } = data;
    if (payload.event === CONNECTION_STATE_CHANGE) {
      const connectionState = payload.data.connectionState;
      // console.log(connectionState);

      connectionState === ConnectionState.Connected
        ? setConnected(true)
        : setConnected(false);
    }
  });

  useEffect(() => {
    subscribeToThingShadowUpdates();
    Auth.currentUserInfo().then((info) => setUserInfo(info));
  }, []);

  useEffect(() => {
    if (connected && showConnectionToast.current) {
      toast.success("Conexão estabelecida com AWS Iot Core");
      showConnectionToast.current = false;
    }

    getThingShadow();
  }, [connected]);

  return (
    <S.PageWrapper>
      <S.HomeLayout>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="center"
          padding="1.5rem"
        >
          <FontAwesomeIcon icon={faCircleUser} size="3x" color="white" />
          <Flex direction="column" gap="0.25rem">
            <Text
              fontSize="1.5rem"
              color="white"
              fontWeight="bold"
              lineHeight="normal"
            >
              DASHBOARD
            </Text>
            <Text fontSize="0.875rem" color="#9A9BAD" lineHeight="normal">
              Bem vindo(a), {userInfo?.username}.
            </Text>
          </Flex>
          <S.SignOutButton onClick={handleSignOut} marginLeft="2rem">
            Sair
          </S.SignOutButton>
        </Flex>
        <CardWeather />
        <Flex direction="row" gap="1.25rem" marginTop="0.75rem">
          <CardDevice
            handleChangeDevice={handleUpdateState}
            deviceName="Lâmpada"
            active={lastShadowState?.reported?.powerOn}
          />
        </Flex>
      </S.HomeLayout>
      <S.BackgroundTexture />
      <S.BackgroundColor />
    </S.PageWrapper>
  );
};

export default Home;
