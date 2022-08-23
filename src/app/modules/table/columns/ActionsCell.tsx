/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {ID, stringifyRequestQuery} from '../../../../_metronic/helpers'
import {MenuComponent} from '../../../../_metronic/assets/ts/components'
import {Link} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import {deleteObject} from '../../../requests'
import {useQueryRequest} from '../QueryRequestProvider'
import clsx from 'clsx'

type Props = {
  id: ID
  path: string
  queryKey: string
  showEdit?: boolean
  showDelete?: boolean
  showView?: boolean
}

const ActionsCell: FC<React.PropsWithChildren<Props>> = ({
  id,
  path,
  queryKey,
  showEdit,
  showDelete = true,
  showView,
}) => {
  const queryClient = useQueryClient()
  const {state} = useQueryRequest()
  const [query] = useState<string>(stringifyRequestQuery(state))

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const deleteItem = useMutation(() => deleteObject(path + '/' + id), {
    onSuccess: () => {
      queryClient.invalidateQueries(`${queryKey}-${query}`)
    },
  })

  return (
    <>
      {showView && (
        <Link to={'/' + path + '/' + id} className='btn btn-icon btn-sm btn-active-light-success'>
          <i className={clsx('fa fs-2 text-success', 'fa-eye')}></i>
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
