import axios from "axios";
import blogConfig from "../blog.config";

function getAxios() {
  const instance = axios.create({
    timeout: 3000000,
    baseURL: blogConfig.requests ? blogConfig.requests.host : "https://www.coisini.love"
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
}

export default getAxios;
