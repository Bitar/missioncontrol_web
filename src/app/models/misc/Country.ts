import {ID, Response} from "../../../_metronic/helpers";

export type Country = {
    id?: ID,
    name: string,
    code: string
}

export type CountryQueryResponse = Response<Array<Country>>