const { expect, assert } = require("chai");
const _ = require("lodash");
const mongoose = require("mongoose");
const elasticsearch = require("elasticsearch");
const faker = require("faker");
const chance = require("chance").Chance();
const icu = require("./icu_function");

const client = new elasticsearch.Client({ host: "http://localhost:9200" });
const TASKS_INDEX = "tasks_test";
const EMAIL = "aaa@aaa.aaa";
const PASSWORD = "aaaaaaaa";

async function matchQuery(index, key, query) {
  const response = await client.search({
    index: index,
    type: index,
    body: {
      query: {
        match: {
          [key]: {
            query: query
          }
        }
      }
    }
  });
  return response["hits"]["hits"];
}

describe("sample test", () => {
  before(async () => {
    page = await browser.newPage();

    page.setViewport({ width: 1400, height: 1000 });

    await icu.goToLogin(page);
    await icu.login(page, EMAIL, PASSWORD);
    await icu.dontShowMeAgain(page);
  });
  after(async function() {
    //await page.close();
  });
  // it("should have the correct answer", async () => {
  //   const ANSWER_SELECTOR = "h1";
  //   await page.waitFor(ANSWER_SELECTOR);
  //   const heading = await page.$eval(
  //     ANSWER_SELECTOR,
  //     answer => answer.innerText
  //   );
  //   expect(heading).to.eql("Yes.");
  // });
  it("should create task in elasticsearch", async () => {
    await icu.goToAllTasks(page);
    const creatingTime = new Date();
    await icu.createNewTask(page);
    const hits = await matchQuery(TASKS_INDEX, "creator.email", EMAIL);
    let flag = false;
    let taskId = null;
    let firstTitle = null;
    hits.forEach(element => {
      let curCreated = new Date(element._source.created);
      if (curCreated.getMilliseconds() >= creatingTime.getMilliseconds()) {
        flag = true;
        id = element._source._id;
        firstTitle = element._source.title;
      }
    });
    assert.equal(flag, true, "Did not find the created task");
  });
  it("should update task in elasticsearch", async () => {
    await icu.renameTask(page, "מי אתה בכלל שתרים את הכל שלך עליי ילד מפגר");
  });
  it("should delete task in elasticsearch", async () => {});
  it("should create sub-tasks in elasticsearch", async () => {});
  it("should update sub-tasks in elasticsearch", async () => {});
  it("should delete sub-tasks in elasticsearch", async () => {});
});
