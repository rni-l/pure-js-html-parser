/*
 * @Author: Lu
 * @Date: 2024-02-02 09:36:43
 * @LastEditTime: 2024-02-02 11:20:07
 * @LastEditors: Lu
 * @Description:
 */

import { Parser } from "../src";
import { getQueryTestData, getQueryAllTestData } from "./testData";
const testData = getQueryTestData();
const testData2 = getQueryAllTestData();
const isOnly = testData.reduce((acc, v) => {
  if (acc) return acc;
  return !!v.only;
}, false);
const isOnly2 = testData2.reduce((acc, v) => {
  if (acc) return acc;
  return !!v.only;
}, false);

describe("query", () => {
  testData
    .filter((v) => !v.skip)
    .filter((v) => (isOnly ? v.only : true))
    .forEach((v) => {
      test(v.name, () => {
        const $ = new Parser(v.input);
        expect($.query(v.query))[v.expectFn || "toMatchObject"](v.output);
      });
    });
});

describe("queryAll", () => {
  testData2
    .filter((v) => !v.skip)
    .filter((v) => (isOnly ? v.only : true))
    .forEach((v) => {
      test(v.name, () => {
        const $ = new Parser(v.input);
        expect($.queryAll(v.query))[v.expectFn || "toMatchObject"](v.output);
      });
    });
});