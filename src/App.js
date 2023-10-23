// https://github.com/matwerber1/aws-amplify-react-iot-pub-sub-demo

// https://github.com/aws-samples/aws-amplify-react-iot-pub-sub-using-lambda

// ver forma de publicar na sombra do objeto
// https://us-east-1.console.aws.amazon.com/iot/home?region=us-east-1#/test

import { Amplify, Hub } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";

import { Button, PageLayout, PublisherWrapper } from "./styles";

import React from "react";
import awsconfig from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { PubSub } from "aws-amplify";
import { AWSIoTProvider, CONNECTION_STATE_CHANGE } from "@aws-amplify/pubsub";
Amplify.configure(awsconfig);

const SUB_TOPIC = "esp32/sub";
const PUB_TOPIC = "esp32/pub";

Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: "us-east-1",
    aws_pubsub_endpoint:
      "wss://a2tdxstszflmkv-ats.iot.us-east-1.amazonaws.com/mqtt",
  })
);

async function ProcessMessage(payload) {
  console.log("Message received", payload);
  let topic = payload.value[Object.getOwnPropertySymbols(payload.value)[0]];
  let time = payload.value.time;
  let sensor_a0 = payload.value.sensor_a0;
  let scrollBox = document.getElementById("incomingMsg");
  scrollBox.innerHTML +=
    "<b>NEW MESSAGE: </b><br></br> Topic: " +
    topic +
    "<br></br> Time: " +
    time +
    "<br></br> Sensor_a0: " +
    sensor_a0 +
    "<br></br>";
  scrollBox.scrollTop = scrollBox.scrollHeight;
}

const SendMessage = async () => {
  let payload = document.getElementById("msg").value;
  document.getElementById("msg").value = "";
  console.log(payload);

  await PubSub.publish(PUB_TOPIC, { msg: payload });
  let sentMsgBox = document.getElementById("sentMsg");
  sentMsgBox.innerHTML += payload + "<br></br>";
  sentMsgBox.scrollTop = sentMsgBox.scrollHeight;
};

const subscribe = () => {
  PubSub.subscribe(SUB_TOPIC).subscribe({
    next: (data) => ProcessMessage(data),
    error: (error) => console.error(error),
    close: () => console.log("Done"),
  });
};

Hub.listen("pubsub", (data) => {
  const { payload } = data;
  console.log(data);
  if (payload.event === CONNECTION_STATE_CHANGE) {
    const connectionState = payload.data.connectionState;
    console.log(connectionState);
  }
});

function App() {
  subscribe();
  return (
    <PageLayout>
      <PublisherWrapper>
        <h2>MQTT Publisher</h2>
        <p>
          Envia mensagens para o tópico <b>{PUB_TOPIC}</b>.
        </p>
        <input
          type="text"
          id="msg"
          name="msg"
          placeholder="Digite uma mensagem"
        ></input>
        <Button onClick={SendMessage}>Enviar</Button>
        <h3>Mensagens enviadas:</h3>
        <div id="sentMsg" />
      </PublisherWrapper>
    </PageLayout>
  );
}

export default withAuthenticator(App);
