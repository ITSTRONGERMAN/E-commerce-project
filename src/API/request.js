import axios from "axios";
const request = axios.create({
  baseURL: "http://kumanxuan1.f3322.net:8001",
  timeout: 5000,
});
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
   return Promise.reject(err)
  }
);
request.interceptors.response.use((res) => {
  return res.data;
});
export default request;
