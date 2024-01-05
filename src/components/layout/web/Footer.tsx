import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { Section, SectionWideContent } from 'components/base/Section'
import Signature from 'components/screenshot/Signature'

export default function Footer() {
  return (
    <Wrapper id='footer'>
      <LinearGradient>&nbsp;</LinearGradient>
      <Section>
        <SectionWideContent>
          <Grid>
            <Logos>
              <Signature noMargin noLink />
            </Logos>
            <div>
              <FooterExplain>
                <strong>
                  Impact CO<sub>2</sub>
                </strong>
                <p>Le site de ressources qui vulgarise et valorise les données environnementales de l'ADEME</p>
              </FooterExplain>
            </div>
            <div className='gridlinks'>
              <FooterLink>
                <Link href='/plan-du-site' title='Plan du site'>
                  Plan du site
                </Link>
              </FooterLink>
              <FooterLink>
                <Link href='/accessibilite' title='Accessibilité (non conforme)'>
                  Accessibilité (non conforme)
                </Link>
              </FooterLink>
              <FooterLink>
                <Link href='/mentions-legales' title='Mentions légales'>
                  Mentions légales
                </Link>
              </FooterLink>
              <FooterLink>
                <Link href='/politique-de-confidentialite' title='Politique de confidentialité'>
                  Politique de confidentialité
                </Link>
              </FooterLink>
              <FooterLink>
                <Link
                  href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                  target='_blank'
                  rel='noreferrer noopener'
                  title='Nous contacter'>
                  Contact
                </Link>
              </FooterLink>
            </div>
          </Grid>
        </SectionWideContent>
      </Section>
    </Wrapper>
  )
}

const Logos = styled.div`
  display: flex;
`

const FooterExplain = styled.div`
  margin: 3rem 0 3rem 0;
  p {
    margin-bottom: 0;
  }
  ${(props) => props.theme.mq.medium} {
    margin: 1.5rem 0 1.5rem 0;
  }
`

const FooterLink = styled.div`
  a {
    color: ${(props) => props.theme.colors.deepDarkReversible};
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0em;
    margin-right: 1.5rem;
    ${(props) => props.theme.mq.medium} {
      margin-left: inherit;
    }
    text-decoration: none;
  }
`

const Wrapper = styled.footer`
  background-color: ${(props) => props.theme.colors.sky};
  margin-top: 0;
`

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
`

const LinearGradient = styled.div`
  background: ${(props) => `linear-gradient(white, ${props.theme.colors.sky})`};
  height: 8rem;
`
