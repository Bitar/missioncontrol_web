import axios, { AxiosResponse } from "axios";
import { Response } from "../../../../_metronic/helpers";
import { Plan } from "../../../models/billing/Plan";
import { SubscriptionRequest } from "../../../models/billing/SubscriptionRequest";

const API_URL = process.env.REACT_APP_API_URL;
const GET_SUBSCRIPTION_BILLING_URL = `${API_URL}/plans`;
const GET_SUBSCRIPTION_URL = `${API_URL}/subscriptions`;

export const createSubscription = (formData: FormData): Promise<any> => {

  return axios
    .post(`${GET_SUBSCRIPTION_URL}`, formData)
    .then((response: AxiosResponse<Response<any>>) => response.data)
    .then((response: Response<any>) => response.data);
};

export const subscriptionRequest = (
  plan: Plan,
  paymentTerms: number = 1
): Promise<SubscriptionRequest | undefined> => {
  return axios
    .post(`${GET_SUBSCRIPTION_BILLING_URL}/${plan.id}/subscribe`, { payment_term: paymentTerms })
    .then((response: AxiosResponse<Response<SubscriptionRequest>>) => response.data)
    .then((response: Response<SubscriptionRequest>) => response.data);
};