import Link from 'next/link'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import { Section, SectionWideContent } from 'components/base/Section'
import Signature from 'components/screenshot/Signature'

export default function Footer() {
  return (
    <Wrapper id='footer'>
      <Section>
        <SectionWideContent>
          <Grid>
            <Logos>
              <Signature noMargin noLink color='var(--primary-70)' />
            </Logos>
            <div>
              <FooterExplain>
                <strong>
                  Impact CO<sub>2</sub>
                </strong>
                <p>Le site de ressources qui vulgarise et valorise les données environnementales de l'ADEME</p>
              </FooterExplain>
            </div>
          </Grid>

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
              <Link href='/budget' title='Budget'>
                Budget
              </Link>
            </FooterLink>
            <FooterLink>
              <Link href='/stats' title='Statistiques'>
                Statistiques
              </Link>
            </FooterLink>
            <FooterLink>
              <Link
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                target='_blank'
                rel='noreferrer noopener'
                title='Nous contacter'
                className='last'>
                Contact
              </Link>
            </FooterLink>
          </div>
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
  ${MEDIA.LT.MEDIUM} {
    margin: 1.5rem 0 1.5rem 0;
  }
`

const FooterLink = styled.div`
  a {
    color: var(--neutral-80);
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0em;
    margin-right: 1.5rem;
    ${MEDIA.LT.MEDIUM} {
      margin-left: inherit;
    }
    text-decoration: none;
  }
`

const Wrapper = styled.footer`
  margin-top: 0;
  .gridlinks {
    border-top: 1px solid var(--neutral-20);
    a {
      border-right: 1px solid var(--neutral-20);
      color: var(--neutral-50);
      padding-right: 1.5rem;
    }
    a.last {
      border: none;
    }
    a:hover {
      color: var(--neutral-80);
    }
    display: flex;
    margin-bottom: 1rem;
    ${MEDIA.LT.MEDIUM} {
      flex-direction: column;
    }
    padding-top: 1rem;
  }
`

const Grid = styled.div`
  border-top: 1px solid var(--neutral-20);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  ${MEDIA.LT.MEDIUM} {
    grid-template-columns: repeat(1, 1fr);
  }
`
