const INITIAL_RED = {
  isSignedin: null,
  userId: null,
};

const AuthReducers = (state = INITIAL_RED, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isSignedin: true, userId: action.payload };
    case "SIGN_OUT":
      return { ...state, isSignedin: false, userId: null };
    default:
      return state;
  }
};

export default AuthReducers;
