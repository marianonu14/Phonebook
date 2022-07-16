import axios from "axios";

const url = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(url)
}

const create = newPerson => {
    return axios.post(url, newPerson)
}

const update = (id, setPerson) => {
    return axios.put(`${url}/${id}`, setPerson)
}

const deleteContact = (id) => {
    return axios.delete(`${url}/${id}`)
}

export default { getAll, create, update, deleteContact }
