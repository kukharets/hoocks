const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case '': {
      const { payload } = action;
      return {
        ...state,
      }
    }
    default:
      throw new Error();
  }
}

//dispatch({type: '', payload: {}})