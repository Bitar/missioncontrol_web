import {ID, Response} from "../../../_metronic/helpers";
import * as Yup from "yup";
import {Role} from "./Role";

let schema = {
    first_name: Yup.string()
        .required("First name is required"),
    last_name: Yup.string()
        .required("Last name is required"),
    email: Yup.string()
        .email()
        .required("Email is required"),
}

export const userSchema = (password: boolean) => {
    if (password) {
        schema = {
            ...schema, ...{
                password: Yup.string()
                    .min(8, "Minimum 8 symbols")
                    .max(50, "Maximum 50 symbols")
                    .required("Password is required"),
                password_confirmation: Yup.string()
                    .required("Password confirmation is required")
                    .when("password", {
                        // is: (val: string) => (val && val.length > 0 ? true : false),
                        is: (val: string) => (!!(val && val.length > 0)),
                        then: Yup.string().oneOf([Yup.ref("password")], "Password and Confirm Password didn't match")
                    }),
            }
        }
    }

    return Yup.object().shape(schema)
};

export type User = {
    id?: ID
    first_name: string
    last_name: string
    name?: string
    email: string
    password?: string
    password_confirmation?: string
    created_at: number
    roles: Role[]
    meta?: UserMeta
}

export interface UserMeta {
    id?: ID,
    user_id?: ID,
    image: string,
    username?: string,
    rng?: string,
    city?: string
}

export const initialUserMeta = (userMeta?: UserMeta) => {
    return {
        image: userMeta?.image || "",
        username: userMeta?.username || "",
        city: userMeta?.city || ""
    }
}

export const initialUser = (user?: User) => {
    return {
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        password: "",
        password_confirmation: "",
        created_at: user?.created_at || 0,
        roles: [],
        meta: user?.meta || initialUserMeta()
    }
}

export type UserQueryResponse = Response<Array<User>>