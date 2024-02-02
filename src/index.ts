/*
 * @Author: Lu
 * @Date: 2024-01-31 21:59:41
 * @LastEditTime: 2024-02-02 22:24:12
 * @LastEditors: Lu
 * @Description:
 */
import { IParseHtmlItem } from "./types";
import { parse } from "./parse";
import {
  query,
  queryAll,
  checkQueryType,
  breadthQuery,
  deepQuery,
} from "./query";
import { transform } from "./transform";

export const parseHtml = (htmlTxt: string): IParseHtmlItem[] => {
  return parse(htmlTxt.split(""), 0).output;
};

export class Parser {
  parseData: IParseHtmlItem[] = [];
  constructor(htmlTxt: string) {
    this.parseData = parseHtml(htmlTxt);
  }

  query(txt: string) {
    return query(this.parseData, txt);
  }

  queryAll(txt: string) {
    return queryAll(this.parseData, txt);
  }

  transform() {
    return transform(this.parseData);
  }

  push(item: IParseHtmlItem, target?: string) {
    if (!target) {
      this.parseData.push(item);
      return;
    }
    const res = checkQueryType(target);
    breadthQuery(this.parseData, res, (v) => {
      v.children.push(item);
    });
  }

  remove(target: string) {
    if (!target) return;
    const res = checkQueryType(target);
    deepQuery(this.parseData, res, (v, i, list) => {
      list = list.splice(i, 1);
    });
  }

  modify(target: string, cb: (item: IParseHtmlItem) => IParseHtmlItem) {
    if (!target) return;
    const res = checkQueryType(target);
    deepQuery(this.parseData, res, (v, i, list) => {
      list[i] = cb(v);
    });
  }
}

export { query, queryAll, transform };
