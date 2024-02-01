/*
 * @Author: Lu
 * @Date: 2024-01-31 22:13:05
 * @LastEditTime: 2024-02-01 14:50:47
 * @LastEditors: Lu
 * @Description:
 */
export interface IParseHtmlAttribute {
  key: string;
  value: string;
  text: string;
}
export type IParseValueType = "tag" | "text";
export interface IParseHtmlItem {
  tag: string;
  value: string;
  type: IParseValueType;
  children: IParseHtmlItem[];
  attributes: IParseHtmlAttribute[];
}
