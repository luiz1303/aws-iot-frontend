import { styled } from "styled-components";

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
`;

export const appTheme = {
  name: "alert-theme",
  tokens: {
    components: {
      alert: {
        // Default styles
        backgroundColor: { value: "{colors.black.50}" },

        // Variations
        info: {
          color: { value: "white" },
          backgroundColor: { value: "{colors.blue.80}" },
        },
      },
    },
  },
};
