import React from "react";
import ReactDOM from "react-dom";
import Detail from "component/details";
import { Button } from "antd";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.openDialog = this.openDialog.bind(this);
    this.edit = this.edit.bind(this);
    this.add = this.add.bind(this);
    this.state = {
      detail: {
        isShow: false,
        sign: "add", // "add" "edit" "detail"
        value: {
          "01": "01",
          "02": "02",
          "03": "03666",
          "04": "04",
          "05": "05",
          "06": "06",
          "07": "07",
          "08": "08",
        },
      },
    };
  }

  edit(param) {
    console.log("修改操作");
    this.setState({
      detail: { ...this.state.detail, ...param },
    });
  }

  add(param) {
    console.log("新增操作");
    this.setState({
      detail: { ...this.state.detail, ...param },
    });
  }

  openDialog(param) {
    switch (param.sign) {
      case "edit":
        this.edit(param);
        break;
      case "add":
        this.add(param);
        break;
      default:
        this.setState({
          detail: { ...this.state.detail, ...param },
        });
    }
  }

  render() {
    return (
      <div>
        <Button
          onClick={() =>
            this.openDialog({
              isShow: true,
              sign: "edit",
              value: this.state.detail.value,
            })
          }
        >
          edit
        </Button>
        <Button
          onClick={() =>
            this.openDialog({
              isShow: true,
              sign: "add",
              value: {},
            })
          }
        >
          add
        </Button>
        <Button
          onClick={() =>
            this.openDialog({
              isShow: true,
              sign: "detail",
              value: this.state.detail.value,
            })
          }
        >
          detail
        </Button>
        <Detail
          openDialog={this.openDialog}
          sign={this.state.detail.sign}
          isShow={this.state.detail.isShow}
          detail={this.state.detail.value}
        />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
