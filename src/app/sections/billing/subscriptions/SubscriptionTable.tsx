import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {useMemo} from 'react'
import {subscriptionColumns} from './_columns'
import {ColumnInstance, Row, useTable} from 'react-table'
import {CustomHeaderColumn} from '../../../modules/table/columns/CustomHeaderColumn'
import {CustomRow} from '../../../modules/table/columns/CustomRow'
import {TableListPagination} from '../../../modules/table/TableListPagination'
import {TableListLoading} from '../../../modules/table/TableListLoading'
import {KTCardBody} from '../../../../_metronic/helpers'
import {Subscription} from '../../../models/billing/Subscription'

const SubscriptionTable = () => {
  const subscriptions = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => subscriptions, [subscriptions])
  const columns = useMemo(() => subscriptionColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}>
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<Subscription>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Subscription>, i) => {
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

export {SubscriptionTable}
