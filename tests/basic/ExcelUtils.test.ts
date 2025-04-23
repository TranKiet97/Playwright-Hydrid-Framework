import { ExcelUtils } from '../../utils/ExcelUtils';
import { test } from '@playwright/test';

test('Upload download excel validation', async ({ page }) => {
    
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    await download.saveAs('downloads/' + download.suggestedFilename());

    const excelUtils = new ExcelUtils();
    await excelUtils.readExcel('downloads/' + download.suggestedFilename());
    const colValues = excelUtils.getColumnData('Sheet1', 'B');
    console.log(colValues);

    // await page.locator("#fileinput").click();
    // await page.locator("#fileinput").setInputFiles('downloads/' + download.suggestedFilename());
    // const textlocator = page.getByText(textSearch);
    // const desiredRow = page.getByRole('row').filter({ has: textlocator });
    // await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

})