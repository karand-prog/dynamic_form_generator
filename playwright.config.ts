import { test, expect } from '@playwright/test';

test('responsive layout test', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.setViewportSize({ width: 375, height: 667 }); // Mobile
  expect(await page.isVisible('textarea')).toBeTruthy();

  await page.setViewportSize({ width: 1024, height: 768 }); // Tablet
  expect(await page.isVisible('textarea')).toBeTruthy();
});
