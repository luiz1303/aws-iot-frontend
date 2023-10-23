import { styled } from "styled-components";

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
`;

export const HStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const VStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  background-color: #f2f2f2;
  border: none;
  border-radius: 0.25rem;
  padding: 0.75rem;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`;

export const PublisherWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.5rem;
`;
