import axios from "axios";
import blogService from "./blogs";
const baseUrl = "/api/login";

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials);
    blogService.setToken(response.data.token);
    return response.data;
};

export default { login };