import { ID, Response } from "../../../../_metronic/helpers";

export type ActivityFee = {
  id?: ID
  activity_id?: ID
  type: string
  amount: string
}

export const initialActivityFee = (activityFee?: ActivityFee) => {
  return {
    type: "",
    amount: ""
  };
};

export type ActivityFeeQueryResponse = Response<Array<ActivityFee>>
