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

    if (
      (error.response?.status === 401 ||
        error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        forceLogout();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/refresh-token`,
          {
            refreshToken,
          },
        );

        const newAccessToken = response.data.newAccessToken;
        console.log("newaccesstoken", newAccessToken)

        Cookies.set("accessToken", newAccessToken, {
          expires: 1,
        });

        originalRequest.headers.authorization =
          `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token failed:", refreshError);

        forceLogout();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
export default axiosInstance;
