import styled from "styled-components";

export const ScreenContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 20px;
  flex-wrap: wrap;
  height: 100vh;
  overflow-y: scroll;
`;

export const MetaLevelWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  row-gap: 5px;
  flex-direction: column;
`;

export const MetaLeveContainer = styled.div`
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: wrap;
  padding: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.244);
  }
`;

export const CustomizablePopover = styled.div`
  padding: 10px;
  width: 100px;
  border-radius: 5px;
  background-color: black;
`;
