/*
 * @Author: Lu
 * @Date: 2024-01-31 22:00:19
 * @LastEditTime: 2024-02-27 09:13:34
 * @LastEditors: Lu
 * @Description:
 */
import { parseHtml, Parser } from "../src";
import { getTestData, getModifyData } from "./testData";
// import "../src/c";
const testData = getTestData();
const testData2 = getModifyData();
const isOnly = testData.reduce((acc, v) => {
  if (acc) return acc;
  return !!v.only;
}, false);
const isOnly2 = testData2.reduce((acc, v) => {
  if (acc) return acc;
  return !!v.only;
}, false);

describe.skip("parseHtml", () => {
  testData
    .filter((v) => !v.skip)
    .filter((v) => (isOnly ? v.only : true))
    .forEach((v) => {
      test(v.name, () => {
        expect(parseHtml(v.input)).toMatchObject(v.output);
      });
    });
});

describe.skip("push/remove/modify", () => {
  testData2
    .filter((v) => !v.skip)
    .filter((v) => (isOnly ? v.only : true))
    .forEach((v) => {
      test(v.name, () => {
        const $ = new Parser(v.input[0]);
        const [i, ...residue] = v.input;
        $[v.fn](...residue);
        expect($.parseData).toMatchObject(v.output);
      });
    });
});
