import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h1>Welcome to React Redux Starter!</h1>
        {
          !this.props.started &&
          <div className="loader"/>
        }
      </div>
    );
  };
}

Home.propTypes = {
  func: PropTypes.func,
  number: PropTypes.number,
  string: PropTypes.string,
  boolean: PropTypes.bool,
  object: PropTypes.object,
  started: PropTypes.bool
};

Home.defaultProps = {
  started: false
};

export default Home;
