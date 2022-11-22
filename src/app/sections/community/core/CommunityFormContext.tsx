import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { CommunityFormType } from "../models/Community";
import { Plan } from "../../../models/billing/Plan";
import { State } from "../../../models/misc/State";

type CommunityFormContextProps = {
  communityForm: CommunityFormType | undefined,
  setCommunityForm: Dispatch<SetStateAction<CommunityFormType>>
  plans?: Plan[] | undefined
  states?: State[] | undefined
  paymentTerm?: number
  setPaymentTerm?: Dispatch<SetStateAction<number>>
}

const initCommunityFormContextPropsState = {
  communityForm: undefined,
  setCommunityForm: () => {
  },
  plans: undefined,
  states: undefined,
  paymentTerm: 1,
  setPaymentTerm: () => {
  }
};

export const CommunityFormContext = createContext<CommunityFormContextProps>(initCommunityFormContextPropsState);

export const useCommunityForm = () => {
  return useContext(CommunityFormContext);
};