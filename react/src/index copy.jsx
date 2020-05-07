import React, {Component} from "react";
import ReactDOM from "react-dom";
import Detail from "component/details";
import Test from "component/test_component";
import { Button } from "antd";
import AutoComponent from "component";
import Layout from "component/layout";
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
// import {home, mockTest} from "mock";
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
          "beginTime": 1322195034000,
          "select": "02",
          "03": "03666",
          "timeRange": [1582732800000, 1585324800000],
          "check": "Y",
          "05": "05",
          "06": "06",
          "07": "07",
          "08": "08",
        },
      },
    };
  }

  

  componentDidMount() {
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
        <Test/>
        <AutoComponent/>
        <Button
          onClick={() =>
            this.openDialog({
              isShow: true,
              sign: "edit",
              value: this.state.detail.value,
            })
          }>
          edit
        </Button>
        <Button
          onClick={() =>
            this.openDialog({
              isShow: true,
              sign: "add",
              value: {},
            })
          }>
          add
        </Button>
        <Button
          onClick={() =>
            this.openDialog({
              isShow: true,
              sign: "detail",
              value: this.state.detail.value,
            })
          }>
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


// const About = () => (
//   <div>
//     <h2>About</h2>
//   </div>
// )

const Product = () => (
  <div>
    <h2>Product</h2>
  </div>
)

class Main extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Product">Product</Link>
          <Link to="/App">App</Link>
          <hr/>
          <Switch>
            <Route path="/" exact component={<Layout/>}>
              <Route path="app" component={App}/>

            </Route>
            <Route path="/product" component={Product}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
ReactDOM.render(<Main />, document.getElementById("app"));
