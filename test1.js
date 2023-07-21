const puppeteer = require("puppeteer");

(async () => {
  const websiteURL =
    "https://www.blsspainmorocco.net/MAR/account/login?returnUrl=%2fMAR%2fbls%2fVisaTypeVerification";
  const dummyTextEmail = "testing 1";

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(websiteURL);

  // Wait for the input field to be available before proceeding
  await page.waitForSelector("label", { text: "Email" });

  // Find the label element with 'Email' text
  const emailLabel = await page.$x('//label[contains(text(), "Email")]');

  // Find the common ancestor of the label and input (div)
  const commonAncestor = await page.evaluateHandle(
    (el) => el.parentElement,
    emailLabel[0]
  );

  // Find the corresponding input field within the common ancestor
  const inputField = await commonAncestor.$("input");

  // Wait for the input field to be available and then type the dummy text
  await inputField.type(dummyTextEmail);

  // Verify that the text was entered correctly by reading the input value
  const inputValue = await page.evaluate((input) => input.value, inputField);
  console.log(`Entered value: ${inputValue}`);
})();
