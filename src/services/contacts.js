import axios from "axios";

const url = '/api/persons'

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

const objectFunction = { getAll, create, update, deleteContact }

export default objectFunction
