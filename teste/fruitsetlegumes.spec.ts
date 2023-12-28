import { expect, test } from '@playwright/test'
import configurePlaywrightCoverage from 'test-utils/configure-playwright-coverage'
import { getMonthLabel } from 'utils/months'

configurePlaywrightCoverage(test)

test('Page is loaded and month can be selected', async ({ page }) => {
  await page.goto('/fruitsetlegumes')

  await test.step('Page is loaded with current month', async () => {
    await expect(page.getByRole('heading').first()).toHaveText(
      "Sensibiliser à l'impact des fruits et légumes de saisons sur le climat"
    )
    await expect(page.getByTestId('fancy-select-label')).toHaveText(getMonthLabel(new Date().getMonth()))
  })
  await test.step('User can change month', async () => {
    await page.getByRole('combobox').selectOption('5')
    await expect(page.getByTestId('magic-link-/fruitsetlegumes/abricot')).toBeVisible()
    await page.getByTestId('header-share-button').click()
    await expect(page.getByTestId('clipboard-box')).toContainText('http://localhost:3000/fruitsetlegumes?month=5')
    await page.getByTestId('custom-param-month-select').selectOption('9')
    await expect(page.getByTestId('clipboard-box')).toContainText('http://localhost:3000/fruitsetlegumes?month=9')
    await page.getByTestId('custom-param-month-checkbox').click({ force: true })
    await expect(page.getByTestId('clipboard-box')).toContainText('http://localhost:3000/fruitsetlegumes?')
    await page.getByTestId('header-integrate-button').click()
    await expect(page.getByTestId('clipboard-box')).toContainText(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="fruitsetlegumes" data-search="?theme=default&month=5"></script>'
    )
    await page.getByTestId('custom-param-month-select').selectOption('9')
    await expect(page.getByTestId('clipboard-box')).toContainText(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="fruitsetlegumes" data-search="?theme=default&month=9"></script>'
    )
    await page.getByTestId('custom-param-month-checkbox').click({ force: true })
    await expect(page.getByTestId('clipboard-box')).toContainText(
      '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="fruitsetlegumes" data-search="?theme=default&"></script>'
    )
  })
})

test('Page is loaded with forced month', async ({ page }) => {
  if (new Date().getMonth() === 5) {
    await page.goto('/fruitsetlegumes?month=4')

    await expect(page.getByTestId('fancy-select-label')).toHaveText(getMonthLabel(4))
    await expect(page.getByTestId('magic-link-/fruitsetlegumes/artichaut')).toBeVisible()
  } else {
    await page.goto('/fruitsetlegumes?month=5')

    await expect(page.getByTestId('fancy-select-label')).toHaveText(getMonthLabel(5))
    await expect(page.getByTestId('magic-link-/fruitsetlegumes/abricot')).toBeVisible()
  }
})
