import axios, {AxiosResponse} from 'axios'
import {ActivityQueryResponse} from "../../../models/activity/Activity";
// import process from "process";

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'https://v3.staging.missioncontrol.gg/api-fe'
const ACTIVITIES_URL = `${API_URL}/activities`

const getActivities = (query: string): Promise<ActivityQueryResponse> => {
    query = query + "&include=entryFee,matchPlayDate"
    return axios
        .get(`${ACTIVITIES_URL}?${query}`)
        .then((d: AxiosResponse<ActivityQueryResponse>) => d.data)
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

export {getActivities, ACTIVITIES_URL}
