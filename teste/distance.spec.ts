import { expect, test } from '@playwright/test'

test('Transport distance list', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/transport')

  await expect(page.getByTestId('category-metro-value')).toContainText('0.04')
  await expect(page.getByTestId('category-rer-value')).not.toBeVisible()
  await expect(page.getByTestId('category-tgv-value')).not.toBeVisible()

  await page.getByTestId('input-km-value').fill('100')
  await expect(page.getByTestId('category-metro-value')).not.toBeVisible()
  await expect(page.getByTestId('category-rer-value')).toContainText('0.98')
  await expect(page.getByTestId('category-tgv-value')).not.toBeVisible()
  await page.getByTestId('input-km-value').fill('1000')
  await expect(page.getByTestId('category-metro-value')).not.toBeVisible()
  await expect(page.getByTestId('category-rer-value')).not.toBeVisible()
  await expect(page.getByTestId('category-tgv-value')).toContainText('2.93')

  await page.getByTestId('header-integrate-button').click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport" data-search="?theme=default&language=fr&km=1000&defaultMode=list"></script>'
  )
  await page.getByRole('button', { name: 'Afficher par défaut' }).first().click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&km=1000&defaultMode=list"></script>'
  )
  await page
    .locator('label')
    .filter({ hasText: /^Itinéraire$/ })
    .locator('div')
    .nth(1)
    .click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&tabs=distance&km=1000&defaultMode=list"></script>'
  )
  await page.getByRole('button', { name: 'Afficher par défaut' }).nth(1).click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&tabs=distance&km=1000&defaultMode=comparison"></script>'
  )

  await page.locator('div').filter({ hasText: /^TGV$/ }).nth(2).click()
  await page.locator('div').filter({ hasText: /^TER$/ }).nth(2).click()
  await page.getByLabel('Intégrer').getByText('Covoiturage thermique', { exact: true }).click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&tabs=distance&km=1000&defaultMode=comparison&modes=avion,intercites,voiturethermique,voitureelectrique+1,voitureelectrique,autocar,velo,veloelectrique,busthermique,tramway,metro,scooter,moto,rer,buselectrique,trottinette,busgnv"></script>'
  )
  await page.getByTestId('text-select-comparison-1').selectOption('velo')
  await page.getByTestId('text-select-comparison-2').selectOption('moto')
  await expect(page.getByTestId('clipboard-box')).toContainText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="transport/itineraire" data-search="?theme=default&language=fr&tabs=distance&km=1000&defaultMode=comparison&comparison=velo,moto&modes=avion,intercites,voiturethermique,voitureelectrique+1,voitureelectrique,autocar,velo,veloelectrique,busthermique,tramway,metro,scooter,moto,rer,buselectrique,trottinette,busgnv"></script>'
  )

  await page.getByTestId('cancel-button').click()

  await page.getByTestId('header-share-button').click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    'http://localhost:3000/outils/transport?km=1000&comparison=velo,moto&defaultMode=list&language=fr'
  )
  await page.getByTestId('custom-param-km-checkbox').locator('div').nth(1).click()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    'http://localhost:3000/outils/transport?comparison=velo,moto&defaultMode=list&language=fr'
  )

  await expect(page.locator('label').filter({ hasText: "Personnaliser l'itinéraire" })).not.toBeVisible()
  await page.getByLabel('Itinéraire').check()
  await expect(page.getByTestId('clipboard-box')).toContainText(
    'http://localhost:3000/outils/transport/itineraire?comparison=velo,moto&defaultMode=list&language=fr'
  )
  await expect(page.locator('label').filter({ hasText: "Personnaliser l'itinéraire" })).toBeVisible()
})

test('Transport distance comparison', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/transport?defaultMode=comparison')
  await expect(page.getByTestId('comparison-tile-0')).toContainText('Voiture thermique2.18 kg CO₂e Modifier')
  await expect(page.getByTestId('comparison-tile-1')).toContainText('2.15Kg CO₂eévitésTGV0.03 kg CO₂e Modifier')

  await page.getByRole('button', { name: 'Voir une autre comparaison' }).click()
  await expect(page.getByTestId('comparison-tile-0')).toContainText('Voiture électrique1.03 kg CO₂e Modifier')
  await expect(page.getByTestId('comparison-tile-1')).toContainText('0.99Kg CO₂eévitésMétro0.04 kg CO₂e Modifier')

  await page.getByTestId('header-integrate-button').click()
  await page.getByTestId('text-select-comparison-1').selectOption('voiturethermique+2')
  await page.getByTestId('text-select-comparison-2').selectOption('avion')

  await page.getByTestId('cancel-button').click()

  await expect(page.getByTestId('comparison-tile-0')).toContainText(
    '1.86Kg CO₂eévitésCovoiturage thermique (2 passagers)0.73 kg CO₂e Modifier'
  )
  await expect(page.getByTestId('comparison-tile-1')).toContainText('Avion court courrier2.59 kg CO₂e Modifier')

  await page.getByTestId('comparison-tile-0').getByRole('button', { name: 'Modifier' }).click()
  await page.getByRole('button', { name: 'TGV' }).click()
  await expect(page.getByTestId('comparison-tile-0')).toContainText('TGV0.03 kg CO₂e Modifier')
  await expect(page.getByTestId('comparison-tile-1')).toContainText('Avion court courrier2.59 kg CO₂e Modifier')

  await page.getByTestId('input-km-value').fill('10000')
  await expect(page.getByTestId('comparison-tile-0')).toContainText('1,490Kg CO₂eévitésTGV29.3 kg CO₂e Modifier')
  await expect(page.getByTestId('comparison-tile-1')).toContainText('Avion long courrier1,520 kg CO₂e Modifier')
})

