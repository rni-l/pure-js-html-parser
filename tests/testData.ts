/*
 * @Author: Lu
 * @Date: 2024-01-31 22:13:31
 * @LastEditTime: 2024-02-02 22:29:07
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
    {
      name: "处理 svg 的标签",
      input: `<?xml version="1.0" encoding="UTF-8"?><div>a</div>`,
      output: [
        {
          tag: "xml",
          value: "",
          type: "tag",
          children: [],
          attributes: [
            {
              key: "version",
              value: "1.0",
            },
            {
              key: "encoding",
              value: "UTF-8",
            },
          ],
        },
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
  ];
};

export const getQueryTestData = (): {
  name: string;
  input: string;
  query: string;
  only?: boolean;
  skip?: boolean;
  output: IParseHtmlItem | undefined;
  expectFn?: string;
}[] => {
  return [
    {
      name: "根据 class 属性查询",
      input: `<div class="ddd">a</div>`,
      query: ".ddd",
      output: {
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
            key: "class",
            value: "ddd",
          },
        ],
      },
    },
    {
      name: "深度 class 属性查询",
      input: `<div class="ddd">
      <div>dsdf</div>      
      <div>dsdf
        <div>dsdf</div>
        <a class="dc" href="#"></a>
      </div>
      <div>dsdf</div>
</div>`,
      query: ".dc",
      output: {
        tag: "a",
        value: "",
        type: "tag",
        children: [],
        attributes: [
          {
            key: "class",
            value: "dc",
          },
          {
            key: "href",
            value: "#",
          },
        ],
      },
    },
    {
      name: "根据 id 属性查询",
      input: `<div id="ddd">a</div>`,
      query: "#ddd",
      output: {
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
            key: "id",
            value: "ddd",
          },
        ],
      },
    },
    {
      name: "根据标签查询",
      input: `<div id="ddd"><p>dd</p></div>`,
      query: "p",
      output: {
        tag: "p",
        value: "",
        type: "tag",
        children: [
          {
            tag: "",
            value: "dd",
            type: "text",
            children: [],
            attributes: [],
          },
        ],
        attributes: [],
      },
    },
    {
      name: "查询不到，返回 undefined",
      input: `<div id="ddd"><p>dd</p></div>`,
      query: ".p",
      output: undefined,
      expectFn: "toBe",
    },
    {
      name: "多个相同的 class，按广度优先，返回最新匹配的",
      input: `<div class="ddd">
      <div class="dc2">
        <div class="dc">dsdf0</div>
      </div>
      <div class="dc">dsdf</div>  
      <div class="dc">dsdf2
        <div>dsdf</div>
        <a class="dc" href="#"></a>
      </div>
      <div>dsdf</div>
</div>`,
      query: ".dc",
      output: {
        tag: "div",
        value: "",
        type: "tag",
        children: [
          {
            tag: "",
            value: "dsdf",
            type: "text",
            children: [],
            attributes: [],
          },
        ],
        attributes: [
          {
            key: "class",
            value: "dc",
          },
        ],
      },
    },
  ];
};

export const getQueryAllTestData = (): {
  name: string;
  input: string;
  query: string;
  only?: boolean;
  skip?: boolean;
  output: IParseHtmlItem[];
  expectFn?: string;
}[] => {
  return [
    {
      name: "根据 class 属性查询",
      input: `<div class="ddd">a</div>`,
      query: ".ddd",
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
              key: "class",
              value: "ddd",
            },
          ],
        },
      ],
    },
    {
      name: "深度 class 属性查询",
      input: `<div class="ddd">
      <div>dsdf</div>      
      <div>dsdf
        <div>dsdf</div>
        <a class="dc" href="#"></a>
      </div>
      <div>dsdf</div>
</div>`,
      query: ".dc",
      output: [
        {
          tag: "a",
          value: "",
          type: "tag",
          children: [],
          attributes: [
            {
              key: "class",
              value: "dc",
            },
            {
              key: "href",
              value: "#",
            },
          ],
        },
      ],
    },
    {
      name: "根据 id 属性查询",
      input: `<div id="ddd">a</div>`,
      query: "#ddd",
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
              key: "id",
              value: "ddd",
            },
          ],
        },
      ],
    },
    {
      name: "根据标签查询",
      input: `<div id="ddd"><p>dd</p></div>`,
      query: "p",
      output: [
        {
          tag: "p",
          value: "",
          type: "tag",
          children: [
            {
              tag: "",
              value: "dd",
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
      name: "查询不到，返回 undefined",
      input: `<div id="ddd"><p>dd</p></div>`,
      query: ".p",
      output: [],
    },
    {
      name: "多个相同的 class，按广度优先返回",
      input: `<div class="ddd">
          <div class="dc2">
            <div class="dc">dsdf0</div>
          </div>
          <div class="dc">dsdf</div>
          <div class="dc">dsdf2
            <div>dsdf</div>
            <a class="dc" href="#"></a>
          </div>
          <div>dsdf</div>
    </div>`,
      query: ".dc",
      output: [
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [
            {
              tag: "",
              value: "dsdf",
              type: "text",
              children: [],
              attributes: [],
            },
          ],
          attributes: [
            {
              key: "class",
              value: "dc",
            },
          ],
        },
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [
            {
              tag: "",
              value: `dsdf2
            `,
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
                  value: `dsdf`,
                  type: "text",
                  children: [],
                  attributes: [],
                },
              ],
              attributes: [],
            },
            {
              tag: "",
              value: `
            `,
              type: "text",
              children: [],
              attributes: [],
            },
            {
              tag: "a",
              value: ``,
              type: "tag",
              children: [],
              attributes: [
                {
                  key: "class",
                  value: "dc",
                },

                {
                  key: "href",
                  value: "#",
                },
              ],
            },
            {
              tag: "",
              value: `
          `,
              type: "text",
              children: [],
              attributes: [],
            },
          ],
          attributes: [
            {
              key: "class",
              value: "dc",
            },
          ],
        },
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [
            {
              tag: "",
              value: "dsdf0",
              type: "text",
              children: [],
              attributes: [],
            },
          ],
          attributes: [
            {
              key: "class",
              value: "dc",
            },
          ],
        },
        {
          tag: "a",
          value: ``,
          type: "tag",
          children: [],
          attributes: [
            {
              key: "class",
              value: "dc",
            },

            {
              key: "href",
              value: "#",
            },
          ],
        },
      ],
    },
  ];
};

export const getModifyData = (): {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any[];
  only?: boolean;
  skip?: boolean;
  fn: string;
  output: IParseHtmlItem[];
}[] => {
  return [
    {
      name: "添加节点",
      fn: "push",
      input: [
        `<div class="d">a</div>`,
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [],
          attributes: [{ key: "a", value: "a" }],
        },
      ],
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
              key: "class",
              value: "d",
            },
          ],
        },
        {
          tag: "div",
          value: "",
          type: "tag",
          children: [],
          attributes: [{ key: "a", value: "a" }],
        },
      ],
    },
    {
      name: "删除节点",
      input: [`<div class="d">a<a class="cc"></a></div>`, ".cc"],
      fn: "remove",
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
              key: "class",
              value: "d",
            },
          ],
        },
      ],
    },
    {
      name: "修改节点",
      input: [
        `<div class="d">a<a class="cc"></a></div>`,
        ".cc",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (v: any) => {
          v.children.push({
            tag: "",
            value: "a",
            type: "text",
            children: [],
            attributes: [],
          });
          return v;
        },
      ],
      fn: "modify",
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
              tag: "a",
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
                  key: "class",
                  value: "cc",
                },
              ],
            },
          ],
          attributes: [
            {
              key: "class",
              value: "d",
            },
          ],
        },
      ],
    },
  ];
};
