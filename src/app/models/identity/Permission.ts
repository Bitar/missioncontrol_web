import {ID, Response} from "../../../_metronic/helpers";
import * as Yup from "yup";

export const permissionSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
})

export type Permission = {
    id?: ID,
    name: string
}

export const permissionInitial = (permission?: Permission) => {
    return {
        name: permission?.name || ""
    }
}

export type PermissionQueryResponse = Response<Array<Permission>>