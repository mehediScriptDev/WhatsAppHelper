import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://louisalexbackend.mtscorporate.com";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // Enable sending cookies with requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Try to get token from cookies first, then localStorage as fallback
    const token =
      Cookies.get("accessToken") || localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log(
        " Token attached to request:",
        token.substring(0, 20) + "..."
      );
    } else {
      console.warn("No token found in cookies or localStorage");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error(
      " API Error:",
      error.response?.status,
      error.response?.data
    );

    if (error.response && error.response.status === 401) {
      console.error(
        "Unauthorized! Clearing auth data and redirecting to login..."
      );

      // Clear all auth data
      localStorage.removeItem("rba_current_user");
      localStorage.removeItem("authToken");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      // Redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error.response ? error.response.data : error.message);
  }
);

export default axiosInstance;
