/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {ID, stringifyRequestQuery} from '../../../../_metronic/helpers'
import {MenuComponent} from '../../../../_metronic/assets/ts/components'
import {Link} from 'react-router-dom'
import {useQueryClient} from 'react-query'
import {deleteObject} from '../../../requests'
import {useQueryRequest} from '../QueryRequestProvider'
import clsx from 'clsx'
import Swal from 'sweetalert2'
import {extractErrors} from '../../../requests/helpers'
import axios from 'axios'

type Props = {
  id: ID
  path: string
  queryKey: string
  showEdit?: boolean
  showDelete?: boolean
  showView?: boolean
  editPage?: boolean
  callBackFn?: any
  title?: string
  text?: string
}

const ActionsCell: FC<React.PropsWithChildren<Props>> = ({
  id,
  path,
  queryKey,
  showEdit,
  showDelete = true,
  showView,
  callBackFn,
  title,
  text,
  editPage,
}) => {
  const queryClient = useQueryClient()
  const {state} = useQueryRequest()
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))

  useEffect(() => {
    setQuery(stringifyRequestQuery(state))
  }, [state])

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const deleteItem = async () => {
    const {isConfirmed} = await Swal.fire({
      title: title && 'Delete',
      text: text && 'Are you sure you want to delete this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm Delete',
      confirmButtonColor: '#DB4437',
      cancelButtonText: 'Dismiss',
      reverseButtons: true,
    })

    if (isConfirmed) {
      deleteObject(path + '/' + id)
        .then(() => {
          queryClient.invalidateQueries(`${queryKey}-${query}`)
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            const errorMessages = extractErrors(error).map(
              (errorMessage) => `<li>${errorMessage}</li>`
            )

            // we need to show the error
            Swal.fire('Something Wrong Happened', '<p>' + errorMessages.join() + '</p>', 'error')
          } else if (error === undefined) {
            // we need to show a generic error
            Swal.fire(
              'Something Wrong Happened',
              '<p>Could not complete your request. Please try again later.</p>',
              'error'
            )
          }
        })
        .finally(() => {
          if (callBackFn) {
            callBackFn()
          }
        })
    }
  }

  return (
    <>
      {showView && (
        <Link to={'/' + path + '/' + id} className='btn btn-icon btn-active-light-info'>
          <i className={clsx('fa-duotone fs-3 text-info', 'fa-circle-info')}></i>
        </Link>
      )}

      {showEdit && (
        <Link
          to={'/' + path + '/' + id + (editPage ? '/edit' : '/settings')}
          className='btn btn-icon btn-sm btn-active-light-warning'
        >
          <i className={clsx('fa-duotone fs-3 text-warning', 'fa-pencil')}></i>
        </Link>
      )}

      {showDelete && (
        <a
          className='btn btn-icon btn-sm btn-active-light-danger'
          onClick={async () => deleteItem()}
        >
          <i className={clsx('fa-duotone fs-3 text-danger', 'fa-trash')}></i>
        </a>
      )}
    </>
  )
}

export {ActionsCell}
