import axios, {AxiosResponse} from 'axios'

import {ID, Response} from "../../../../../_metronic/helpers";
import {Permission, PermissionQueryResponse} from "../../../../models/user/Permission";
// import process from "process";

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'https://v3.staging.missioncontrol.gg/api-fe'
const GET_PERMISSIONS_URL = `${API_URL}/permissions`
// const PERMISSION_URL = `${API_URL}/permission`

const getPermissions = (query: string): Promise<PermissionQueryResponse> => {
    return axios
        .get(`${GET_PERMISSIONS_URL}?${query}`)
        .then((d: AxiosResponse<PermissionQueryResponse>) => d.data)
}

const getPermissionById = (id: any): Promise<Permission | undefined> => {
    return axios
        .get(`${GET_PERMISSIONS_URL}/${id}`)
        .then((response: AxiosResponse<Response<Permission>>) => response.data)
        .then((response: Response<Permission>) => response.data)
}

const createPermission = (permission: Permission) : Promise<Permission | undefined> => {
    return axios
        .post(`${GET_PERMISSIONS_URL}`, permission)
        .then((response: AxiosResponse<Response<Permission>>) => response.data)
        .then((response: Response<Permission>) => response.data)
}

export {getPermissions, getPermissionById, createPermission, GET_PERMISSIONS_URL}
