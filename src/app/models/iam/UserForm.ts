import { initialUserMeta, UserMeta } from "./UserMeta";
import { User } from "./User";

export type UserForm = {
  first_name: string
  last_name: string
  email: string
  password?: string
  password_confirmation?: string
  role_ids: number[]
  meta?: UserMeta
  community_admin?: number[]
}

export const initUserForm = (user?: User) => {

  let roleIds = user?.roles?.map((role: any) => role.id);
  let communityAdminIds = user?.community_admin?.map((community: any) => community.id);

  return {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    password: "",
    password_confirmation: "",
    email: user?.email || "",
    role_ids: roleIds || [],
    meta: user?.meta || initialUserMeta(user?.meta),
    community_admin: communityAdminIds || []
  };
};
