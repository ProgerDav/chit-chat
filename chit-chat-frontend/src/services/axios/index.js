import axios from "axios";

const baseURL = process.env.API_URL || "http://localhost:8080/api/v1";

export default axios.create({ baseURL });
