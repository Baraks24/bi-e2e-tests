const { expect } = require("chai");
const _ = require("lodash");
const mongoose = require("mongoose");
const elasticsearch = require("elasticsearch");
const faker = require("faker");
const chance = require("chance");

describe("sample test", () => {
  before(async () => {
    page = await browser.newPage();
    await page.goto("http://shouldiorderpizza.com");
  });

  after(async function() {
    await page.close();
  });
  it("should have the correct answer", async () => {
    const ANSWER_SELECTOR = "h1";
    await page.waitFor(ANSWER_SELECTOR);
    const heading = await page.$eval(
      ANSWER_SELECTOR,
      answer => answer.innerText
    );
    expect(heading).to.eql("Yes.");
  });
});
