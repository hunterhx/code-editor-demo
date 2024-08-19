import type { ElectronApplication } from '@playwright/test';
import { _electron as electron } from '@playwright/test';
import { afterAll, beforeAll, expect, test } from 'vitest';

let electronApp: ElectronApplication;

beforeAll(async () => {
  const mainProcessPath = '.vite/build/main.js';
  electronApp = await electron.launch({ args: [mainProcessPath] });
});

afterAll(async () => {
  await electronApp.close();
});

test('Main window title', async () => {
  const page = await electronApp.firstWindow();
  expect(await page.title()).toBe('MVP');
  await page.screenshot({ path: 'tests/screenshots/example.png' });
});
