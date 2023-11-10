import { Amplify } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";

import { PageLayout, theme } from "./styles/customStyles";

import React from "react";
import awsconfig from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
// import { MQTTPublisher } from "./components";
import { Home } from "./components";
import { ThemeProvider } from "styled-components";

Amplify.configure(awsconfig);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <PageLayout>
        <Home />
      </PageLayout>
    </ThemeProvider>
  );
};

export default withAuthenticator(App);
