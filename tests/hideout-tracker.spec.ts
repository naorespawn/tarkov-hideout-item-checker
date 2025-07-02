import { test, expect } from '@playwright/test';

test.describe('Hideout Tracker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main title and description', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Escape from Tarkov');
    await expect(page.locator('h2')).toContainText('Hideout アイテムチェッカー');
    await expect(page.locator('p')).toContainText('各施設のレベルを設定して、必要な素材を確認しましょう');
  });

  test('should display hideout modules', async ({ page }) => {
    // Wait for modules to load
    await expect(page.locator('.bg-white.rounded-lg.shadow-md').first()).toBeVisible();
    
    // Check if all modules are displayed (should be 18 total modules)
    const moduleCount = await page.locator('.bg-white.rounded-lg.shadow-md').count();
    expect(moduleCount).toBeGreaterThan(15);
  });

  test('should allow changing module levels with buttons', async ({ page }) => {
    // Find the first module's level controls
    const firstModuleCard = page.locator('.bg-white.rounded-lg.shadow-md').first();
    const increaseButton = firstModuleCard.locator('button[title="レベルを上げる"]');
    const decreaseButton = firstModuleCard.locator('button[title="レベルを下げる"]');
    const levelDisplay = firstModuleCard.locator('span.font-semibold');
    
    await expect(increaseButton).toBeVisible();
    await expect(decreaseButton).toBeVisible();
    
    // Initially should be at level 0
    await expect(levelDisplay).toHaveText('0');
    await expect(decreaseButton).toBeDisabled();
    
    // Increase level
    await increaseButton.click();
    await expect(levelDisplay).toHaveText('1');
    await expect(decreaseButton).toBeEnabled();
    
    // Decrease level back to 0
    await decreaseButton.click();
    await expect(levelDisplay).toHaveText('0');
    await expect(decreaseButton).toBeDisabled();
  });

  test('should display required items when level is selected', async ({ page }) => {
    // Use button to increase level for the first module
    const firstModuleCard = page.locator('.bg-white.rounded-lg.shadow-md').first();
    const increaseButton = firstModuleCard.locator('button[title="レベルを上げる"]');
    
    await increaseButton.click();
    
    // Wait for requirements to appear
    await expect(page.locator('text=に必要な素材').first()).toBeVisible();
    
    // Check if required items are displayed
    const requiredItems = page.locator('.bg-blue-50.rounded-lg');
    await expect(requiredItems.first()).toBeVisible();
  });

  test('should persist level selection after page reload', async ({ page }) => {
    // Use button to set level 2 for the first module
    const firstModuleCard = page.locator('.bg-white.rounded-lg.shadow-md').first();
    const increaseButton = firstModuleCard.locator('button[title="レベルを上げる"]');
    const levelDisplay = firstModuleCard.locator('span.font-semibold');
    
    // Increase to level 2
    await increaseButton.click();
    await increaseButton.click();
    await expect(levelDisplay).toHaveText('2');
    
    // Reload the page
    await page.reload();
    
    // Verify the selection persists
    const reloadedLevelDisplay = page.locator('.bg-white.rounded-lg.shadow-md').first().locator('span.font-semibold');
    await expect(reloadedLevelDisplay).toHaveText('2');
  });

  test('should show reset button and functionality', async ({ page }) => {
    const resetButton = page.locator('button:has-text(\"進捗をリセット\")');
    await expect(resetButton).toBeVisible();
    
    // Set a level first using button
    const firstModuleCard = page.locator('.bg-white.rounded-lg.shadow-md').first();
    const increaseButton = firstModuleCard.locator('button[title="レベルを上げる"]');
    const levelDisplay = firstModuleCard.locator('span.font-semibold');
    
    await increaseButton.click();
    await expect(levelDisplay).toHaveText('1');
    
    // Mock the confirm dialog to return true
    page.on('dialog', dialog => dialog.accept());
    
    // Click reset button
    await resetButton.click();
    
    // Verify level was reset to 0
    await expect(levelDisplay).toHaveText('0');
  });

  test('should display future requirements section', async ({ page }) => {
    // Find Generator module and increase its level
    const generatorCard = page.locator('text=Generator').locator('..');
    const increaseButton = generatorCard.locator('button[title="レベルを上げる"]');
    
    await increaseButton.click();
    
    // Check if future requirements section appears
    await expect(page.locator('text=今後必要になる素材')).toBeVisible();
  });

  test('should show completed status for max level modules', async ({ page }) => {
    // Find Shooting range module and increase to max level
    const shootingRangeCard = page.locator('text=Shooting range').locator('..');
    const increaseButton = shootingRangeCard.locator('button[title="レベルを上げる"]');
    
    await increaseButton.click();
    
    // Check if completed status is shown
    await expect(page.locator('text=最大レベルに達しています')).toBeVisible();
    
    // Verify increase button is disabled at max level
    await expect(increaseButton).toBeDisabled();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verify main content is still visible and accessible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('select').first()).toBeVisible();
    
    // Check if grid layout adapts properly
    const moduleCards = page.locator('.bg-white.rounded-lg.shadow-md');
    await expect(moduleCards.first()).toBeVisible();
  });

  test('should display footer with data sources', async ({ page }) => {
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();
    
    // Check footer content
    await expect(page.locator('footer')).toContainText('データソース:');
    await expect(page.locator('footer')).toContainText('Escape from Tarkov Wiki');
    await expect(page.locator('footer')).toContainText('tarkov.dev');
    
    // Check links are present
    await expect(page.locator('footer a[href*=\"escapefromtarkov.fandom.com\"]')).toBeVisible();
    await expect(page.locator('footer a[href*=\"tarkov.dev\"]')).toBeVisible();
  });
});