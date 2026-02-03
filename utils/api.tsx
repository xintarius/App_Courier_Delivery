import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

interface JwtPayload {
  exp: number;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

const BASE_URL = Constants.expoConfig?.extra?.backendUrl || "";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST interceptor
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("jwt");

  if (token) {
    if (isTokenExpired(token)) {
      console.log("Token wygasł (mobile)");
      await AsyncStorage.removeItem("jwt");
      return Promise.reject(new Error("Token expired"));
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE interceptor
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      console.log("401 Unauthorized (mobile)");
      await AsyncStorage.removeItem("jwt");
    }
    return Promise.reject(err);
  }
);

export default api;
