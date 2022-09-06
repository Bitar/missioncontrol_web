import React, {FC, useMemo} from 'react'
import {Activity} from '../models/Activity'
import {ActivityStandingsColumns} from '../core/ActivityStandingsColumns'
import {ColumnInstance, Row, useTable} from 'react-table'
import {CustomHeaderColumn} from '../../../modules/table/columns/CustomHeaderColumn'
import {ActivityStanding} from '../models/ActivityStanding'
import {CustomRow} from '../../../modules/table/columns/CustomRow'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'

type Props = {
  activity: Activity | undefined
}

const ActivityStandings: FC<Props> = ({activity}) => {
  const data = useMemo(() => activity?.standings || [], [activity?.standings])
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
        <KTCardBody className='py-1' id='activities_standings_body'>
          <div
            className={'scroll-y me-n5 pe-5 h-300px h-lg-auto'}
            data-kt-element='matches'
            data-kt-scroll='true'
            data-kt-scroll-activate='{default: false, lg: true}'
            data-kt-scroll-max-height='300px'
            data-kt-scroll-dependencies={
              '#kt_header, #kt_toolbar, #kt_footer, #activities_standings_header'
            }
            data-kt-scroll-wrappers={'#kt_content, #activities_standings_body'}
            data-kt-scroll-offset={'-2px'}
          >
            <div className='table-responsive'>
              <table
                className='table align-middle table-row-bordered fs-6 gy-5 dataTable no-footer'
                {...getTableProps()}
              >
                <thead>
                <tr className='text-start text-muted fw-bolder fs-6 text-uppercase gs-0'>
                  {headers.map((column: ColumnInstance<ActivityStanding>) => (
                    <CustomHeaderColumn key={column.id} column={column} />
                  ))}
                </tr>
                </thead>
                <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                {rows.length > 0 ? (
                  rows.map((row: Row<ActivityStanding>, i) => {
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
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export { ActivityStandings };