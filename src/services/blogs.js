import axios from "axios";
const baseUrl = "/api/blogs";
let token = "";

const setToken = newToken => {
    token = `Bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = async blog => {
    const response = await axios.post(baseUrl, blog, { headers: { Authorization: token } });
    return response.data;
};

const update = async (id, blog) => {
    const response = await axios.put(`${baseUrl}/${id}`, blog, { headers: { Authorization: token } });
    return response.data;
};

const remove = async id => {
    await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } });
};

const comment = async (id, comment) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
    return response.data;
};

export default { getAll, create, update, remove, comment, setToken };