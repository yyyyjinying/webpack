import React from 'react';
import { Button } from 'antd';
import { nonenumerable, autobind, readonly } from 'core-decorators';
// import { profile, nonenumerable, autobind, readonly } from 'core-decorators';

@autobind // 必须放在第一
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
    };
  }

  @nonenumerable
  eat() {
    console.log('eat=eat=eat');
  }

  // @profile(null, true)
  // sing() {}

  @readonly
  entree = 'steak';

  //   @autobind
  onClickhandle(number) {
    this.setState(
      (state) => {
        return {
          num: ++state.num + number,
        };
      },
      () => {
        console.log(this.state);
      },
    );
  }

  render() {
    return (
      <div>
        <Button onClick={this.onClickhandle.bind(this, 1)}>bind绑定点击事件</Button>
        <Button onClick={() => this.onClickhandle(1)}>autobind点击事件</Button>
      </div>
    );
  }
}
export default Home;
