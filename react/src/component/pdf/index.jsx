/* eslint-disable no-unused-vars */
import React from "react";
// import { PDFReader, MobilePDFReader } from "reactjs-pdf-reader";
// import { PDFReader, MobilePDFReader } from "react-read-pdf";
import PDFReader from "@/component/base/pcPdf";
class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ overflow: "scroll", height: 600 }}>
        <PDFReader showAllPage={true} url="http://0.0.0.0:3030/common/file/test.pdf"/>
        {/* <PDFReader url="http://0.0.0.0:3030/common/file/test.pdf" /> */}
        {/* <MobilePDFReader page={2} url="/common/file/test.pdf" /> */}
      </div>
    );
  }
}

export default Test;
