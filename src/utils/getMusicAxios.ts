import axios from "axios";

function getMusicAxios() {
  const instance = axios.create({
    timeout: 10000,
    baseURL: "https://www.coisini.love/music",
  });

  return instance
}

export default getMusicAxios;