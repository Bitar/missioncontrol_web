import {ID, Response} from "../../../_metronic/helpers";

export type Role = {
    id?: ID
    name: string
}

export type RolesQueryResponse = Response<Array<Role>>