const puppeteer = require("puppeteer");
require("dotenv").config();

const username = process.env.E_USERNAME;
const password = process.env.E_PASSWORD;

const showBrowser = true;
const repeat = 100;

const loginUri =
  "https://www3.gobiernodecanarias.org/educacion/cau_ce/cas/login?service=https%3A%2F%2Fwww3.gobiernodecanarias.org%2Fmedusa%2Fevagd%2Fgcsur%2Flogin%2Findex.php";
const logoutUri =
  "https://www3.gobiernodecanarias.org/educacion/cau_ce/cas/logout?service=https%3A%2F%2Fwww3.gobiernodecanarias.org%2Feducacion%2Fcau_ce%2Fcas%2Flogout";
const coursePageUri =
  "https://www3.gobiernodecanarias.org/medusa/evagd/gcsur/course/view.php?id=14493";
const usernameInput = 'input[name="username"]';
const passwordInput = 'input[name="password"]';
const loginButton = 'button[id="btn-login"]';
const courseActivitySelector = ".aalink";

async function getPoints() {
  const browser = await puppeteer.launch({ headless: !showBrowser });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 800,
    isMobile: false,
  });
  const gotoUri = (uri) => {
    return page.goto(uri, { waitUntil: "networkidle2" });
  };
  const login = async () => {
    await gotoUri(loginUri);
    await page.waitForSelector(usernameInput);
    await page.waitForTimeout(300);
    await page.type(usernameInput, username);
    await page.type(passwordInput, password);
    await page.click(loginButton);
  };
  const openActivities = async () => {
    await gotoUri(coursePageUri);
    await page.waitForTimeout(300);
    const activities = await page.$$(courseActivitySelector);
    for (let i = 0; i < activities.length; i++) {
      await activities[i].click({ button: "middle" });
    }
  };

  await login();
  await page.waitForTimeout(300);
  await openActivities();
  await page.waitForTimeout(100);

  await gotoUri(logoutUri);
  await browser.close();
}

(async () => {
  for (let i = 0; i < repeat; i++) await getPoints();
})();
