/*
 * @Author: Lu
 * @Date: 2024-01-31 21:59:41
 * @LastEditTime: 2024-02-02 10:22:39
 * @LastEditors: Lu
 * @Description:
 */
import { IParseHtmlItem } from "./types";
import { parse } from "./parse";
import { query, queryAll } from "./query";

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
}

export { query, queryAll };
