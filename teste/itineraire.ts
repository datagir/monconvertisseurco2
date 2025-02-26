import { FrameLocator, Page, expect } from '@playwright/test'

export const itineraireTest = async (page: Page | FrameLocator, prod?: boolean, extraParams?: string) => {
  const baseUrl = prod ? 'https://impactco2.fr' : 'http://localhost:3000'

  await page.getByTestId('header-share-button').click()

  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `${baseUrl}/outils/transport/itineraire?defaultMode=list&language=fr`
  )
  await page.getByTestId('cancel-button').click()

  await page.getByTestId('header-integrate-button').click()

  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `<script name="impact-co2" src="${baseUrl}/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&km=10&defaultMode=list${extraParams || ''}"></script>`
  )
  await page.getByTestId('cancel-button').click()

  await page.getByLabel('Départ').fill('n')
  await expect(await page.getByTestId('transportSuggest').first()).not.toBeVisible()

  await page.getByLabel('Départ').fill('nan')

  await expect(await page.getByTestId('transportSuggest').first()).toBeVisible()

  await page.getByText('Nantes 44000 France').click()
  await expect(page.getByLabel('Départ')).toHaveAttribute('value', 'Nantes 44000 France')

  await page.getByTestId('header-share-button').click()

  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `${baseUrl}/outils/transport/itineraire?itineraireStart=Nantes 44000 France&defaultMode=list&language=fr`
  )
  await page.getByTestId('cancel-button').click()

  await page.getByTestId('header-integrate-button').click()

  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `<script name="impact-co2" src="${baseUrl}/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&km=10&itineraireStart=Nantes 44000 France&defaultMode=list${extraParams || ''}"></script>`
  )
  await page.getByTestId('cancel-button').click()

  await page.getByLabel('Arrivée').fill('ang')
  await expect(await page.getByTestId('transportSuggest').last()).toBeVisible()

  await page.getByText('Angers 49000 France').click()

  await expect(page.getByLabel('Arrivée')).toHaveAttribute('value', 'Angers 49000 France')
  await expect(page.getByTestId('category-intercites')).toBeAttached()
  await expect(page.getByTestId('category-intercites')).toHaveText(
    'Intercités  - 91.2 km0.82 kg CO₂eusage : 65%, construction : 35%'
  )

  await page.getByTestId('header-share-button').click()

  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `${baseUrl}/outils/transport/itineraire?itineraireStart=Nantes 44000 France&itineraireEnd=Angers 49000 France&defaultMode=list&language=fr`
  )
  await page.getByTestId('cancel-button').click()

  await page.getByTestId('header-integrate-button').click()

  await expect(page.getByTestId('clipboard-box')).toHaveText(
    `<script name="impact-co2" src="${baseUrl}/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&km=10&itineraireStart=Nantes 44000 France&itineraireEnd=Angers 49000 France&defaultMode=list${extraParams || ''}"></script>`
  )
  await page.getByTestId('cancel-button').click()
}
