import { expect, test } from '@playwright/test'

test('Livraison simulator', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/livraison')

  await expect(page.getByTestId('category-magasindouce-value')).toHaveText('6.15')
  await page.getByTestId('text-select-type').click()
  await page.getByTestId('text-select-type').selectOption('lavelinge')
  await expect(page.getByTestId('category-magasindouce-value')).toHaveText('25.4')
  await page.getByTestId('checkbox-fabrication').click()
  await expect(page.getByTestId('category-magasindouce-value')).toHaveText('300')
  await page.getByTestId('checkbox-fabrication').click({ force: true })

  await expect(page.getByTestId('category-pointrelais-value')).toHaveText('28.3')
  await expect(page.getByTestId('livraison-pointrelais')).toHaveText(
    "Transport utilisé pour aller chercher l'objetVoiture thermiqueVoiture électrique3 km Distance parcourue pour Livraison en point relais à 7km"
  )
  await page.getByRole('button', { name: 'Augmenter le nombre de km' }).first().click()
  await expect(page.getByTestId('livraison-pointrelais')).toHaveText(
    "Transport utilisé pour aller chercher l'objetVoiture thermiqueVoiture électrique4 km Distance parcourue pour Livraison en point relais à 7km"
  )
  await expect(page.getByTestId('category-pointrelais-value')).toHaveText('28.7')
  await page.getByTestId('text-select-transport-type-pointrelais').click()
  await page.getByTestId('text-select-transport-type-pointrelais').selectOption('voitureelectrique')
  await expect(page.getByTestId('category-pointrelais-value')).toHaveText('27.8')

  await page.getByTestId('header-share-button').first().click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    'http://localhost:3000/outils/livraison?withFabrication=false&language=fr'
  )
  await page.getByTestId('custom-param-withFabrication-checkbox').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    'http://localhost:3000/outils/livraison?withFabrication=true&language=fr'
  )
  await page.getByRole('button', { name: 'Fermer' }).first().click()

  await page.getByTestId('header-integrate-button').first().click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="/livraison" data-search="?&withFabrication=true&theme=default&language=fr"></script>'
  )
  await page.getByTestId('custom-param-withFabrication-checkbox').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="/livraison" data-search="?&theme=default&language=fr"></script>'
  )
  await page.getByLabel('Intégrer').getByText('Courses alimentaires').click()
  await expect(page.getByTestId('clipboard-box')).toHaveText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="/livraison" data-search="?&theme=default&language=fr&types=chaussure,livre,microondes,vetements,lavelinge,lit,smartphone,vin,cafetiere"></script>'
  )
  await page.getByLabel('Intégrer').getByText('Paire de chaussures').click()
  await page.getByLabel('Intégrer').getByText('Micro-ondes').click()
  await page.getByLabel('Intégrer').getByText('Livres').click()
  await page.getByLabel('Intégrer').getByText('Commande de vêtements').click()
  await page.getByLabel('Intégrer').getByText('Lit complet').click()
  await page.getByLabel('Intégrer').getByText('Caisse de vin').click()
  await page.getByLabel('Intégrer').getByText('Smartphone', { exact: true }).click()
  await page.getByLabel('Intégrer').getByText('Lave-linge').click()
  await expect(page.getByLabel('Intégrer').getByText('Cafetière espresso')).toBeDisabled()
})

test('Livraison iframes', async ({ page }) => {
  await page.goto(
    'http://localhost:3000/iframes/livraison?withFabrication=true&types=lavelinge,lit,smartphone,vin,cafetiere'
  )
  await expect(page.getByTestId('category-magasindouce-value')).toHaveText('300')

  const select = await page.getByTestId('text-select-type')
  const options = await select.evaluate((select) =>
    Array.from((select as HTMLSelectElement).options).map((option) => option.value)
  )
  expect(options).not.toContain('voitureelectrique')
  await page.goto(
    'http://localhost:3000/iframes/livraison?withFabrication=false&types=lavelinge,lit,smartphone,vin,cafetiere'
  )
  await expect(page.getByTestId('category-magasindouce-value')).toHaveText('25.4')
})
