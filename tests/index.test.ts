/*
 * @Author: Lu
 * @Date: 2024-01-31 22:00:19
 * @LastEditTime: 2024-02-01 11:25:33
 * @LastEditors: Lu
 * @Description:
 */
import { parseHtml } from "../src";
import { getTestData } from "./testData";
const testData = getTestData();
const isOnly = testData.reduce((acc, v) => {
  if (acc) return acc;
  return !!v.only;
}, false);
const onlyDescribe = !!testData.find((v) => v.only);

describe("parseHtml", () => {
  testData
    .filter((v) => !v.skip)
    .filter((v) => (isOnly ? v.only : true))
    .forEach((v) => {
      test(v.name, () => {
        expect(parseHtml(v.input)).toMatchObject(v.output);
      });
    });
});
