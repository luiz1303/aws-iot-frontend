// https://github.com/matwerber1/aws-amplify-react-iot-pub-sub-demo
// https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html

import { Auth, Amplify, Hub } from "aws-amplify";

import { Button, Flex, Input, Text } from "@aws-amplify/ui-react";

import React, { useState, useEffect } from "react";
import awsconfig from "../aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { PubSub } from "aws-amplify";
import {
  AWSIoTProvider,
  CONNECTION_STATE_CHANGE,
  ConnectionState,
} from "@aws-amplify/pubsub";
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

const MQTTPublisher = () => {
  const [lastShadowState, setLastShadowState] = useState(null);
  const [hasUpdate, setHasUpdate] = useState(true);
  const [connected, setConnected] = useState(false);

  const signOut = () => {
    Auth.signOut();
  };

  // Se inscreve no tópico da Sombra do Device
  const subscribeToThingShadowUpdates = async () => {
    // Retorna ao publicar no tópico get
    PubSub.subscribe(`${SHADOW_TOPIC}/get/accepted`).subscribe({
      next: (data) => {
        console.log("Current Shadow State:", data?.value?.state);
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
  }, []);

  useEffect(() => {
    getThingShadow();
  }, [connected, hasUpdate]);

  return (
    <Flex
      as="form"
      maxWidth="40rem"
      gap="1rem"
      padding="2.5rem"
      direction="column"
    >
      <Text as="strong" fontSize="1.5rem" fontWeight="bold">
        MQTT Publisher
      </Text>
      <Text fontSize="1rem">
        Publica Mensagens no tópico equivalente ao <b>Device Shadow</b>.
      </Text>
      <Input
        id="msg"
        name="msg"
        type="text"
        placeholder="Digite uma mensagem"
        isRequired
      />
      <Button variation="primary" onClick={updateThingShadow}>
        Publicar
      </Button>
      <Button onClick={getThingShadow}>Obter Estado da Sombra</Button>
      <Button onClick={signOut}>Sair</Button>
      <Text>Último estado da Sombra: {JSON.stringify(lastShadowState)}</Text>
    </Flex>
  );
};

export default MQTTPublisher;
