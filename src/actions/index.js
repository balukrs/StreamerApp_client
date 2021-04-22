import Api from "../api/streams";

export const signIn = (userid) => {
  return {
    type: "SIGN_IN",
    payload: userid,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const createStream = (formValue) => {
  return async (dispatch) => {
    const response = await Api.post("/streams", formValue);
    dispatch({ type: "CREATE_STREAM", payload: response });
    window.location = "/";
  };
};

export const streamData = () => {
  return async (dispatch) => {
    const response = await Api.get("/streams");
    dispatch({ type: "LIST_STREAM", payload: response.data });
  };
};

export const editStream = (formValue, id) => {
  return async (dispatch) => {
    const response = await Api.post(`/streams/${id}`, formValue);
    dispatch({ type: "EDIT_STREAM", payload: response.data });
    window.location = "/";
  };
};

export const deleteStream = (id) => {
  return async (dispatch) => {
    const response = await Api.delete(`/streams/${id}`);
    dispatch({ type: "DELETE_STREAM", payload: response.data });
    window.location = "/";
  };
};

export const searchStream = (id) => {
  return async (dispatch) => {
    const response = await Api.get(`/streams/${id}`);
    dispatch({ type: "SEARCH_STREAM", payload: response.data });
  };
};
