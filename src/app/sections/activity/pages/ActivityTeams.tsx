import React, {FC, useMemo} from 'react'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {ActivityTeamsColumns} from '../core/columns/ActivityTeamsColumns'
import {ColumnInstance, Row, useTable} from 'react-table'
import {KTCard, KTCardBody} from '../../../helpers/components'
import {CustomHeaderColumn} from '../../../modules/table/columns/CustomHeaderColumn'
import {CustomRow} from '../../../modules/table/columns/CustomRow'
import {TableListPagination} from '../../../modules/table/TableListPagination'
import {TableListLoading} from '../../../modules/table/TableListLoading'
import {Team} from '../../../models/squad/Team'

const ActivityTeams: FC = () => {
  const teams = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => teams, [teams])
  const columns = useMemo(() => ActivityTeamsColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCard>
      <div className='card-header bg-mc-primary'>
        <div className='card-title'>
          <h3 className='card-label text-white'>Teams</h3>
        </div>
      </div>
      <KTCardBody className='pt-1'>
        <div className='table-responsive'>
          <table
            className='table align-middle table-row-bordered fs-6 gy-5 dataTable no-footer'
            {...getTableProps()}>
            <thead>
              <tr className='text-start text-muted fw-bolder fs-6 text-uppercase gs-0'>
                {headers.map((column: ColumnInstance<Team>) => (
                  <CustomHeaderColumn key={column.id} column={column} />
                ))}
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row: Row<Team>, i) => {
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

export {ActivityTeams}
