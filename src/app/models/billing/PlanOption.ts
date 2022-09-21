import { ID, Response } from "../../helpers/crud-helper/models";

export type PlanOption = {
  id?: ID,
  category_id?: ID
  name?: string,
  label?: string,
  value: string,
  is_boolean?: boolean,
  is_hidden?: boolean,
}

export type BillingPlanOptionQueryResponse = Response<Array<PlanOption>>