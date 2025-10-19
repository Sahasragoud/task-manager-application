// services/PublicAPI.ts
import axios from "axios";

const publicAPI = axios.create({
  baseURL: "http://192.168.117.4:8080/api/",
});

export default publicAPI;
