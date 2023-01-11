import { ID, Response } from "../../../../_metronic/helpers";
import { State } from "../../../models/misc/State";

export type CommunityAddress = {
  id?: ID
  community_id?: ID
  address_one: string
  address_two: string
  city: string
  state: State
  postal_code: string
  // country: Country
}

export const initialCommunityAddress = (address?: CommunityAddress) => {
  return {
    address_one: address?.address_one || "",
    address_two: address?.address_two || "",
    city: address?.city || "",
    state: address?.state?.id + "",
    postal_code: address?.postal_code || ""
    // country: initialCountry(address?.country),
  };
};

export type CommunityAddressQueryResponse = Response<Array<CommunityAddress>>
