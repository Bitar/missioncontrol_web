import React, {useMemo} from 'react'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../../../modules/table/QueryResponseProvider'
import {PlatformColumns} from './PlatformColumns'
import {ColumnInstance, Row, useTable} from 'react-table'
import {KTCard, KTCardBody, KTCardHeader} from '../../../../../helpers/components'
import {CustomHeaderColumn} from '../../../../../modules/table/columns/CustomHeaderColumn'
import {CustomRow} from '../../../../../modules/table/columns/CustomRow'
import {TableListPagination} from '../../../../../modules/table/TableListPagination'
import {TableListLoading} from '../../../../../modules/table/TableListLoading'
import {Platform} from '../../../../../models/game/Platform'

export const PlatformDetailTable = () => {
  const platforms = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => platforms, [platforms])
  const columns = useMemo(() => PlatformColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCard className='mb-10' border={true}>
      <KTCardHeader text={'Platforms'} bg='mc-primary' text_color='white' />
      <KTCardBody>
        <div className='table-responsive'>
          <table
            className='table align-middle table-row-bordered fs-6 gy-5 dataTable no-footer'
            {...getTableProps()}>
            <thead>
              <tr className='text-start text-muted fw-bolder fs-6 text-uppercase gs-0'>
                {headers.map((column: ColumnInstance<Platform>) => (
                  <CustomHeaderColumn key={column.id} column={column} />
                ))}
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row: Row<Platform>, i) => {
                  prepareRow(row)
                  return <CustomRow row={row} key={`row-${i}-${row.id}`} />
                })
              ) : (
                <tr>
                  <td colSpan={3}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                      No records found
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
    </KTCard>
  )
}
