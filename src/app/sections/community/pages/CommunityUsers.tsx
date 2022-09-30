import {FC, useMemo} from 'react'
import {KTCard, KTCardBody, QUERIES} from '../../../../_metronic/helpers'
import {User} from '../../identity/user/models/User'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {
  QueryResponseProvider,
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {getCommunityUsers} from '../core/CommunityRequests'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {ColumnInstance, Row, useTable} from 'react-table'
import {CustomHeaderColumn} from '../../../modules/table/columns/CustomHeaderColumn'
import {CustomRow} from '../../../modules/table/columns/CustomRow'
import {TableListPagination} from '../../../modules/table/TableListPagination'
import {TableListLoading} from '../../../modules/table/TableListLoading'
import {CommunityUsersColumns} from '../core/CommunityUsersColumns'
import {useCommunity} from '../CommunityContext'

const CommunityUsersTable = () => {
  const communityUsers = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => communityUsers, [communityUsers])
  const columns = useMemo(() => CommunityUsersColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCard>
      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
            {...getTableProps()}
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-6 text-uppercase gs-0'>
                {headers.map((column: ColumnInstance<User>) => (
                  <CustomHeaderColumn key={column.id} column={column} />
                ))}
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row: Row<User>, i) => {
                  prepareRow(row)
                  return <CustomRow row={row} key={`row-${i}-${row.id}`} />
                })
              ) : (
                <tr>
                  <td colSpan={2}>
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
    </KTCard>
  )
}

const CommunityUsers: FC = () => {
  const {community} = useCommunity()
  return (
    <>
      {community && (
        <QueryRequestProvider>
          <QueryResponseProvider
            id={QUERIES.COMMUNITIES_USERS_LIST}
            requestFunction={getCommunityUsers}
            requestId={community.id}
          >
            <ListViewProvider>
              <CommunityUsersTable />
            </ListViewProvider>
          </QueryResponseProvider>
        </QueryRequestProvider>
      )}

      {/*<KTCard>*/}
      {/*  <div className='card-header border-0 pt-5'>*/}
      {/*    <h3 className='card-title align-items-start flex-column'>*/}
      {/*      <span className='card-label fw-bolder fs-3 mb-1'>Community Members</span>*/}
      {/*    </h3>*/}
      {/*    /!*<div className='card-toolbar'>*!/*/}
      {/*    /!*  <a*!/*/}
      {/*    /!*    href='src/app/sections/community/pages/CommunityFollowers#CommunityUsers.tsx'*!/*/}
      {/*    /!*    className='btn btn-sm btn-light-primary'*!/*/}
      {/*    /!*  >*!/*/}
      {/*    /!*    <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />*!/*/}
      {/*    /!*    New Member*!/*/}
      {/*    /!*  </a>*!/*/}
      {/*    /!*</div>*!/*/}
      {/*  </div>*/}

      {/*  <div className='card-body py-3'>*/}
      {/*    <div className='table-responsive'>*/}
      {/*      <table className='table align-middle gs-0 gy-4 table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'>*/}
      {/*        <thead>*/}
      {/*        <tr className='text-start text-muted fw-bolder fs-6 text-uppercase gs-0'>*/}
      {/*          <th className='ps-4 min-w-325px rounded-start'>Members</th>*/}
      {/*          <th className='min-w-125px'>username</th>*/}
      {/*          /!*<th className='min-w-125px'>activity</th>*!/*/}
      {/*          /!*<th className='min-w-200px text-end rounded-end' />*!/*/}
      {/*        </tr>*/}
      {/*        </thead>*/}
      {/*        <tbody className='text-gray-600 fw-bold role=rowgroup'>*/}
      {/*        {community?.users?.slice(0,20).map((member) => (*/}
      {/*          <tr key={member.id} role='row'>*/}
      {/*            <td role='cell'>*/}
      {/*              <TextImageCell*/}
      {/*                dImage={member.meta?.image}*/}
      {/*                dText={member.name}*/}
      {/*                dExtraText={member.email}*/}
      {/*                link={''}*/}
      {/*              ></TextImageCell>*/}
      {/*            </td>*/}
      {/*            <td>*/}
      {/*              <span className='text-muted fw-bold text-muted d-block fs-7'>*/}
      {/*                {member.meta?.username}#{member?.meta?.rng}*/}
      {/*              </span>*/}
      {/*            </td>*/}
      {/*          </tr>*/}
      {/*        ))}*/}
      {/*        </tbody>*/}
      {/*      </table>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</KTCard>*/}
    </>
  )
}

export {CommunityUsers}
