import axios, {AxiosResponse} from 'axios'
import {SubscriptionQueryResponse} from '../../../../models/billing/Subscription'

const API_URL = process.env.REACT_APP_API_URL
const GET_SUBSCRIPTIONS_URL = `${API_URL}/subscriptions`

const getSubscriptions = (query: String): Promise<SubscriptionQueryResponse> => {
  return axios
    .get(`${GET_SUBSCRIPTIONS_URL}?${query}`)
    .then((response: AxiosResponse<SubscriptionQueryResponse>) => response.data)
}

export {getSubscriptions}
