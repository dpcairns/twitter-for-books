import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8888');
  await page.getByRole('link', { name: 'A Room with a View by E. M. Forster' }).click();
  await page.getByText('show more tweets').click();
  await page.getByText('show more tweets').click();
  await page.getByText('show more tweets').click();
  await page.getByText('X', { exact: true }).click();
});

test('test2', async ({ page}) => {
  await page.goto('http://localhost:8888');
  await page.getByLabel('Filter Books').click();
  await page.getByLabel('Filter Books').fill('mob');
  await page.getByRole('link', { name: 'Moby Dick; Or, The Whale by Herman Melville' }).click();
  const allTweets = page.locator('.tweet')

  await expect(allTweets.nth(2)).toContainText('States, you will have to check the laws of the country where you are located before using this eBook. Title: Moby-Dick; or The Whale Author: Herman Melville Release Date: June, 2001 [eBook #2701] [Most 3/5867');
  await page.getByText('show more tweets').click();
  
  await expect(allTweets).toHaveCount(5);
  await page.getByText('show more tweets').click();

  await expect(allTweets).toHaveCount(7);
})