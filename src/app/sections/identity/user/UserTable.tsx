import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {KTCardBody} from "../../../../_metronic/helpers";
import {usersColumns} from "./core/_columns";
import {User} from "./models/User";
import {useQueryResponseData, useQueryResponseLoading} from "../../../modules/table/QueryResponseProvider";
import {CustomHeaderColumn} from "../../../modules/table/columns/CustomHeaderColumn";
import {CustomRow} from "../../../modules/table/columns/CustomRow";
import {TableListLoading} from "../../../modules/table/TableListLoading";
import {TableListPagination} from "../../../modules/table/TableListPagination";

const UserTable = () => {
    const users = useQueryResponseData()
    const isLoading = useQueryResponseLoading()
    const data = useMemo(() => users, [users])
    const columns = useMemo(() => usersColumns, [])
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
                        {headers.map((column: ColumnInstance<User>) => (
                            <CustomHeaderColumn key={column.id} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<User>, i) => {
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
            <TableListPagination/>
            {isLoading && <TableListLoading/>}
        </KTCardBody>
    )
}

export {UserTable}
