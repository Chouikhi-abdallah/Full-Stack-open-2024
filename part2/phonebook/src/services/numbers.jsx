import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data).catch(e=>console.log(e))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data).catch(e=>console.log(e))
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data).catch(e=>console.log(e))
}
const remove = (id) => {
    return axios
      .delete(baseUrl.concat("/", id))
      .then((response) => {
        return response.data;
      });
  };
export default { getAll, create, update,remove}