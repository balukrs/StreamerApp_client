const SearchReducer = (state = {}, action) => {
  switch (action.type) {
    case "SEARCH_STREAM":
      return { ...state, stream: action.payload };
    default:
      return state;
  }
};

export default SearchReducer;
