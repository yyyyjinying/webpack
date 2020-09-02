/* eslint-disable no-unused-vars */
import React from "react";
import {Button} from "antd";
import { PDFReader } from 'reactjs-pdf-reader-custom';
import { saveAs } from 'file-saver';
class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  loadHandle(){
    saveAs("http://0.0.0.0:3030/common/file","test.pdf"); // 指定下载test.   pdf
  }

  render() {
    return (
      <div>
        <Button onClick={this.loadHandle.bind(this)}>下载</Button>
        <div style={{ overflow: "scroll", height: 600 }}>
          <PDFReader showAllPage={true} url="http://0.0.0.0:3030/common/file/test.pdf"/>
        </div>
      </div>
    );
  }
}

export default Index;
