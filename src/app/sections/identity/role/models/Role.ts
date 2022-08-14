import {ID, Response} from "../../../../../_metronic/helpers";
import * as Yup from "yup";

export const roleSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
})

export type Role = {
    id?: ID
    name?: string
}

export const roleInitial = (role?: Role) => {
    return {
        name: role?.name || ""
    }
}

export type RolesQueryResponse = Response<Array<Role>>
