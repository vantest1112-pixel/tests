import { test, expect } from '@playwright/test';

test('Product Page - thêm sản phẩm vào giỏ hàng', async ({ page }) => {
  // 1. Truy cập trang
  await page.goto('https://material.playwrightvn.com/');

  // 2. Click vào Bài học 2
  await page.getByRole('link', {
    name: 'Bài học 2: Product page'
  }).click();

// Sản phẩm 1 → 2 sản phẩm
await page.getByRole('button', { name: 'Add to cart' }).nth(0).click();
await page.getByRole('button', { name: 'Add to cart' }).nth(0).click();

// Sản phẩm 2 → 3 sản phẩm
await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();

// Sản phẩm 3 → 1 sản phẩm
await page.getByRole('button', { name: 'Add to cart' }).nth(2).click();

// Kiểm tra giỏ hàng
const products = [
  { name: 'Product 1', quantity: '2' },
  { name: 'Product 2', quantity: '3' },
  { name: 'Product 3', quantity: '1' },
];

for (const product of products) {
  const row = page.getByRole('row').filter({
    hasText: product.name
  });

  const quantityCell = row.getByRole('cell').nth(2);

  await expect(quantityCell).toHaveText(product.quantity);

  const actualQuantity = await quantityCell.innerText();

  console.log(
    `${product.name} | Expected: ${product.quantity} | Actual: ${actualQuantity}`
  );
}


});