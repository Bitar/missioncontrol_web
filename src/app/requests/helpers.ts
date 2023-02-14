import {GenericErrorMessage} from '../helpers/form'

export const extractErrors = (error: any) => {
  if (error.response && error.response.data && error.response.data.errors) {
    const errors = error.response.data.errors

    let errorMessages: string[] = []

    for (const field in errors) {
      errorMessages.push(errors[field])
    }

    return errorMessages
  } else {
    return [GenericErrorMessage]
  }
}

export const createFormData = (form: any) => {
  let formData = new FormData()

  for (const key in form) {
    if (form[key] instanceof Array) {
      for (const item in form[key]) {
        formData.append(`${key}[]`, form[key][item].id)
      }
    } else {
      formData.append(key, form[key])
    }
  }

  return formData
}
