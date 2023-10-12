import Ademe from "components/base/Ademe";
import Logo from "components/base/Logo";
import Marianne from "components/base/Marianne";
import Section3 from "components/base/Section3";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export default function FooterBlue(props) {
  return (
    <Wrapper mt={props.mt}>
      <Section3>
        <Section3.WideContent>
          <Section3.InnerMargin>
            <Grid>
              <div>
                <Logos>
                  <Marianne />
                  <Ademe />
                  <Logo />
                </Logos>
              </div>
              <div>
                <FooterExplain>
                  <strong>Impact CO2</strong>
                  <p>Le site de ressources qui vulgarise et valorise les données environnementales de l'ADEME</p>
                </FooterExplain>
              </div>
              <div className="gridlinks">
                <FooterLink>
                  <Link href="/plan-du-site">Plan du site</Link>
                </FooterLink>
                <FooterLink>
                  <Link href="/accessibilite">Accessibilité : non-conforme</Link>
                </FooterLink>
                <FooterLink>
                  <Link href="/mentions-legales">Mentions légales</Link>
                </FooterLink>
                <FooterLink>
                  <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
                </FooterLink>
                <Version>Version : {process.env.thebuildid}</Version>
              </div>
            </Grid>
          </Section3.InnerMargin>
        </Section3.WideContent>
      </Section3>
    </Wrapper>
  );
}

const Logos = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  padding: 0 0.75rem;
  text-decoration: none;

  ${(props) => props.theme.mq.small} {
    font-size: ${(props) => (props.iframe ? 0.75 : 1)}rem;
    padding: 0 0.25rem;
  }
`;
const FooterLink = styled.div`
  a {
    background-color: ${(props) => props.theme.colors.background};
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0em;
    margin-left: 0.5rem;
    ${(props) => props.theme.mq.medium} {
      margin-left: inherit;
    }
    text-decoration: none;
  }
`;

const Wrapper = styled.div`
  background-color: #b5d0fa;
  margin-top: ${(props) => props.mt || "0"};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  ${(props) => props.theme.mq.medium} {
    grid-template-columns: repeat(1, 1fr);
  }
  > .gridlinks {
    display: flex;
    grid-column: span 2;
    ${(props) => props.theme.mq.medium} {
      flex-direction: column;
      grid-column: inherit;
    }
    margin-bottom: 1rem;
  }
`;

const FooterExplain = styled.div``;

const Version = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  margin-left: auto;
  ${(props) => props.theme.mq.medium} {
    margin-left: inherit;
  }
`;