test('Transport distance default values', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/transport?km=15')

  await expect(page.getByRole('link', { name: 'Covoiturage électrique 0.78 kg CO₂e' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Covoiturage thermique 1.63 kg CO₂e' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Bus électrique 0.33 kg CO₂e' })).not.toBeVisible()
  await page.getByRole('button', { name: 'Voir tous les modes de' }).click()
  await expect(page.getByRole('link', { name: 'Bus électrique 0.33 kg CO₂e' })).toBeVisible()

  await page.goto(
    'http://localhost:3000/outils/transport?comparison=scooter,avion&km=15&itineraireStart=Lyon%20France&itineraireEnd=Paris%20France&defaultMode=comparison&modes=intercites,voiturethermique,voitureelectrique,velo,veloelectrique,busthermique,tramway,metro,scooter,moto,rer,ter,trottinette,busgnv,voitureelectrique+1'
  )

  await expect(page.getByTestId('transport-tab-itineraire')).toBeVisible()

  await expect(page.getByText("Mode d'affichage :ListeComparaison")).toBeVisible()
  await expect(page.getByTestId('comparison-tile-0')).toContainText('Scooter ou moto légère1.14 kg CO₂e Modifier')
  await expect(page.getByTestId('comparison-tile-1')).toContainText(
    'Avion court courrierDésolé !L’itinéraire demandé n’est pas compatible avec ce mode de transport Modifier'
  )

  await page.getByRole('button', { name: 'Liste' }).click()
  await expect(page.getByRole('link', { name: 'Bus thermique 1.7 kg CO₂e' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Bus électrique 0.33 kg CO₂e' })).not.toBeVisible()
  await expect(page.getByRole('link', { name: 'Covoiturage électrique 0.78 kg CO₂e' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Covoiturage thermique 1.63 kg CO₂e' })).not.toBeVisible()

  await page.getByRole('button', { name: 'Voir tous les modes de' }).click()
  await expect(page.getByRole('link', { name: 'Bus thermique 1.7 kg CO₂e' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Bus électrique 0.33 kg CO₂e' })).not.toBeVisible()

  await page.goto('http://localhost:3000/outils/transport?modes=velo,voiturethermique&defaultMode=comparison')
  await expect(page.getByTestId('comparison-tile-0')).toContainText('2.18Kg CO₂eévitésVélo ou marche0 kg CO₂e')
  await expect(page.getByTestId('comparison-tile-1')).toContainText('Voiture thermique2.18 kg CO₂e')

  await page.goto(
    'http://localhost:3000/outils/transport?modes=velo,voiturethermique,voiturethermique+1&defaultMode=comparison'
  )
  await expect(page.getByTestId('comparison-tile-0')).toContainText('Voiture thermique2.18 kg CO₂e Modifier')
  await expect(page.getByTestId('comparison-tile-1')).toContainText(
    '1.09Kg CO₂eévitésCovoiturage thermique (1 passager)1.09 kg CO₂e Modifier'
  )
  await expect(page.getByRole('button', { name: 'Voir une autre comparaison' })).not.toBeVisible()

  await page.goto(
    'http://localhost:3000/outils/transport?&tabs=distance&km=15&mode=comparison&comparison=metro,avion&modes=voiturethermique,tgv,metro,avion'
  )
  await expect(page.getByTestId('transport-tab-itineraire')).not.toBeVisible()
  await expect(page.getByText("Mode d'affichage :ListeComparaison")).not.toBeVisible()
  await expect(page.getByTestId('comparison-tile-0')).toContainText('3.81Kg CO₂eévitésMétro0.07 kg CO₂e Modifier')
  await expect(page.getByTestId('comparison-tile-1')).toContainText('Avion court courrier3.88 kg CO₂e Modifier')
})
