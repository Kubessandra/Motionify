import { transfromGithubDataToTiming } from "./numberOfCommit";

const testData1 = {
  all: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    9, 4,
  ],
  owner: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 923, 0, 0, 0, 0, 0,
    0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 10, 2, 3, 32, 23,
    10, 23, 32, 4,
  ],
};

test("numberOfCommit per month", () => {
  const commitNumber = transfromGithubDataToTiming(testData1, "month");
  expect(commitNumber).toBe(69);
});

test("numberOfCommit per week", () => {
  const commitNumber = transfromGithubDataToTiming(testData1, "week");
  expect(commitNumber).toBe(4);
});
