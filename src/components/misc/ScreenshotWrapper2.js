import Background from "components/screenshot/Background";
import Signature from "components/screenshot/Signature";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  height: 100%;
  position: relative;
  > div + div {
    padding: 0;
  }
`;

export default function ScreenshotWrapper2(props) {
  return (
    <Wrapper className={props.className} ref={props.innerRef}>
      <Background className="noscreenshot" background={props.background}>
        <DynamicBackgroundPadding isScreenshotting={props.isScreenshotting}>{props.children}</DynamicBackgroundPadding>
      </Background>

      {props.isScreenshotting && (
        <>
          <br />
          <Signature />
        </>
      )}
    </Wrapper>
  );
}

const DynamicBackgroundPadding = styled.div`
  padding: ${(props) => (props.isScreenshotting ? "1rem" : "0")};
`;
