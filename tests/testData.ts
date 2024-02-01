/*
 * @Author: Lu
 * @Date: 2024-01-31 22:13:31
 * @LastEditTime: 2024-02-01 21:59:23
 * @LastEditors: Lu
 * @Description:
 */
import { IParseHtmlItem } from "../src/types";

export const getTestData = (): {
  name: string;
  input: string;
  only?: boolean;
  skip?: boolean;
  output: IParseHtmlItem[];
}[] => {
  return [
    {
      name: "转换一级 html",
      input: `<div>a</div>`,
      output: [
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [
            {
              tag: "",
              value: "a",
              type: "text",
              children: [],
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
    },
    {
      name: "一级不带内容",
      input: `<div></div>`,
      output: [
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [],
          attributes: [],
        },
      ],
    },
    {
      name: "多个层级不带内容",
      input: `<div><p></p><img /><img/><div><a></a></div></div>`,
      output: [
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [
            {
              tag: "p",
              value: "",
              type: "tag",
              children: [],
              attributes: [],
            },
            {
              tag: "img",
              value: "",
              type: "tag",
              children: [],
              attributes: [],
            },
            {
              tag: "img",
              value: "",
              type: "tag",
              children: [],
              attributes: [],
            },
            {
              tag: "div",
              value: "",
              type: "tag",
              children: [
                {
                  tag: "a",
                  value: "",
                  type: "tag",
                  children: [],
                  attributes: [],
                },
              ],
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
    },
    {
      name: "处理多个一级",
      input: `<div>a</div><div>a2</div><div>a3</div>`,
      output: [
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [
            {
              tag: "",
              value: "a",
              type: "text",
              children: [],
              attributes: [],
            },
          ],
          attributes: [],
        },
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [
            {
              tag: "",
              value: "a2",
              type: "text",
              children: [],
              attributes: [],
            },
          ],
          attributes: [],
        },
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [
            {
              tag: "",
              value: "a3",
              type: "text",
              children: [],
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
    },
    {
      name: "处理单闭合标签",
      input: `<div>a <img /></div>`,
      output: [
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [
            {
              tag: "",
              value: "a ",
              type: "text",
              children: [],
              attributes: [],
            },
            {
              tag: "img",
              value: "",
              type: "tag",
              children: [],
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
    },
    {
      name: "处理多个单闭合标签",
      input: `<div>a <img /><p><img /></p></div>`,
      output: [
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [
            {
              tag: "",
              value: "a ",
              type: "text",
              children: [],
              attributes: [],
            },
            {
              tag: "img",
              value: "",
              type: "tag",
              children: [],
              attributes: [],
            },
            {
              tag: "p",
              value: "",
              type: "tag",
              children: [
                {
                  tag: "img",
                  value: "",
                  type: "tag",
                  children: [],
                  attributes: [],
                },
              ],
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
    },
    {
      name: "转换多级 html",
      input: `<div>sdf sdaf asd fasdf 

      sdf 
      sd
      f sd
      f 
      sdf
      da fasdf <div>b</div><div>c</div></div>`,
      output: [
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [
            {
              tag: "",
              value: `sdf sdaf asd fasdf 

      sdf 
      sd
      f sd
      f 
      sdf
      da fasdf `,
              type: "text",
              children: [],
              attributes: [],
            },
            {
              tag: "div",
              value: "",
              type: "tag",
              children: [
                {
                  tag: "",
                  value: "b",
                  type: "text",
                  children: [],
                  attributes: [],
                },
              ],
              attributes: [],
            },
            {
              tag: "div",
              value: "",
              type: "tag",
              children: [
                {
                  tag: "",
                  value: "c",
                  type: "text",
                  children: [],
                  attributes: [],
                },
              ],
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
    },
    {
      name: "处理 <? ?> 标签",
      input: `<?xml version="1.0" encoding="UTF-8"?><div></div>`,
      skip: true,
      output: [
        {
          tag: "img",
          value: "",
          type: "tag",
          children: [],
          attributes: [],
        },
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [],
          attributes: [],
        },
      ],
    },
    {
      name: "标签中含有属性",
      input: `<div a='a' b="2">a</div>`,
      output: [
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [
            {
              tag: "",
              value: "a",
              type: "text",
              children: [],
              attributes: [],
            },
          ],
          attributes: [
            {
              key: "a",
              value: "a",
            },
            {
              key: "b",
              value: "2",
            },
          ],
        },
      ],
    },
    {
      name: "多个层级、多个标签中含有属性",
      input: `<div a='a' b="2">a<p c="dsfsdf sdf"><a href='ddc.com'/></p></div>`,
      output: [
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [
            {
              tag: "",
              value: "a",
              type: "text",
              children: [],
              attributes: [],
            },
            {
              tag: "p",
              value: "",
              type: "tag",
              children: [
                {
                  tag: "a",
                  value: "",
                  type: "tag",
                  children: [],
                  attributes: [
                    {
                      key: "href",
                      value: "ddc.com",
                    },
                  ],
                },
              ],
              attributes: [
                {
                  key: "c",
                  value: "dsfsdf sdf",
                },
              ],
            },
          ],
          attributes: [
            {
              key: "a",
              value: "a",
            },
            {
              key: "b",
              value: "2",
            },
          ],
        },
      ],
    },
  ];
};
