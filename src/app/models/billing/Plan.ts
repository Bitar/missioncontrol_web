import {ID, Response} from '../../../_metronic/helpers'
import * as Yup from 'yup'
import { PlanOption } from "./PlanOption";

export const planSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  launch: Yup.number().required('Launch is required'),
})

export const initialPlan: Plan = {
  name: '',
  description: '',
  contact_type: 1,
  price_per_member: 0,
  transaction_fee: 0,
  max_members: 0,
  can_quarter: false,
  launch_percentage: 0,
  options: []
}

export type Plan = {
  id?: ID
  name: string
  description?: string
  contact_type: number
  price_per_member: number,
  cm_service_percentage?: number,
  transaction_fee: number,
  max_members: number,
  can_quarter: boolean,
  launch_percentage: number,
  options: PlanOption[]
  // categories: $this->getCategories($this->options),
  // options: BillingPlanOptionResource::collection($this->options),
}

export type PlanQueryResponse = Response<Array<Plan>>

export const getOption = (plan: Plan, optionId: ID) => {
  return plan?.options?.find(function (element: any) {
    return element.id === optionId
  })
}
