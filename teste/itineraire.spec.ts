import { expect, test } from '@playwright/test'
import { itineraireTest } from './itineraire'
import { mockRoutesItinerary } from './mock-routes/mock-routes-itinerary'

test.beforeEach(async ({ page }) => {
  await mockRoutesItinerary(page)
})

test("Recherche de la ville de départ et d'arrivée", async ({ page }) => {
  await test.step('On charge la page itinéraire dans le navigateur', async () => {
    await page.goto('/transport/itineraire')
  })

  await itineraireTest(page)
})

test('Default parameters (old way)', async ({ page }) => {
  await test.step('Load with start parameters', async () => {
    await page.goto('/transport/itineraire?start="Paris"')

    await expect(page.getByLabel('Départ')).toHaveAttribute('value', 'Paris France', {
      timeout: 10000,
    })
    await expect(page.getByLabel('Arrivée')).toHaveAttribute('value', '')
    await expect(page.getByTestId('category-intercites')).not.toBeAttached()
  })

  await test.step('Load with end parameters', async () => {
    await page.goto('/transport/itineraire?end="Lyon"')

    await expect(page.getByLabel('Départ')).toHaveAttribute('value', '')
    await expect(page.getByLabel('Arrivée')).toHaveAttribute('value', 'Lyon France', {
      timeout: 10000,
    })
    await expect(page.getByTestId('category-intercites')).not.toBeAttached()
  })

  await test.step('Load with start and end parameters', async () => {
    await page.goto('/transport/itineraire?start="Paris"&end="Lyon"')

    await expect(page.getByLabel('Départ')).toHaveAttribute('value', 'Paris France', {
      timeout: 10000,
    })
    await expect(page.getByLabel('Arrivée')).toHaveAttribute('value', 'Lyon France', {
      timeout: 10000,
    })
    await expect(page.getByTestId('category-intercites')).toBeAttached()
    await expect(page.getByTestId('category-intercites')).toHaveText(
      'Intercités  - 91.2 km0.82 kg CO₂eusage : 65%, construction : 35%'
    )
  })
})

test('Default parameters', async ({ page }) => {
  await test.step('Load with start parameters', async () => {
    await page.goto('/transport/itineraire?itineraireStart=Paris')

    await expect(page.getByLabel('Départ')).toHaveAttribute('value', 'Paris France', {
      timeout: 10000,
    })
    await expect(page.getByLabel('Arrivée')).toHaveAttribute('value', '')
    await expect(page.getByTestId('category-intercites')).not.toBeAttached()
  })

  await test.step('Load with end parameters', async () => {
    await page.goto('/transport/itineraire?itineraireEnd=Lyon')

    await expect(page.getByLabel('Départ')).toHaveAttribute('value', '')
    await expect(page.getByLabel('Arrivée')).toHaveAttribute('value', 'Lyon France', {
      timeout: 10000,
    })
    await expect(page.getByTestId('category-intercites')).not.toBeAttached()
  })

  await test.step('Load with start and end parameters', async () => {
    await page.goto(
      '/transport/itineraire?km=12&itineraireStart=Paris&itineraireEnd=Lyon&teletravailStart=Nantes&teletravailEnd=Marseille&tabs=distance'
    )

    await expect(page.getByLabel('Départ')).toHaveAttribute('value', 'Paris France', {
      timeout: 10000,
    })
    await expect(page.getByLabel('Arrivée')).toHaveAttribute('value', 'Lyon France', {
      timeout: 10000,
    })
    await expect(page.getByTestId('category-intercites')).toBeAttached()
    await expect(page.getByTestId('category-intercites')).toHaveText(
      'Intercités  - 91.2 km0.82 kg CO₂eusage : 65%, construction : 35%'
    )
  })
})

test('Load correct number of tabs and redirect with params', async ({ page }) => {
  await page.goto(
    '/iframes/transport/itineraire?km=12&itineraireStart=Paris&itineraireEnd=Lyon&teletravailStart=Nantes&teletravailEnd=Marseille&tabs=teletravail'
  )

  await test.step('check number of tabs', async () => {
    await expect(page.getByTestId('transport-tabs-wrapper')).not.toBeVisible()
    await expect(page.getByLabel('Départ')).toHaveAttribute('value', 'Paris France', {
      timeout: 10000,
    })
  })

  await test.step('test redirection', async () => {
    await page.goto(
      '/iframes/transport/itineraire?km=12&itineraireStart=Paris&itineraireEnd=Lyon&teletravailStart=Nantes&teletravailEnd=Marseille&tabs=distance'
    )
    await page.getByTestId('transport-tab-distance').click()

    await expect(page.getByTestId('input-km-value')).toHaveValue('12')

    await expect(page.getByTestId('category-busthermique')).toBeAttached()
    await expect(page.getByTestId('category-busthermique')).toHaveText(
      'Bus thermique1.36 kg CO₂eusage : 92%, construction : 8%'
    )
  })
})

test('Roundtrip', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/transport/itineraire')

  await page.getByLabel('Départ').fill('nantes')
  await page.getByText('Nantes 44000 France', { exact: true }).click()
  await page.getByLabel('Arrivée').fill('angers')
  await page.getByText('Angers 49000 France', { exact: true }).click()

  await expect(page.getByLabel('Départ')).toHaveAttribute('value', 'Nantes 44000 France')
  await expect(page.getByLabel('Arrivée')).toHaveAttribute('value', 'Angers 49000 France')

  await expect(page.getByTestId('category-intercites')).toBeAttached()
  await expect(page.getByTestId('category-intercites')).toHaveText(
    'Intercités  - 91.2 km0.82 kg CO₂eusage : 65%, construction : 35%'
  )
  await expect(page.getByTestId('category-tgv')).not.toBeAttached()

  await page.getByTestId('checkbox-roundTrip').check()
  await expect(page.getByTestId('category-intercites')).toBeAttached()
  await expect(page.getByTestId('category-intercites')).toHaveText(
    'Intercités  - 182 km1.64 kg CO₂eusage : 65%, construction : 35%'
  )
  await expect(page.getByTestId('category-tgv')).not.toBeAttached()

  await page.getByTestId('header-share-button').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    'http://localhost:3000/outils/transport/itineraire?itineraireStart=Nantes 44000 France&itineraireEnd=Angers 49000 France&roundTrip=true&defaultMode=list&language=fr'
  )
  await page.getByTestId('cancel-button').click()
  await page.getByTestId('header-integrate-button').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&km=10&itineraireStart=Nantes 44000 France&itineraireEnd=Angers 49000 France&defaultMode=list&roundTrip=true"></script>'
  )
  await page.getByTestId('custom-param-roundTrip-checkbox').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&km=10&itineraireStart=Nantes 44000 France&itineraireEnd=Angers 49000 France&defaultMode=list"></script>'
  )
  await page.getByTestId('cancel-button').click()
  await expect(page.getByTestId('category-intercites')).toHaveText(
    'Intercités  - 182 km1.64 kg CO₂eusage : 65%, construction : 35%'
  )

  await page.goto(
    'http://localhost:3000/outils/transport/itineraire?itineraireStart=Nantes 44000 France&itineraireEnd=Angers 49000 France&roundTrip=true&defaultMode=list&language=fr'
  )
  await expect(page.getByTestId('category-intercites')).toHaveText(
    'Intercités  - 182 km1.64 kg CO₂eusage : 65%, construction : 35%',
    {
      timeout: 10000,
    }
  )
  await expect(page.getByTestId('category-tgv')).not.toBeAttached()
})
