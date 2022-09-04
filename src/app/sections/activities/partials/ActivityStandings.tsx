import {FC, useMemo} from 'react'
import {Activity} from '../models/Activity'
import {ActivityStandingsColumns} from '../core/ActivityStandingsColumns'
import {ColumnInstance, Row, useTable} from 'react-table'
import {CustomHeaderColumn} from '../../../modules/table/columns/CustomHeaderColumn'
import {ActivityStanding} from '../models/ActivityStanding'
import {CustomRow} from '../../../modules/table/columns/CustomRow'
import { KTCard, KTCardBody } from "../../../../_metronic/helpers";

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
        <KTCardBody className='py-1'>
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
        </KTCardBody>
      </KTCard>
    </>
  )
}

export { ActivityStandings };