import { test, expect } from '@playwright/test';


test('front page lets us filter down books', async ({ page}) => {
  await page.goto('/');
  await page.getByLabel('Filter Books').click();
  await page.getByLabel('Filter Books').fill('mob');

  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('front-page-moby.png', { maxDiffPixels: 99999 });

  await page.getByRole('link', { name: 'Moby Dick; Or, The Whale by Herman Melville' }).click();
  const allTweets = page.locator('.tweet')

  await allTweets.nth(1).waitFor();
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveScreenshot('detail-page-moby-1.png',{ maxDiffPixelRatio: .03 });

  await expect(allTweets.nth(2)).toContainText('States, you will have to check the laws of the country where you are located before using this eBook. Title: Moby-Dick; or The Whale Author: Herman Melville Release Date: June, 2001 [eBook #2701] [Most 3/5867');
  await page.getByText('show more tweets').click();
  
  await expect(allTweets).toHaveCount(5);
  await page.getByText('show more tweets').click();

  await expect(allTweets).toHaveCount(7);

  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('detail-page-moby-1.png', { maxDiffPixelRatio: .03 });
});


test('detail page loads tweets two at a time on click', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'A Room with a View by E. M. Forster' }).click();
  await page.getByText('show more tweets').click();
  await page.getByText('show more tweets').click();
  await page.getByText('show more tweets').click();
  await page.getByText('X', { exact: true }).click();
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveScreenshot('detail-page-forster-1.png', { maxDiffPixelRatio: 0.03 });

});