import React, {FC, useMemo} from 'react'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import clsx from 'clsx'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {ColumnInstance, Row, useTable} from 'react-table'
import {ActivityStandingsColumns} from '../core/ActivityStandingsColumns'
import {Team} from '../../../models/squad/Team'
import {CustomHeaderColumn} from '../../../modules/table/columns/CustomHeaderColumn'
import {CustomRow} from '../../../modules/table/columns/CustomRow'
import {TableListPagination} from '../../../modules/table/TableListPagination'
import {TableListLoading} from '../../../modules/table/TableListLoading'

type Props = {
  minimal?: boolean
  scroll?: boolean
}

const ActivityStandings: FC<Props> = ({scroll = false}) => {
  const teams = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => teams, [teams])
  const columns = useMemo(() => ActivityStandingsColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <>
      <KTCard>
        <div className='card-header bg-info' id='activities_standings_header'>
          <div className='card-title'>
            <h3 className='card-label text-white'>Standings</h3>
          </div>
        </div>

        <KTCardBody className={clsx('py-1', {'scroll-y mh-400px': scroll})}>
          <div className='table-responsive'>
            <table
              className='table align-middle table-row-bordered fs-6 gy-5 dataTable no-footer'
              {...getTableProps()}
            >
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
          <TableListPagination numbers={false}/>
          {isLoading && <TableListLoading />}
        </KTCardBody>
      </KTCard>
    </>
  )
}

export { ActivityStandings };
