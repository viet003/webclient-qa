import axios from "axios"
import reduxStore from "./redux"; // Import hàm reduxStore để lấy store
import { logout } from "./store/actions"; // Import action logout

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
})

const { store } = reduxStore();

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Thêm interceptor cho response
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // Thực hiện logout khi token hết hạn
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

export default instance