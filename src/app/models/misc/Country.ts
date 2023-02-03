import {ID, Response} from '../../../_metronic/helpers'

export type Country = {
  id?: number
  name: string
  code: string
}

export const initialCountry = (country?: Country) => {
  return {
    name: country?.name ?? '',
    code: country?.code ?? '',
  }
}

export type CountryQueryResponse = Response<Array<Country>>
