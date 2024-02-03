# pure-js-html-parser

> Implement an HTML parser in pure JS(TS) without relying on any libraries. Supports basic functionalities such as querying, adding, modifying, removing elements and converting to code.

[中文文档](./README-zh.md)

## Quickly use

install:

```shell
npm i pure-js-html-parser
```

use:

```javascript
import { Parser } from 'pure-js-html-parser'

const txt = `<div a='a' b="2">a</div>`

const $ = new Parser(txt)

// Get the parsed data
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


## Data structure

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

If the node contains a tag:`<div id="a'"></div>`, then the type is `tag`. The output is:

```javascript
{
  tag: 'div',
  value: '',
  type: 'tag',
  children: [],
  attributes: [ { key: 'id', value: 'a' } ]
}
```

If it is text, such as the content `a` or the `a` within `<div>a</div>`, then the type is `text`. The output is:

```javascript
{
  tag: '',
  value: 'a',
  type: 'text',
  children: [],
  attributes: []
}
```

## Query elements

```javascript
const txt = `<div class="a" id="a" a='a' b="2">a</div>`
const $ = new Parser(txt)
// query tag
$.query('div')
// query class
$.query('.a')
// query id
$.query('#a')
// query all
$.queryAll('.a')
```

## Add element

```javascript
const txt = `<div class="a" id="a" a='a' b="2">a</div>`
const $ = new Parser(txt)
// Insert an element at the end of the ".a" element
$.push({
  tag: 'div',
  value: '',
  type: 'tag',
  children: [],
  attributes: []
}, '.a')
// Insert an element at the end
$.push({
  tag: 'div',
  value: '',
  type: 'tag',
  children: [],
  attributes: []
})
```

## Modify element

```javascript
const txt = `<div class="a" id="a" a='a' b="2">a</div>`
const $ = new Parser(txt)
// Modify the attribute of the ".a" element'
$.modify('.a', (item) => {
  item.attributes[2].value = "a2"
  return item
})
```

## Remove element

```javascript
const txt = `<div class="a" id="a" a='a' b="2"><div class="b"></div></div>`
const $ = new Parser(txt)
$.remove('.b')
```

## Transform to HTML code

```javascript
const txt = `<div class="a" id="a" a='a' b="2"><div class="b"></div></div>`
const $ = new Parser(txt)
$.transform()
```
