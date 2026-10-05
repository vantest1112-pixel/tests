import { test, expect } from '@playwright/test';

test('Todo Page - thêm 100 todo và xóa các todo số lẻ', async ({ page }) => {
  // Test này thực hiện ~150 thao tác, mỗi thao tác trang đều re-render toàn bộ ~100 <li>
  // → chạy chậm đặc biệt trên webkit. Tăng timeout lên 120s (mặc định 30s).
  test.setTimeout(120_000);

  // Tự động Accept mọi dialog (confirm/alert/prompt) — mặc định Playwright dismiss dialog,
  // nếu không accept thì confirm() trả về false và task sẽ KHÔNG bị xóa
  page.on('dialog', (dialog) => dialog.accept());

  // 1. Truy cập trang
  await page.goto('https://material.playwrightvn.com/');

  // 2. Click vào Bài học 3
  await page.getByRole('link', {
    name: 'Bài học 3: Todo page'
  }).click();

  // Locator cho ô nhập và nút Add Task
  const input = page.locator('#new-task');
  const addButton = page.locator('#add-task');

  // 3. Thêm 100 Todo
  for (let i = 1; i <= 100; i++) {
    await input.fill(`todo ${i}`);
    await addButton.click();
  }
  await expect(page.locator('#task-list li')).toHaveCount(100);

  // 4. Xóa các Todo số lẻ — dùng has + getByText(exact: true) để khớp CHÍNH XÁC,
  //    tránh substring "todo 1" khớp nhầm "todo 10"..."todo 100" (strict mode violation)
  for (let i = 1; i <= 99; i += 2) {
    const todo = page.locator('#task-list li').filter({
      has: page.getByText(`todo ${i}`, { exact: true }),
    });

    await todo.getByRole('button', { name: 'Delete' }).click();
  }

  // 5. Kiểm tra còn lại 50 Todo
  await expect(page.locator('#task-list li')).toHaveCount(50);
});