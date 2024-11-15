import axios, {AxiosResponse} from 'axios'
import {Plan, PlanQueryResponse} from '../../../../models/billing/Plan'
import {Response} from '../../../../../_metronic/helpers'

const API_URL = process.env.REACT_APP_API_URL
const GET_PLANS_URL = `${API_URL}/plans`

const getPlans = (query?: String): Promise<PlanQueryResponse> => {
  let url = `${GET_PLANS_URL}`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((d: AxiosResponse<PlanQueryResponse>) => d.data)
}

const getPlanById = (id: any): Promise<Plan | undefined> => {
  return axios
    .get(`${GET_PLANS_URL}/${id}`)
    .then((response: AxiosResponse<Response<Plan>>) => response.data)
    .then((response: Response<Plan>) => response.data)
}

const createPlan = (formData: FormData): Promise<Plan | undefined> => {
  return axios
    .post(`${GET_PLANS_URL}`, formData)
    .then((response: AxiosResponse<Response<Plan>>) => response.data)
    .then((response: Response<Plan>) => response.data)
}

const updatePlan = (plan: Plan): Promise<Plan | undefined> => {
  return axios
    .put(`${GET_PLANS_URL}/${plan.id}`, plan)
    .then((response: AxiosResponse<Response<Plan>>) => response.data)
    .then((response: Response<Plan>) => response.data)
}

export {getPlans, getPlanById, createPlan, updatePlan}
