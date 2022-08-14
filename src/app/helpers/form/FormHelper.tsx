import axios from 'axios'
import toast from 'react-hot-toast'
import Moment from 'moment'
import moment from 'moment'

const updateData = (fieldsToUpdate: Partial<any>, setFunction: any, model: any) => {
  const updatedData = {...model, ...fieldsToUpdate}
  setFunction(updatedData)
}

const submitForm = async (fun: any, model: any, to: any, id?: any) => {
  try {
    if (id) {
      await fun(id, model)
    } else {
      await fun(model)
    }

    toast.success('Successful')

    to()
  } catch (exception) {
    // TODO: Return Error and handle Error Ness.
    if (axios.isAxiosError(exception)) {
      if (exception.response?.status === 422) {
        // let validation_errors = exception.response?.data.error.validation
        // console.log(exception.response?.data.error.validation)

        toast.error('Validation Error')
      }
    } else {
      console.log(exception)
    }
  }
}

function buildFormData(formData: FormData, data: any, parentKey?: any) {
  if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Moment)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
    })
  } else {
    if (data !== null && data !== '' && parentKey !== 'id' && parentKey !== 'created_at') {
      if (data instanceof Moment) {
        formData.append(parentKey, moment(data).format('X'))
      } else {
        formData.append(parentKey, data)
      }
    } else {
      // console.log('cant append', parentKey, data)
    }
  }
}

function jsonToFormData(data: any) {
  const formData = new FormData()

  buildFormData(formData, data)

  return formData
}

export {updateData, submitForm, jsonToFormData}
