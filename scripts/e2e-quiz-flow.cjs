/**
 * Bra Fit Quiz smoke test: all NEXT steps + one ← Back (step 7 → 6 → 7) + GET RESULTS.
 * Run: NODE_PATH=<dir with playwright>/node_modules node scripts/e2e-quiz-flow.cjs
 * Requires: npm run build && npm run start on port 3000
 */
const { chromium } = require("playwright");

const base = "http://127.0.0.1:3000";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const quizBox = page.locator("#find-your-fit");
  const next = () => quizBox.getByRole("button", { name: "NEXT", exact: true });
  const pick = (label) => quizBox.locator("button").filter({ hasText: label }).first();

  await page.goto(`${base}/`);
  await page.locator("#find-your-fit").scrollIntoViewIfNeeded();
  await page.waitForSelector("#quiz-first-name", { state: "visible", timeout: 20000 });

  // Step 1
  await page.locator("#quiz-first-name").fill("E2E");
  await page.locator("#quiz-last-name").fill("Test");
  await page.locator("#quiz-zip").fill("29607");
  await page.locator("#quiz-email").fill("e2e@example.com");
  await next().click();
  await page.waitForFunction(
    () => document.body.innerText.includes("How would you like to get fitted"),
    null,
    { timeout: 15000 }
  );

  // Step 2
  await pick("Virtual fitting").click();
  await next().click();

  // Step 3
  await page.locator("#quiz-band").waitFor({ state: "visible", timeout: 15000 });
  await page.locator("#quiz-band").selectOption("34");
  await page.locator("#quiz-cup").selectOption("D");
  await next().click();

  // Steps 4–12
  await pick("I'm not getting enough lift").click();
  await next().click();

  await pick("Wireless").click();
  await next().click();

  await pick("Cooling").click();
  await next().click();

  // Step 7 — confirm ← Back returns to step 6
  await page.getByRole("button", { name: /^\u2190 Back$/ }).click();
  await page.waitForFunction(
    () => document.body.innerText.includes("All of our bras are comfy"),
    null,
    { timeout: 10000 }
  );
  await next().click();

  await next().click();

  await pick("Middle").click();
  await next().click();

  await pick("6-12 months").click();
  await next().click();

  await pick("Brief").click();
  await next().click();

  await pick("M (6-8)").click();
  await next().click();

  await pick("None of the above.").click();
  await quizBox.getByRole("button", { name: "GET RESULTS" }).click();

  await page.getByText("You're all set!", { exact: false }).waitFor({ timeout: 10000 });

  console.log("PASS: quiz flow including ← Back step 7→6, then finish → GET RESULTS.");
  await browser.close();
}

main().catch((err) => {
  console.error("FAIL:", err);
  process.exit(1);
});
