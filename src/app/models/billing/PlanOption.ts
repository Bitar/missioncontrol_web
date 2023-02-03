import {Response} from '../../helpers/crud-helper/models'

export type PlanOption = {
  id?: number
  category_id?: number
  name?: string
  label?: string
  value: string
  is_boolean?: boolean
  is_hidden?: boolean
}

export type BillingPlanOptionQueryResponse = Response<Array<PlanOption>>
