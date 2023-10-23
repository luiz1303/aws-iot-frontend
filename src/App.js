// https://github.com/matwerber1/aws-amplify-react-iot-pub-sub-demo
// https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html

import { Amplify, Hub } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";

import { Button, PageLayout, PublisherWrapper } from "./styles";

import React from "react";
import awsconfig from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { PubSub } from "aws-amplify";
import { AWSIoTProvider, CONNECTION_STATE_CHANGE } from "@aws-amplify/pubsub";
Amplify.configure(awsconfig);

const SHADOW_TOPIC_UPDATE = "$aws/things/ESP32/shadow/update";
const SHADOW_TOPIC_SUBSCRIBE = "$aws/things/ESP32/shadow/update/accepted";
const SHADOW_TOPIC_GET = "$aws/things/ESP32/shadow/get/accepted";

Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: "us-east-1",
    aws_pubsub_endpoint:
      "wss://a2tdxstszflmkv-ats.iot.us-east-1.amazonaws.com/mqtt",
  })
);

const updateThingShadow = async () => {
  const shadowState = {
    state: {
      desired: {
        key: "valorTeste",
      },
    },
  };

  await PubSub.publish(SHADOW_TOPIC_UPDATE, shadowState);
};

const subscribeToThingShadowUpdates = () => {
  PubSub.subscribe(SHADOW_TOPIC_SUBSCRIBE).subscribe({
    next: (data) => console.log("Shadow update:", data.value),
    error: (error) => console.error(error),
    close: () => console.log("Done"),
  });
};

const getThingShadow = () => {
  PubSub.subscribe(SHADOW_TOPIC_GET).subscribe({
    next: (data) => console.log("Current Shadow State:", data.value),
    error: (error) => console.log(error),
    close: () => console.log("Done"),
  });
};

// Espera por alterações no estado da Conexão
Hub.listen("pubsub", (data) => {
  const { payload } = data;
  if (payload.event === CONNECTION_STATE_CHANGE) {
    const connectionState = payload.data.connectionState;
    console.log(connectionState);
  }
});

function App() {
  subscribeToThingShadowUpdates();
  return (
    <PageLayout>
      <PublisherWrapper>
        <h2>MQTT Publisher</h2>
        <p>
          Publica Mensagens no tópico equivalente ao <b>Device Shadow</b>.
        </p>
        <input
          type="text"
          id="msg"
          name="msg"
          placeholder="Digite uma mensagem"
        ></input>
        <Button onClick={updateThingShadow}>Atualizar Sombra</Button>
      </PublisherWrapper>
      <Button onClick={getThingShadow}>Obter Estado da Sombra</Button>
    </PageLayout>
  );
}

export default withAuthenticator(App);
