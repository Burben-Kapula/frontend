import axios from 'axios';

const baseUrl = 'https://for-public2.onrender.com';

export const getAll = () =>
  axios.get(baseUrl).then(res => res.data);

export const create = newPerson =>
  axios.post(baseUrl, newPerson).then(res => res.data);

export const remove = id =>
  axios.delete(`${baseUrl}/${id}`);

export const update = (id, changedPerson) =>
  axios.put(`${baseUrl}/${id}`, changedPerson).then(res => res.data);

export default { getAll, create, remove, update };
