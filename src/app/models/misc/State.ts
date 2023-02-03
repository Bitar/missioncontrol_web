import {ID, Response} from '../../../_metronic/helpers'

export type State = {
  id?: number
  name: string
  code: string
}

export const initialState = (state?: State) => {
  return {
    name: state?.name ?? '',
    code: state?.code ?? '',
  }
}

export type StateQueryResponse = Response<Array<State>>
