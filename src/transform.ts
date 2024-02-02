/*
 * @Author: Lu
 * @Date: 2024-02-02 11:21:12
 * @LastEditTime: 2024-02-02 20:16:05
 * @LastEditors: Lu
 * @Description:
 */

import { IParseHtmlAttribute, IParseHtmlItem } from "./types";

const deepQuery = (list: IParseHtmlItem[]) => {
  return list.reduce((acc, v) => {
    return acc;
  }, "");
};

const transformAttributes = (attributes: IParseHtmlAttribute[]): string => {
  return attributes
    .map((v) => {
      return v.value ? `${v.key}="${v.value}"` : v.key;
    })
    .join(" ");
};

export const transform = (list: IParseHtmlItem[]): string => {
  return list.reduce((acc, v) => {
    let txt = "";
    if (v.type === "tag") {
      let attributeTxt = transformAttributes(v.attributes);
      attributeTxt = attributeTxt ? ` ${attributeTxt}` : "";
      if (v.tag === "xml") {
        txt = `<?xml${attributeTxt}${transform(v.children)}?>`;
      } else {
        txt = `<${v.tag}${attributeTxt}>${transform(v.children)}</${v.tag}>`;
      }
      acc += txt;
    } else if (v.type === "text") {
      acc += v.value;
    }
    return acc;
  }, "");
};
