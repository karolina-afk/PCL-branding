const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, 'pcl-brand-guidelines.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 60000 });

  // Wait for fonts and images to load
  await page.waitForTimeout(3000);

  await page.pdf({
    path: path.resolve(__dirname, 'PCL-Brand-Guidelines.pdf'),
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });

  console.log('PDF generated: PCL-Brand-Guidelines.pdf');
  await browser.close();
})();
