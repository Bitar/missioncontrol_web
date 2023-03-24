import React from 'react'
import clsx from 'clsx'
import {Button} from 'react-bootstrap'

import axios from 'axios'
import {exportObjects, extractErrors} from '../../helpers/requests'
import {GenericErrorMessage} from '../../helpers/form'
import {AlertMessageGenerator} from '../../helpers/AlertMessageGenerator'
import {Actions, ToastType} from '../../helpers/variables'
import {useMcApp} from '../../modules/general/McApp'

type Props = {
  exportQuery: string
  exportEndpoint: string
  // exportApiCall: (query?: string) => Promise<ExportUrl | AxiosError | undefined>
  className?: string
}

const ExportButton: React.FC<Props> = ({exportQuery, exportEndpoint, className}) => {
  const mcApp = useMcApp()

  const exportHandler = () => {
    // we already have the query for our export request ready based on filters
    // we just need to do the api call
    exportObjects(exportEndpoint, exportQuery).then((response) => {
      if (axios.isAxiosError(response)) {
        // we need to show the errors
        mcApp.setAlert({message: extractErrors(response).join(' '), type: ToastType.ERROR})
      } else if (response === undefined) {
        // show generic error message
        mcApp.setAlert({message: GenericErrorMessage, type: ToastType.ERROR})
      } else {
        // we need to check the status of the response
        if (response.data.link !== undefined) {
          mcApp.setAlert({
            message: new AlertMessageGenerator('', Actions.EXPORT, ToastType.SUCCESS).message,
            type: ToastType.SUCCESS,
          })

          const link = document.createElement('a')
          link.href = response.data.link
          link.setAttribute('download', '')

          link.click()
        } else if (response.data.status === 'pending') {
          mcApp.setAlert({
            message: new AlertMessageGenerator('', Actions.EXPORT, ToastType.PENDING).message,
            type: ToastType.PENDING,
          })
        }
      }
    })
  }

  return (
    <Button
      className={clsx('btn btn-light-info fs-6', className)}
      title='Export'
      onClick={exportHandler}>
      <i className={clsx('fa fs-4', 'fa-arrow-down-to-line', 'pe-0')}></i>
    </Button>
  )
}

export default ExportButton
