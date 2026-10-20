import path from 'path';
import { test, expect } from '@playwright/test';

test('Register Page - nhập thông tin và đăng ký', async ({ page }) => {
  // 1. Truy cập trang
  await page.goto('https://material.playwrightvn.com/');

  // 2. Click vào Bài học 1
  await page.getByRole('link', {
    name: 'Bài học 1: Register Page (có đủ các element)'
  }).click();

  // 3. Nhập Username
  await page.getByLabel('Username').fill('Van');

  // 4. Nhập Email
  await page.getByLabel('Email').fill('vantest1112@gmail.com');

  // 5. Chọn Gender (dùng getByRole + exact:true để không match nhầm "Female")
  await page.getByRole('radio', { name: 'Male', exact: true }).check();


  // 6. Chọn Hobbies
  await page.getByLabel('Reading').check();
  await page.getByLabel('Traveling').check();

  // 7. Chọn Interests (đây là <select multiple> nên dùng selectOption, không dùng check)
  await page.getByLabel('Interests').selectOption({ label: 'Technology' });

  // 8. Chọn Country (trang chỉ có: United States, Canada, United Kingdom, Australia — không có Vietnam)
  await page.getByLabel('Country').selectOption({ label: 'Australia' });


  // 9. Nhập Date of Birth
  await page.getByLabel('Date of Birth').fill('1995-01-01');

  // 10. Upload Profile Picture
  await page
    .getByLabel('Profile Picture')
    .setInputFiles(path.join(Username, 'avatar.png'));

  // 11. Nhập Biography
  await page.getByLabel('Biography').fill(
    'Tôi đang học automation testing với Playwright.'
  );

  // 12. Click Register
  await page.getByRole('button', { name: 'Register' }).click();

  // 13. Kiểm tra user vừa đăng ký xuất hiện trong bảng kết quả
  await expect(
    page.getByRole('cell', { name: 'vantest1112@gmail.com' })
  ).toBeVisible();
});