import { Emojis } from "components/misc/Visualization";
import React, { useState } from "react";
import styled from "styled-components";

export default function AdviceLivraisonDetail(props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const collapserClicked = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <Wrapper>
        <Heading>
          <Collapser onClick={collapserClicked}></Collapser>
          <H3Title>{props.title}</H3Title>
        </Heading>
        <TextContent collapsed={isCollapsed}>
          {props.line1Text ? (
            <>
              <Item>
                <Line>
                  <Icon>
                    <Emojis>{props.line1Emoji}</Emojis>
                  </Icon>
                  <Text>{props.line1Text}</Text>
                </Line>
                <Line>
                  <Icon></Icon>
                  <Subtext>{props.line1Subtext}</Subtext>
                </Line>
              </Item>
            </>
          ) : (
            <></>
          )}
          {props.line2Text ? (
            <>
              <Item>
                <Line>
                  <Icon>
                    <Emojis>{props.line2Emoji}</Emojis>
                  </Icon>
                  <Text>{props.line2Text}</Text>
                </Line>
                <Line>
                  <Icon></Icon>
                  <Subtext>{props.line2Subtext}</Subtext>
                </Line>
              </Item>
            </>
          ) : (
            <></>
          )}
          {props.line3Text ? (
            <>
              <Item>
                <Line>
                  <Icon>
                    <Emojis>{props.line3Emoji}</Emojis>
                  </Icon>
                  <Text>{props.line3Text}</Text>
                </Line>
                <Line>
                  <Icon></Icon>
                  <Subtext>{props.line3Subtext}</Subtext>
                </Line>
              </Item>
            </>
          ) : (
            <></>
          )}
        </TextContent>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.darkBackground};
  border-radius: 8px;
  padding: 1.5rem 1rem;
`;

const H3Title = styled.h3`
  color: ${(props) => props.theme.colors.main3};
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const Heading = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const Line = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;

const Icon = styled.div`
  margin-right: 0.5rem;
  width: 40px;
  > span {
    margin-bottom: 0;
  }
`;

const Text = styled.div`
  color: ${(props) => props.theme.colors.deepDark};
  font-size: 16px;
  line-height: 24px;
`;

const Subtext = styled.div`
  color: ${(props) => props.theme.colors.textGray2};
  font-size: 12px;
  line-height: 16px;
`;

const Item = styled.div`
  margin-bottom: 1rem;
`;

const Collapser = styled.button`
  cursor: pointer;
  height: 0.1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  padding: 0rem 0.5rem;
`;

const TextContent = styled.div`
  display: ${(props) => (!props.collapsed ? "block" : "none")};
`;
