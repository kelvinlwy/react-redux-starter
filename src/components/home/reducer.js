import {STARTING, SUCCESSFUL_START, FAILED_START} from './actions';

const initialState = {
  started: true
};

export default function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case (STARTING):
      return {
        ...state,
        ...action.data
      };

    case (SUCCESSFUL_START):
      return {
        ...state,
        ...action.data
      };

    case (FAILED_START):
      return {
        ...state,
        ...action.data
      };

    default:
      return state;
  }
}
