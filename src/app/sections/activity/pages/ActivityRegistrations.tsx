import React, {FC, useMemo} from 'react'
import {User} from '../../identity/user/models/User'
import {ColumnInstance, Row, useTable} from 'react-table'
import {ActivityMembersColumns} from '../core/ActivityMembersColumns'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {CustomHeaderColumn} from '../../../modules/table/columns/CustomHeaderColumn'
import {CustomRow} from '../../../modules/table/columns/CustomRow'
import { ActivityRegistration } from "../models/ActivityRegistration";

type Props = {
  members: User[] | undefined
  registrations: ActivityRegistration[] | undefined
}

const ActivityRegistrations: FC<Props> = ({members, registrations}) => {
  const data = useMemo(() => registrations || [], [registrations])
  const columns = useMemo(() => ActivityMembersColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCard>
      <div className='card-header bg-info'>
        <div className='card-title'>
          <h3 className='card-label text-white'>Registrations</h3>
        </div>
      </div>
      <KTCardBody className='py-1'>
        <div className='table-responsive'>
          <table
            className='table align-middle table-row-bordered fs-6 gy-5 dataTable no-footer'
            {...getTableProps()}
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-6 text-uppercase gs-0'>
                {headers.map((column: ColumnInstance<ActivityRegistration>) => (
                  <CustomHeaderColumn key={column.id} column={column} />
                ))}
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row: Row<ActivityRegistration>, i) => {
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
  )
}

export {ActivityRegistrations}