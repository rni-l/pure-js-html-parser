/*
 * @Author: Lu
 * @Date: 2024-02-02 09:29:36
 * @LastEditTime: 2024-02-02 09:29:46
 * @LastEditors: Lu
 * @Description:
 */
import { IParseHtmlAttribute, IParseHtmlItem } from "./types";

const getTagName = (txt: string) => {
  if (txt.indexOf("</") !== 0) return getStartTagName(txt);
  return txt.replace(/[<>/]/g, "").trim();
};
const getStartTagName = (txt: string) => {
  console.log("txt", txt);
  const match = txt.match(/<\s*([a-zA-Z]+)\s*[^>]*>/);
  if (match && match[1]) return match[1];
  throw new Error("get tag error");
};

const getDefaultItem = (): IParseHtmlItem => ({
  tag: "",
  value: "",
  type: "tag",
  children: [],
  attributes: [],
});

export const parse = (list: string[], startIndex: number) => {
  const stack = [];
  let stackTxt = "";
  let closeTxt = "";
  let isStart = false;
  let isRightStart = false;
  let isEndStart = false;
  // const isRightEnd = false;
  const output: IParseHtmlItem[] = [];
  let obj: IParseHtmlItem = getDefaultItem();
  let i = startIndex;
  let isInQuote = false;
  let isNextNewAttribute = false;
  let attributeTxt = "";
  let attributeStartQuote = "";
  let attributeObj: IParseHtmlAttribute = { key: "", value: undefined };
  for (; i < list.length; i++) {
    const v = list[i];
    const nextVal = list[i + 1];
    stackTxt += v;
    if (closeTxt) closeTxt += v;
    if (closeTxt === "</") {
      closeTxt = "";
      // right start
      if (isEndStart) {
        console.log("right start");
        isRightStart = true;
      } else {
        // end this cb
        console.log("end cb", i);
        return {
          output,
          index: i - 2,
        };
      }
    }
    if (v === "<") {
      closeTxt += v;
      if (isStart) {
        if (nextVal !== "/" && isEndStart && !isRightStart) {
          // handle between value of tag
          const res = parse(list, i);
          obj.children = res.output;
          console.log("re start", res.index);
          stackTxt = "";
          closeTxt = "";
          attributeTxt = "";
          isRightStart = true;
          i = res.index;
        }
      } else {
        if (stackTxt.length > 1) {
          // before tag, have text value
          obj.type = "text";
          obj.value = stackTxt.slice(0, stackTxt.length - 1);
          stackTxt = "<";
          output.push(obj);
          // reset obj
          obj = getDefaultItem();
        }
        // left start
        isStart = true;
      }
    } else if (!isInQuote && v === ">") {
      console.log(isRightStart);
      if (isRightStart) {
        // right end
        console.log("stackTxt", stackTxt);
        const tag = getTagName(stackTxt);
        console.log("tag", tag, stackTxt);
        obj.tag = tag;
        obj = getDefaultItem();
        stackTxt = "";
        attributeTxt = "";
        isStart = false;
        isRightStart = false;
        isEndStart = false;
      } else if (isStart) {
        // left end
        console.log("left end");
        closeTxt = "";
        isEndStart = true;
        // if prev value equal '/', it is single close tag
        if (list[i - 1] === "/") {
          obj.tag = getTagName(stackTxt);
          stackTxt = "";
          attributeTxt = "";
          output.push(obj);
          obj = getDefaultItem();
          // because this tag is end, so need to restart
          isStart = false;
          isRightStart = false;
          isEndStart = false;
        } else {
          output.push(obj);
        }
      }
    } else if (isEndStart && !isRightStart) {
      // handle between value of tag
      const res = parse(list, i);
      obj.children = res.output;
      console.log("re start", res.index);
      stackTxt = "";
      closeTxt = "";
      attributeTxt = "";
      i = res.index;
    } else if (isStart && !isEndStart) {
      // handle attributes
      if (!isInQuote && v === " ") {
        if (attributeTxt) {
          // only have key
          attributeObj.key = attributeTxt;
          attributeStartQuote = "";
          isInQuote = false;
          obj.attributes.push(attributeObj);
        }
        isNextNewAttribute = true;
        attributeTxt = "";
        attributeObj = { key: "", value: undefined };
      } else if (isNextNewAttribute) {
        if (v === "=") {
          attributeObj.key = attributeTxt;
          attributeTxt = "";
        } else if (v === "'" || v === '"') {
          isInQuote = true;
          if (attributeStartQuote) {
            // attribute end
            attributeObj.value = attributeTxt;
            attributeTxt = "";
            attributeStartQuote = "";
            obj.attributes.push(attributeObj);
            isNextNewAttribute = false;
            isInQuote = false;
          } else {
            attributeStartQuote = v;
          }
        } else {
          attributeTxt += v;
        }
      }
    }
  }
  return { output, index: i };
};
