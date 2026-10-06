import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../public/projects");

async function capture(url, file, scrollY = 0) {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);

  await page.addStyleTag({
    content: `
      [class*="cookie"], [id*="cookie"], [class*="consent"],
      [aria-label*="WhatsApp"], a[href*="wa.me"], a[href*="whatsapp"],
      #cookie-banner, .cookie-banner { display: none !important; }
    `,
  });

  if (scrollY > 0) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(800);
  } else {
    await page.evaluate(() => window.scrollTo(0, 0));
  }

  await page.screenshot({
    path: file,
    type: "png",
    animations: "disabled",
  });
  await browser.close();
  console.log("saved", file);
}

await capture("https://cunina.es/", path.join(OUT, "cunina/hero.png"), 0);
await capture("https://cunina.es/", path.join(OUT, "cunina/section.png"), 900);
await capture("https://getkairo.es/", path.join(OUT, "kairo/hero.png"), 0);
await capture("https://getkairo.es/", path.join(OUT, "kairo/section.png"), 700);
