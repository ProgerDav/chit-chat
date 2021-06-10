import Axios from "axios";

const baseURL = process.env.API_URL || "http://localhost:8080/api/v1";

export default Axios.create({ baseURL });
