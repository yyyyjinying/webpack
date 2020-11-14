import React from "react";

class OtherComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        age: 12,
      },
    };
  }

  static defaultProps = {
    num: -1,
    emitFn: () => {},
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { num, emitFn } = this.props;
    return (
      <div>
        <div>
          <h1>other</h1>
          <span>{num}</span>
          <button onClick={() => emitFn(this.state.params, num)}>点击</button>
        </div>
      </div>
    );
  }
}

export default OtherComponent;
