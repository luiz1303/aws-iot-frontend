import { Amplify } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";

import { PageLayout } from "./styles/customStyles";

import React from "react";
import awsconfig from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { MQTTPublisher } from "./components";

Amplify.configure(awsconfig);

const App = () => {
  return (
    <PageLayout>
      <MQTTPublisher />
    </PageLayout>
  );
};

export default withAuthenticator(App);
