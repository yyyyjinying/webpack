/* eslint-disable react/no-children-prop */
import React from "react";
import Markdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// 设置高亮样式
import * as Prism from "react-syntax-highlighter/dist/esm/styles/prism";
// 设置高亮的语言
import {
  jsx,
  javascript,
} from "react-syntax-highlighter/dist/esm/languages/prism";

import arrayMd from "./array.md";

class Index extends React.Component {
  componentDidMount() {
    // 注册要高亮的语法
    SyntaxHighlighter.registerLanguage("jsx", jsx);
    SyntaxHighlighter.registerLanguage("javascript", javascript);
  }
  render() {
    const renderers = {
      code: ({ language, value }) => {
        return (
          <SyntaxHighlighter
            style={Prism.xonokai}
            language={language}
            children={value}
          />
        );
      },
    };
    return (
      <Markdown source={arrayMd} escapeHtml={false} renderers={renderers} />
    );
  }
}

export default Index;
