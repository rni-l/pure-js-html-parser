/*
 * @Author: Lu
 * @Date: 2024-01-31 22:13:05
 * @LastEditTime: 2024-02-01 21:19:29
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
