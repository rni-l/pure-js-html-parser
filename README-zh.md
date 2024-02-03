# pure-js-html-parser

> 不依赖任何库，纯 js(ts) 实现 html 解析功能，支持简单的查询、新增、修改、删除和转换为代码等功能

## 使用

安装：

```shell
npm i pure-js-html-parser
```

快速使用：

```javascript
import { Parser } from 'pure-js-html-parser'

const txt = `<div a='a' b="2">a</div>`

const $ = new Parser(txt)

// 获取解析后的数据
$.parserData
/**
 * [
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
  ]
 */
```

## 数据结构

```typescript
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
```

如果是含标签的节点，比如：`<div id="a'"></div>`，类型就是 `tag`，输出的格式是这样的：

```javascript
{
  tag: 'div',
  value: '',
  type: 'tag',
  children: [],
  attributes: [ { key: 'id', value: 'a' } ]
}
```

如果是内容，比如 `a` 或 `<div>a</div>` 中的 `a` 的内容，类型就是 `text`，输出的格式是这样的：

```javascript
{
  tag: '',
  value: 'a',
  type: 'text',
  children: [],
  attributes: []
}
```

## 查询节点

```javascript
const txt = `<div class="a" id="a" a='a' b="2">a</div>`
const $ = new Parser(txt)
// 根据标签查询
$.query('div')
// 根据 class
$.query('.a')
// 根据 id
$.query('#a')
// 查询全部
$.queryAll('.a')
```

## 新增节点

```javascript
const txt = `<div class="a" id="a" a='a' b="2">a</div>`
const $ = new Parser(txt)
// 在 .a 节点内的最后，插入一个节点
$.push({
  tag: 'div',
  value: '',
  type: 'tag',
  children: [],
  attributes: []
}, '.a')
// 在整个节点最后插入
$.push({
  tag: 'div',
  value: '',
  type: 'tag',
  children: [],
  attributes: []
})
```

## 修改节点

```javascript
const txt = `<div class="a" id="a" a='a' b="2">a</div>`
const $ = new Parser(txt)
// 修改 .a 节点的属性
$.modify('.a', (item) => {
  item.attributes[2].value = "a2"
  return item
})
```

## 删除节点

```javascript
const txt = `<div class="a" id="a" a='a' b="2"><div class="b"></div></div>`
const $ = new Parser(txt)
// 删除 .b 节点
$.remove('.b')
```

## 生成 HTML 代码

```javascript
const txt = `<div class="a" id="a" a='a' b="2"><div class="b"></div></div>`
const $ = new Parser(txt)
$.transform()
```
