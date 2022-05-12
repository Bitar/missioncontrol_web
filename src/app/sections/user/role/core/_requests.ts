import axios, {AxiosResponse} from 'axios'

import {ID, Response} from "../../../../../_metronic/helpers";
import {Role, RolesQueryResponse} from "../../../../models/user/Role";
// import process from "process";

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'https://v3.staging.missioncontrol.gg/api-fe'
const ROLE_URL = `${API_URL}/role`
const GET_ROLES_URL = `${API_URL}/roles`

const getRoles = (query: string): Promise<RolesQueryResponse> => {
    return axios
        .get(`${GET_ROLES_URL}?${query}`)
        .then((d: AxiosResponse<RolesQueryResponse>) => d.data)
}

const getRoleById = (id: ID): Promise<Role | undefined> => {
    return axios
        .get(`${ROLE_URL}/${id}`)
        .then((response: AxiosResponse<Response<Role>>) => response.data)
        .then((response: Response<Role>) => response.data)
}

const createRole = (role: Role): Promise<Role | undefined> => {
    return axios
        .post(`${GET_ROLES_URL}`, role)
        .then((response: AxiosResponse<Response<Role>>) => response.data)
        .then((response: Response<Role>) => response.data)
}

// const createUser = (user: User): Promise<User | undefined> => {
//     return axios
//         .put(ROLE_URL, user)
//         .then((response: AxiosResponse<Response<User>>) => response.data)
//         .then((response: Response<User>) => response.data)
// }
//
// const updateUser = (user: User): Promise<User | undefined> => {
//     return axios
//         .post(`${ROLE_URL}/${user.id}`, user)
//         .then((response: AxiosResponse<Response<User>>) => response.data)
//         .then((response: Response<User>) => response.data)
// }
//
// const deleteUser = (userId: ID): Promise<void> => {
//     return axios.delete(`${ROLE_URL}/${userId}`).then(() => {})
// }
//
// const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
//     const requests = userIds.map((id) => axios.delete(`${ROLE_URL}/${id}`))
//     return axios.all(requests).then(() => {})
// }

export {getRoles, getRoleById, createRole, GET_ROLES_URL}
