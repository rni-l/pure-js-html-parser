/*
 * @Author: Lu
 * @Date: 2024-01-31 22:00:19
 * @LastEditTime: 2024-01-31 22:09:25
 * @LastEditors: Lu
 * @Description:
 */
import { add } from "../src";

describe("add", () => {
  test("add", () => {
    expect(add(1, 2)).toBe(3);
  });
});
