import {useMemo} from 'react'
import {ColumnInstance, Row, useSortBy, useTable} from 'react-table'
import {KTCardBody} from '../../../helpers/components'
import {ActivityColumns} from '../core/columns/ActivityColumns'
import {Activity} from '../../../models/activity/Activity'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {CustomHeaderColumn} from '../../../modules/table/columns/CustomHeaderColumn'
import {CustomRow} from '../../../modules/table/columns/CustomRow'
import {TableListLoading} from '../../../modules/table/TableListLoading'
import {TableListPagination} from '../../../modules/table/TableListPagination'

const ActivityTable = () => {
  const activities = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => activities, [activities])
  const columns = useMemo(() => ActivityColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable<Activity>(
    {
      columns,
      data,
    },
    useSortBy
  )

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-6 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<Activity>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Activity>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.original.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={10}>
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

export {ActivityTable}
