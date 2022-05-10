import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
// import {User} from '../core/_models'
// import {UsersListLoading} from '../components/loading/UsersListLoading'
// import {UsersListPagination} from '../components/pagination/UsersListPagination'
import {KTCardBody} from "../../../../_metronic/helpers";
// import {
//     useQueryResponseData,
//     useQueryResponseLoading
// } from "../../../modules/apps/user-management/users-list/core/QueryResponseProvider";
// import {useQueryResponseData, useQueryResponseLoading} from "../../../modules/table/QueryResponseProvider";

import {CustomHeaderColumn} from "../../../modules/apps/user-management/users-list/table/columns/CustomHeaderColumn";
import {CustomRow} from "../../../modules/apps/user-management/users-list/table/columns/CustomRow";
import {rolesColumns} from "./_columns";
import {Role} from "../../../models/user/Role";
import {useQueryResponseData} from "./core/QueryResponseProvider";


const RolesTable = () => {
    const users = useQueryResponseData()
    // const isLoading = useQueryResponseLoading()
    const data = useMemo(() => users, [users])
    const columns = useMemo(() => rolesColumns, [])
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
                        {headers.map((column: ColumnInstance<Role>) => (
                            <CustomHeaderColumn key={column.id} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<Role>, i) => {
                            prepareRow(row)
                            return <CustomRow row={row} key={`row-${i}-${row.id}`}/>
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
            {/*<UsersListPagination/>*/}
            {/*{isLoading && <UsersListLoading/>}*/}
        </KTCardBody>
    )
}

export {RolesTable}