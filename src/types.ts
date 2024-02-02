/*
 * @Author: Lu
 * @Date: 2024-01-31 22:13:05
 * @LastEditTime: 2024-02-02 20:09:48
 * @LastEditors: Lu
 * @Description:
 */
export interface IParseHtmlAttribute {
  key: string;
  value: string | undefined;
}
export type IParseValueType = "tag" | "text";
export interface IParseHtmlItem {
  tag: string;
  value: string;
  type: IParseValueType;
  children: IParseHtmlItem[];
  attributes: IParseHtmlAttribute[];
}

export enum EQueryType {
  tag,
  class,
  id,
}
export interface IQueryParams {
  type: EQueryType;
  queryTxt: string;
}
