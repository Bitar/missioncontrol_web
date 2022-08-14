import {ID, Response} from '../../../_metronic/helpers'
import * as Yup from 'yup'

export const planSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  launch: Yup.number().required('Launch is required'),
})

export const initialPlan: Plan = {
  name: '',
  description: '',
  type: 1,
  status: 0,
  price: 0,
  launch: 0,
}

export type Plan = {
  id?: ID
  name: string
  description: string
  type: number
  status: number
  price: number
  launch: number
}

export type PlanQueryResponse = Response<Array<Plan>>
