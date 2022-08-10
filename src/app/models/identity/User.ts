import {ID, Response} from "../../../_metronic/helpers";
import * as Yup from "yup";

export const userSchema = (password: false) => Yup.object().shape({
    first_name: Yup.string()
        .required("First name is required"),
    last_name: Yup.string()
        .required("Last name is required"),
    email: Yup.string()
        .email()
        .required("Email is required"),
    // password: Yup.string()
    //     .min(8, "Minimum 8 symbols")
    //     .max(50, "Maximum 50 symbols")
    //     .required("Password is required"),
    // password_confirmation: Yup.string()
    //     .required("Password confirmation is required")
    //     .when("password", {
    //         // is: (val: string) => (val && val.length > 0 ? true : false),
    //         is: (val: string) => (!!(val && val.length > 0)),
    //         then: Yup.string().oneOf([Yup.ref("password")], "Password and Confirm Password didn't match")
    //     }),
    // roles: Yup.array()
    //     .required("Role is required")
});

export type User = {
    id?: ID
    first_name: string
    last_name: string
    name?: string
    email: string
    password?: string
    password_confirmation?: string
    // roles: Role[]
    meta?: UserMeta
}

export interface UserMeta {
    id?: ID,
    user_id?: ID,
    image: string
}

export const userInitial = (user?: User) => {
    return {
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        password: "",
        password_confirmation: ""
    }
}

export const userMetaInitial = (userMeta?: UserMeta) => {
    return {
        image: userMeta?.image || ""
    }
}

export type UserResponseQuery = Response<Array<User>>