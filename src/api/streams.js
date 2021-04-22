import Axios from "axios";

const Api = Axios.create({
  baseURL: "https://streamer-app-clone.herokuapp.com",
});

export default Api;
