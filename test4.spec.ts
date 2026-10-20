import { test, expect } from '@playwright/test';

test('Thêm 10 note và tìm kiếm', async ({ page }) => {
  await page.goto('https://material.playwrightvn.com/');

  // 2. Click vào Bài học 4
  await page.getByRole('link', {
    name: 'Bài học 4: Personal notes'
  }).click();

  const notes = [
    { title: "HD1", content: "thức dậy lúc 6h sáng" },
    { title: "HD2", content: "vệ sinh cá nhân" },
    { title: "HD3", content: "ăn sáng" },
    { title: "HD4", content: "tập thể dục" },
    { title: "HD5", content: "Học bài" },
    { title: "HD6", content: "tới trường" },
    { title: "HD7", content: "Nghỉ trưa" },
    { title: "HD8", content: "ăn trưa" },
    { title: "HD9", content: "đánh cầu lông" },
    { title: "HD10", content: "ăn tối" }
  ];

  // Playwright chạy code trong Node.js, KHÔNG dùng được document/window.
  // Phải thao tác qua locator của Playwright.
  const titleInput = page.locator('#note-title');
  const contentInput = page.locator('#note-content');
  const addButton = page.locator('#add-note');

  // 3. Thêm lần lượt 10 note
  for (const note of notes) {
    await titleInput.fill(note.title);
    await contentInput.fill(note.content);
    await addButton.click();
  }

  // 4. Kiểm tra đủ 10 note
  await expect(page.locator('#note-count')).toHaveText('Total Notes: 10');

  // 5. Tìm kiếm từ khóa "ăn" — match 3 note: ăn sáng, ăn trưa, ăn tối
  await page.locator('#search').fill('ăn');

  await expect(page.locator('#note-count')).toHaveText('Total Notes: 3');
  await expect(page.locator('#notes-list li').filter({ hasText: 'ăn sáng' })).toBeVisible();
  await expect(page.locator('#notes-list li').filter({ hasText: 'ăn trưa' })).toBeVisible();
  await expect(page.locator('#notes-list li').filter({ hasText: 'ăn tối' })).toBeVisible();


});