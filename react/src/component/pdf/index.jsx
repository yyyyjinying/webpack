/* eslint-disable no-unused-vars */
import React from "react";
import { PDFReader } from 'reactjs-pdf-reader-custom';
class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ overflow: "scroll", height: 600 }}>
        <PDFReader showAllPage={true} url="http://0.0.0.0:3030/common/file/test.pdf"/>
      </div>
    );
  }
}

export default Test;
