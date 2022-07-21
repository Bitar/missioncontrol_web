import {ID, Response} from "../../../_metronic/helpers";


export type ActivityPrize = {
    id?: ID,
    prize_type: string,
    item_type:string,
    item_name:string,
    item_value:string,
    item_value_type:string
}

export const initialActivityPrize = {
    prize_type:'',
    item_type:'',
    item_name:'',
    item_value:'',
    item_value_type:'',

}

export type ActivityLocationQueryResponse = Response<Array<ActivityPrize>>

