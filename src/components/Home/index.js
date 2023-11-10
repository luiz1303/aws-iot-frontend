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

import { HomeLayout, BackgroundTexture, BackgroundColor } from "./styles";
import CardDevice from "../CardDevice";
Amplify.configure(awsconfig);

// Para sombras sem nome próprio:
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
  let showConnectionToast = useRef(true);
  const [lastShadowState, setLastShadowState] = useState();
  const [userInfo, setUserInfo] = useState();
  const [hasUpdate, setHasUpdate] = useState(true);
  const [connected, setConnected] = useState(false);

  const handleSignOut = () => {
    // fazer modal de confirmação
    Auth.signOut();
  };

  // Se inscreve no tópico da Sombra do Device
  const subscribeToThingShadowUpdates = async () => {
    // Retorna ao publicar no tópico get
    PubSub.subscribe(`${SHADOW_TOPIC}/get/accepted`).subscribe({
      next: (data) => {
        // console.log("Current Shadow State:", data?.value?.state);
        setLastShadowState(data?.value?.state);
        setHasUpdate(false);
      },
      error: (error) => console.log(error),
      close: () => {},
    });

    // Retorna ao publicar no tópico update
    PubSub.subscribe(`${SHADOW_TOPIC}/update/accepted`).subscribe({
      next: (data) => {
        console.log("Shadow update:", data?.value?.state);
        setHasUpdate(true);
      },
      error: (error) => console.log(error),
      close: () => {},
    });
  };

  // Obtém o estado atual da Sombra do Device
  const getThingShadow = async () => {
    await PubSub.publish(`${SHADOW_TOPIC}/get`, {});
  };

  // Atualiza o estado da Sombra do Device
  const updateThingShadow = async () => {
    const userMessage = document.getElementById("msg").value;
    const newShadowState = {
      state: {
        desired: {
          message: userMessage,
          // power: "on",
        },
      },
    };

    await PubSub.publish(`${SHADOW_TOPIC}/update`, newShadowState);
  };

  // Espera por alterações no estado da Conexão
  Hub.listen("pubsub", (data) => {
    const { payload } = data;
    if (payload.event === CONNECTION_STATE_CHANGE) {
      const connectionState = payload.data.connectionState;
      console.log(connectionState);

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
  }, [connected, hasUpdate]);

  return (
    <HomeLayout>
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
      </Flex>
      <CardWeather />
      <Text
        fontSize="1.5rem"
        color="white"
        fontWeight="bold"
        lineHeight="normal"
      >
        Seus Dispositivos
      </Text>
      <Flex direction="row" gap="1.25rem">
        <CardDevice />
        <CardDevice />
      </Flex>
      <BackgroundTexture />
      <BackgroundColor />
    </HomeLayout>
  );
};

export default Home;
