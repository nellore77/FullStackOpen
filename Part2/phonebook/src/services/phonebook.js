import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);

  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data); // This will return the new person with a generated ID
};

const deletePerson = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);

  const response = await request;
  console.log("del", response.data);
  return response.data;
};

const updatePerson = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);

  return request.then((response) => {
    return response.data;
  });
};

export default {
  getAll,
  create,
  deletePerson,
  updatePerson,
};
