import { test, expect } from '@playwright/test';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';
import { BuildUrl } from '../../Functions/BuildUrl';
import i18n from '../../i18n';

test.describe('End to end test', () => {
  test('should log in successfully with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/fr/authenticate/signin');

    await page.route('**/Authenticate/SignIn', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ token: 'mock-token' }),
      });
    });

    // Remplir l’email
    await page.getByLabel(`${i18n.t('authenticate:email')} *`).fill('test@example.com');

    // Remplir le mot de passe
    await page.getByLabel(`${i18n.t('authenticate:password')} *`).fill('ValidPassword123!');

    // Intercepter la requête réseau si tu veux vérifier l’appel API
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/Authenticate/SignIn') && resp.status() === 200),
      await page.getByTestId('sign-in-button').click(),
    ]);

    expect(response.ok()).toBeTruthy();

    // Ou vérifier la redirection
    const url = new URL(page.url());
    expect(url.pathname).toBe(BuildUrl(EnumAppRoutes.HomePage)); // Ou la route d'accueil attendue
  });
});
