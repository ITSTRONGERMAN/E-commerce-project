import axios from "axios";
const request = axios.create({
  baseURL: "http://kumanxuan1.f3322.net:8001",
  timeout: 5000,
});
request.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["X-Nideshop-Token"] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
request.interceptors.response.use((res) => {
  return res.data;
});
export default request;
