import axios from "axios";

const API_URL = import.meta.env.VITE_TEST_SERVER_URL;

const MbtiApi = axios.create({
  baseURL: API_URL,
});

export default MbtiApi;
