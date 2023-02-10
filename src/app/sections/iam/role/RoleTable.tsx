import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {KTCardBody} from '../../../helpers/components'
import {rolesColumns} from './core/RoleColumns'
import {Role} from '../../../models/iam/Role'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {CustomHeaderColumn} from '../../../modules/table/columns/CustomHeaderColumn'
import {CustomRow} from '../../../modules/table/columns/CustomRow'
import {TableListLoading} from '../../../modules/table/TableListLoading'
import {TableListPagination} from '../../../modules/table/TableListPagination'
import { McTable } from "../../../components/McTable";

const RoleTable = () => {
  const roles = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => roles, [roles])
  const columns = useMemo(() => rolesColumns, [])

  return (
    <McTable
      data={data}
      columns={columns}
      model={roles.length > 0 ? roles[0] : null}
      isLoading={isLoading}
    />
  )
}

export {RoleTable}
