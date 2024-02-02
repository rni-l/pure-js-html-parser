/*
 * @Author: Lu
 * @Date: 2024-02-02 11:23:24
 * @LastEditTime: 2024-02-02 20:14:12
 * @LastEditors: Lu
 * @Description:
 */

import { IParseHtmlItem } from "../src/types";

export const getTestData = (): {
  name: string;
  input: string;
  only?: boolean;
  skip?: boolean;
  output: string;
}[] => {
  return [
    {
      name: "转换一级 html",
      input: `<div id="s" c='c234 234'>a</div>`,
      output: `<div id="s" c="c234 234">a</div>`,
    },
    {
      name: "转换 svg",
      input: `<?xml version="1.0" encoding="UTF-8"?><div id="s" c='c234 234'>a</div>`,
      output: `<?xml version="1.0" encoding="UTF-8"?><div id="s" c="c234 234">a</div>`,
    },
    {
      name: "一级不带内容",
      input: `<div></div>`,
      output: `<div></div>`,
    },
    {
      name: "转换多级",
      input: `<div c="d">
  <a href="c" class="ddd">http</a>
  <p>
    <span class="c"> sdf </span>
  </p>
</div>`,
      output: `<div c="d">
  <a href="c" class="ddd">http</a>
  <p>
    <span class="c"> sdf </span>
  </p>
</div>`,
    },
  ];
};
