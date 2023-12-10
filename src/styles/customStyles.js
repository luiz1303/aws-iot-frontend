import { styled } from "styled-components";

const breakpoints = {
  xs: "480px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};

export const colors = {
  primary_dark: "#20243B",
  primary_light: "#2F334C",
  secondary: "#0D2B55",
  gradient_low: "#F96A78",
  gradient_high: "#E4B18B",
  neutral_light: "#9A9BAD",
  white: "#FFFFFF",
  black: "#1A1A1A",
};

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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

export const theme = {
  breakpoints: { ...breakpoints },
  colors: {
    ...colors,
  },
};
