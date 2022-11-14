/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {ID, stringifyRequestQuery} from '../../../../_metronic/helpers'
import {MenuComponent} from '../../../../_metronic/assets/ts/components'
import {Link} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import {deleteObject} from '../../../requests'
import {useQueryRequest} from '../QueryRequestProvider'
import clsx from 'clsx'
import {useQueryResponse} from '../QueryResponseProvider'

type Props = {
  id: ID
  path: string
  queryKey: string
  showEdit?: boolean
  showDelete?: boolean
  showView?: boolean
  callBackFn?: any
}

const ActionsCell: FC<React.PropsWithChildren<Props>> = ({
  id,
  path,
  queryKey,
  showEdit,
  showDelete = true,
  showView,
  callBackFn,
}) => {
  const queryClient = useQueryClient()
  const {state} = useQueryRequest()
  const [query] = useState<string>(stringifyRequestQuery(state))
  const {setEnabled} = useQueryResponse()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const deleteItem = useMutation(
    () =>
      deleteObject(path + '/' + id).finally(() => {
        setEnabled(true)
        if (callBackFn) {
          callBackFn()
        }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`${queryKey}-${query}`)
      },
    }
  )

  return (
    <>
      {showView && (
        <Link to={'/' + path + '/' + id} className='btn btn-icon btn-sm btn-active-light-info'>
          <i className={clsx('fa fs-2 text-info', 'fa-eye')}></i>
        </Link>
      )}

      {showEdit && (
        <Link
          to={'/' + path + '/' + id + '/edit'}
          className='btn btn-icon btn-sm btn-active-light-warning'
        >
          <i className={clsx('fa fs-2 text-warning', 'fa-pencil')}></i>
        </Link>
      )}

      {showDelete && (
        <a
          className='btn btn-icon btn-sm btn-active-light-danger'
          onClick={async () => await deleteItem.mutateAsync()}
        >
          <i className={clsx('fa fs-2 text-danger', 'fa-trash')}></i>
        </a>
      )}
    </>
  )
}

export {ActionsCell}
