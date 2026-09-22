import axios, { type InternalAxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

type FailedQueueItem = {
  resolve: () => void;
  reject: (error: unknown) => void;
};

interface CustomAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};



axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!error.response) {
      return Promise.reject(error);
    }

    // Check if error is 401/403, hasn't been retried yet, and isn't the refresh-token route itself
    if (
      error.response.status === 401  &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/refresh-token")
    ) {
      // OLD CODE:
      // originalRequest._retry = true; 
      // ❌ Setting this here means if the request is queued, the retried request won't be able to trigger the interceptor if it fails again.

      if (isRefreshing) {
        // If a refresh is already happening, queue this request
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // FIX: Set _retry true right before we actually retry it
            originalRequest._retry = true; 
            return axiosInstance(originalRequest);
          })
          // FIX: Added catch to prevent unhandled promise rejection if forceLogout is triggered
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // FIX: Set _retry true only when we are actually about to refresh the token
      originalRequest._retry = true;
      isRefreshing = true;

      try {
       await axios.post(`${import.meta.env.VITE_SERVER_URL}/refresh-token`, {}, {
          withCredentials: true
        });
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // forceLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;