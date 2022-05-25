import axios, {AxiosResponse} from "axios";
import {Plan, PlanQueryResponse} from "../../../../models/billing/Plan";
import {ID, Response} from "../../../../../_metronic/helpers";

const API_URL = process.env.REACT_APP_API_URL
const GET_PLANS_URL = `${API_URL}/plans`

const getPlans = (): Promise<PlanQueryResponse> => {
    return axios
        .get(`${GET_PLANS_URL}`)
        .then((d: AxiosResponse<PlanQueryResponse>) => d.data)
}

const getPlanById = (id: any): Promise<Plan | undefined> => {
    return axios
        .get(`${GET_PLANS_URL}/${id}`)
        .then((response: AxiosResponse<Response<Plan>>) => response.data)
        .then((response: Response<Plan>) => response.data)
}

const createPlan = (plan: Plan): Promise<Plan | undefined> => {
    return axios
        .post(`${GET_PLANS_URL}`, plan)
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