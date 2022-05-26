import {ID, Response} from "../../../_metronic/helpers";

export type User = {
    id?: ID
    first_name: string
    last_name: string
    name: string
    email: string
    meta: UserMetaModel
    // website?: 'https://keenthemes.com'
    // emailSettings?: UserEmailSettingsModel
    // auth?: AuthModel
    // communication?: UserCommunicationModel
    // address?: UserAddressModel
    // socialNetworks?: UserSocialNetworksModel
}

export interface UserMetaModel {
    id: number,
    user_id: number,
    image: string
}

export type UserResponseQuery = Response<Array<User>>