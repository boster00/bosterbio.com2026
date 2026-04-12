const { chromium } = require("playwright");
const path = require("path");

(async () => {
  if (!process.env.DISPLAY && process.platform === "linux") {
    console.warn(
      "No DISPLAY set — a visible window needs a desktop session. On Linux try: xvfb-run -a node playwright/gmail-test.cjs\nOr run this script on your Mac/Windows machine for real screenshare.",
    );
  }

  const storageState = path.join(__dirname, ".auth", "user.json");

  const launchOpts = {
    headless: false,
    args: ["--window-size=1280,800", "--start-maximized"],
  };
  if (process.env.PLAYWRIGHT_CHROME_CHANNEL) {
    launchOpts.channel = process.env.PLAYWRIGHT_CHROME_CHANNEL;
  }
  const browser = await chromium.launch(launchOpts);
  const context = await browser.newContext({
    storageState,
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  await page.goto("https://mail.google.com", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(8000);

  const title = await page.title();
  const url = page.url();
  console.log("Title:", title);
  console.log("URL:", url);
  const loggedIn = url.includes("mail.google.com/mail") && !url.includes("signin");
  console.log("Gmail logged in:", loggedIn);

  const shot = path.join(__dirname, "..", "gmail-test.png");
  await page.screenshot({ path: shot, fullPage: false });
  console.log("Screenshot saved to gmail-test.png");

  const keepMs = Number(process.env.PLAYWRIGHT_KEEP_OPEN_MS || "600000");
  console.log(
    `Browser window is visible for screenshare — stays open ${keepMs / 1000}s (set PLAYWRIGHT_KEEP_OPEN_MS to change). Ctrl+C to exit sooner.`,
  );
  await page.waitForTimeout(keepMs);

  await browser.close();
})();
