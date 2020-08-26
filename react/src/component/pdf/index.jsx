import React from "react";
import { PDFReader } from "reactjs-pdf-reader";
// import { PDFReader } from "react-read-pdf";
class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ overflow: "scroll", height: 600 }}>
        <PDFReader url="http://0.0.0.0:3030/common/file/index.pdf" />
      </div>
    );
  }
}

export default Test;
