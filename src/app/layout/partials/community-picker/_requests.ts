import axios, {AxiosResponse} from 'axios'

import {CommunityQueryResponse} from "../../../models/community/Community";

const API_URL = process.env.REACT_APP_API_URL
const GET_ADMIN_COMMUNITIES_URL = `${API_URL}/admin/communities`

const getAdminCommunities = (): Promise<CommunityQueryResponse> => {
    return axios
        .get(`${GET_ADMIN_COMMUNITIES_URL}`)
        .then((d: AxiosResponse<CommunityQueryResponse>) => d.data)
}

export {getAdminCommunities}