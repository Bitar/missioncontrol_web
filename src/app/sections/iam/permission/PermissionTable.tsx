import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {KTCardBody} from '../../../helpers/components'
import {CustomHeaderColumn} from '../../../modules/table/columns/CustomHeaderColumn'
import {CustomRow} from '../../../modules/table/columns/CustomRow'
import {permissionColumns} from './core/PermissionColumns'
import {Permission} from '../../../models/iam/Permission'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {TableListLoading} from '../../../modules/table/TableListLoading'
import {TableListPagination} from '../../../modules/table/TableListPagination'

const PermissionTable = () => {
  const permissions = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => permissions, [permissions])
  const columns = useMemo(() => permissionColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<Permission>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Permission>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <TableListPagination />
      {isLoading && <TableListLoading />}
    </KTCardBody>
  )
}

export {PermissionTable}