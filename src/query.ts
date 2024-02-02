/*
 * @Author: Lu
 * @Date: 2024-02-02 09:31:35
 * @LastEditTime: 2024-02-02 22:22:26
 * @LastEditors: Lu
 * @Description:
 */

import { EQueryType, IParseHtmlItem, IQueryParams } from "./types";

export const checkQueryType = (queryTxt: string): IQueryParams => {
  if (queryTxt.indexOf(".") === 0)
    return {
      type: EQueryType.class,
      queryTxt: queryTxt.slice(1),
    };
  if (queryTxt.indexOf("#") === 0)
    return {
      type: EQueryType.id,
      queryTxt: queryTxt.slice(1),
    };
  return {
    type: EQueryType.tag,
    queryTxt,
  };
};

const checkIsMatch = (queryParams: IQueryParams, v: IParseHtmlItem) => {
  let isMatch = false;
  if (queryParams.type === EQueryType.tag) {
    isMatch = v.tag === queryParams.queryTxt;
  } else {
    isMatch = !!v.attributes.find(
      (attr) =>
        attr.key === (queryParams.type === EQueryType.class ? "class" : "id") &&
        attr.value == queryParams.queryTxt,
    );
  }
  return isMatch;
};

export const breadthQuery = (
  list: IParseHtmlItem[],
  queryParams: IQueryParams,
  cb?: (v: IParseHtmlItem, index: number, list: IParseHtmlItem[]) => void,
): IParseHtmlItem | undefined => {
  const willQueryList: IParseHtmlItem[] = [];
  const matchObj = list.find((v, i) => {
    if (checkIsMatch(queryParams, v)) {
      cb && cb(v, i, list);
      return true;
    }
    willQueryList.push(...v.children);
    return false;
  });
  if (matchObj) return matchObj;
  if (!willQueryList.length) return undefined;
  return breadthQuery(willQueryList, queryParams, cb);
};

export const deepQuery = (
  list: IParseHtmlItem[],
  queryParams: IQueryParams,
  cb?: (v: IParseHtmlItem, index: number, list: IParseHtmlItem[]) => void,
) => {
  list.find((v, i) => {
    if (checkIsMatch(queryParams, v)) {
      cb && cb(v, i, list);
      return true;
    }
    if (v.children) return deepQuery(v.children, queryParams, cb);
    return false;
  });
};

const breadthQueryAll = (
  list: IParseHtmlItem[],
  queryParams: IQueryParams,
): IParseHtmlItem[] => {
  const willQueryList: IParseHtmlItem[] = [];
  const matchList: IParseHtmlItem[] = [];
  list.forEach((v) => {
    if (checkIsMatch(queryParams, v)) {
      matchList.push(v);
    }
    willQueryList.push(...v.children);
  });
  if (willQueryList.length) {
    matchList.push(...breadthQueryAll(willQueryList, queryParams));
  }
  return matchList;
};

export const query = (
  list: IParseHtmlItem[],
  queryTxt: string,
): IParseHtmlItem | undefined => {
  const res = checkQueryType(queryTxt);
  console.log(res);
  return breadthQuery(list, res);
};

export const queryAll = (
  list: IParseHtmlItem[],
  queryTxt: string,
): IParseHtmlItem[] => {
  const res = checkQueryType(queryTxt);
  console.log(res);
  return breadthQueryAll(list, res);
};
