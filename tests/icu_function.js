const rootURL = "http://localhost:3000";
/**
 *
 * @param {*} page
 * @param {*} func method name of page
 * @param {*} selector
 */
async function waitForAnd(page, func, selector) {
  await page.waitFor(selector);
  await page[func](selector);
}

exports.goToLogin = async function(page) {
  await page.goto(rootURL);
};

exports.login = async function(page, email, password) {
  await page.type("input[type=text]", email);
  await page.type("input[type=password]", password);
  await page.click("button");
};

exports.dontShowMeAgain = async function(page) {
  await page.waitFor("button[type=button]");
  await page.click("button[type=button]");
};

//TASKS

exports.goToAllTasks = async function(page) {
  await page.goto(rootURL + "/tasks/all/");
};

exports.createNewTask = async function(page) {
  await waitForAnd(page, "click", "td.create-new-item");
};

exports.renameTask = async function(page, text) {
  await page.waitFor(".item-title");
  await page.type(".item-title", text);
};
