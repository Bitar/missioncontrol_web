import axios, {AxiosError, AxiosResponse} from 'axios'
import {Response} from "../../../../../_metronic/helpers";
import {Role, RolesQueryResponse} from "../../../../models/identity/Role";
import {Permission} from "../../../../models/identity/Permission";

const API_URL = process.env.REACT_APP_API_URL
const GET_ROLES_URL = `${API_URL}/roles`

const getRoles = (query: string): Promise<RolesQueryResponse> => {
    return axios
        .get(`${GET_ROLES_URL}?${query}`)
        .then((d: AxiosResponse<RolesQueryResponse>) => d.data)
}

const getRoleById = (id: any): Promise<Role | undefined> => {
    return axios
        .get(`${GET_ROLES_URL}/${id}`)
        .then((response: AxiosResponse<Response<Role>>) => response.data)
        .then((response: Response<Role>) => response.data)
}

const createRole = (role: Role): Promise<Role | undefined> => {
    return axios
        .post(`${GET_ROLES_URL}`, role)
        .then((response: AxiosResponse<Response<Role>>) => response.data)
        .then((response: Response<Role>) => response.data)
}

const updateRole = (id: any, role: Role): Promise<Role | undefined> => {
    return axios
        .put(`${GET_ROLES_URL}/${id}`, role)
        .then((response: AxiosResponse<Response<Permission>>) => response.data)
        .then((response: Response<Permission>) => response.data)
}

export {getRoles, getRoleById, createRole, updateRole}
