import { Role } from "../../role/models/Role";
import { initialUserMeta, UserMeta } from "./UserMeta";
import { Community } from "../../../community/models/Community";
import { User } from "./User";

export type UserForm = {
  first_name: string
  last_name: string
  email: string
  password?: string
  password_confirmation?: string
  roles: Role[]
  meta?: UserMeta
  community_admin?: Community[]
}

export const initUserForm = (user?: User) => {
  return {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    password: '',
    password_confirmation: '',
    email: user?.email || "",
    roles: user?.roles || [],
    meta: user?.meta || initialUserMeta(user?.meta),
    community_admin: user?.community_admin || []
  }
}