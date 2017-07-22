import {connect} from 'react-redux';
import Home from './page';
import {Start} from './actions';
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    started: state.HomeReducer.started
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Start: () => {
      dispatch(Start());
    }
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));
