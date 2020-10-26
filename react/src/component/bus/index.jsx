import React from "react";
import { Button } from "antd";
import AutoTable from "../autoTable/table01";
class Bus extends React.Component {
  componentDidMount() {
    console.log("bus");
  }

  print() {
    window.print();
  }
  render() {
    return (
      <div>
        <div>
          <Button type="primary" onClick={this.print.bind(this)}>
            打印
          </Button>
        </div>
        <AutoTable />
      </div>
    );
  }
}

export default Bus;
