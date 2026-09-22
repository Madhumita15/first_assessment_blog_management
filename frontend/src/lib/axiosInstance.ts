import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
const forceLogout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("user");
  Cookies.remove("role");
  window.location.href = "/login";
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if ((error.response.status === 401 || error.response.status === 403) &&  !originalRequest._retry) {
      console.log("error in interceptor", error.response);
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        // console.log("token avaliable...");
        const formdata = new FormData();
        formdata.append("refreshToken", refreshToken);
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/auth/refresh-token`,
            formdata,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );
          console.log("refresh token response", response);
          const newaccessToken = response?.data?.newAccessToken;
          Cookies.set("accessToken", newaccessToken);
          originalRequest.headers.Authorization = `Bearer ${newaccessToken}`
          return axiosInstance(originalRequest)
        } catch (error) {
          console.log("error", error);
          forceLogout()
        }
      } else {
        forceLogout();
      }
    }
    // if (error.response.status === 401) {
    //   Cookies.remove("token");
    //   window.location.href = "/admin/login";
    // }
    // return Promise.reject(error);
  },
);

export default axiosInstance;
