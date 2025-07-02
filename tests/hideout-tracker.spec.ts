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
    
    // Check if at least some modules are displayed
    const moduleCount = await page.locator('.bg-white.rounded-lg.shadow-md').count();
    expect(moduleCount).toBeGreaterThan(5);
  });

  test('should allow changing module levels', async ({ page }) => {
    // Find the first module with a level selector
    const firstLevelSelect = page.locator('select').first();
    await expect(firstLevelSelect).toBeVisible();
    
    // Change the level
    await firstLevelSelect.selectOption('1');
    
    // Verify the selection was made
    await expect(firstLevelSelect).toHaveValue('1');
  });

  test('should display required items when level is selected', async ({ page }) => {
    // Select level 1 for the first module
    const firstLevelSelect = page.locator('select').first();
    await firstLevelSelect.selectOption('1');
    
    // Wait for requirements to appear
    await expect(page.locator('text=に必要な素材').first()).toBeVisible();
    
    // Check if required items are displayed
    const requiredItems = page.locator('.bg-blue-50.rounded-lg');
    await expect(requiredItems.first()).toBeVisible();
  });

  test('should persist level selection after page reload', async ({ page }) => {
    // Select level 2 for the first module
    const firstLevelSelect = page.locator('select').first();
    await firstLevelSelect.selectOption('2');
    
    // Reload the page
    await page.reload();
    
    // Verify the selection persists
    await expect(firstLevelSelect).toHaveValue('2');
  });

  test('should show reset button and functionality', async ({ page }) => {
    const resetButton = page.locator('button:has-text(\"進捗をリセット\")');
    await expect(resetButton).toBeVisible();
    
    // Select a level first
    const firstLevelSelect = page.locator('select').first();
    await firstLevelSelect.selectOption('1');
    
    // Mock the confirm dialog to return true
    page.on('dialog', dialog => dialog.accept());
    
    // Click reset button
    await resetButton.click();
    
    // Verify level was reset to 0
    await expect(firstLevelSelect).toHaveValue('0');
  });

  test('should display future requirements section', async ({ page }) => {
    // Select level 1 for a module that has multiple levels
    const generatorSelect = page.locator('text=Generator').locator('..').locator('select');
    await generatorSelect.selectOption('1');
    
    // Check if future requirements section appears
    await expect(page.locator('text=今後必要になる素材')).toBeVisible();
  });

  test('should show completed status for max level modules', async ({ page }) => {
    // Find a module with max level and set it
    const shootingRangeSelect = page.locator('text=Shooting range').locator('..').locator('select');
    await shootingRangeSelect.selectOption('1');
    
    // Check if completed status is shown
    await expect(page.locator('text=最大レベルに達しています')).toBeVisible();
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