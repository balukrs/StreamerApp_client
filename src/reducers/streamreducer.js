const Streamlist = (state = [], action) => {
  switch (action.type) {
    case "LIST_STREAM":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default Streamlist;
