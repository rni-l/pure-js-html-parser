/*
 * @Author: Lu
 * @Date: 2024-01-31 21:59:41
 * @LastEditTime: 2024-02-02 11:21:56
 * @LastEditors: Lu
 * @Description:
 */
import { IParseHtmlItem } from "./types";
import { parse } from "./parse";
import { query, queryAll } from "./query";
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
}

export { query, queryAll, transform };
