export const STARTING = 'STARTING';
export const FAILED_START = 'FAILED_START';
export const SUCCESSFUL_START = 'SUCCESSFUL_START';

export const Start = () => {
  return dispatch => {
    dispatch({type: STARTING});
    return dispatch({type: SUCCESSFUL_START, data: {}});
  };
};
