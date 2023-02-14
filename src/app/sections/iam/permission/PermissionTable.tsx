import {useMemo} from 'react'
import {permissionColumns} from './core/PermissionColumns'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {McTable} from '../../../components/McTable'

const PermissionTable = () => {
  const permissions = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => permissions, [permissions])
  const columns = useMemo(() => permissionColumns, [])

  return (
    <McTable
      data={data}
      columns={columns}
      model={permissions.length > 0 ? permissions[0] : null}
      isLoading={isLoading}
    />
  )
}

export {PermissionTable}
