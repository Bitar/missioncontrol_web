import {useQueryResponseData, useQueryResponseLoading} from "../../modules/table/QueryResponseProvider";
import {useMemo} from "react";
import {ColumnInstance, Row, useTable} from "react-table";
import {communitiesColumns} from "./_columns";
import {CustomHeaderColumn} from "../../modules/table/columns/CustomHeaderColumn";
import {CustomRow} from "../../modules/table/columns/CustomRow";
import {TableListPagination} from "../../modules/table/TableListPagination";
import {TableListLoading} from "../../modules/table/TableListLoading";
import {KTCardBody} from "../../../_metronic/helpers";
import {Community} from "../../models/community/Community";

const CommunityTable = () => {
    const communities = useQueryResponseData()
    const isLoading = useQueryResponseLoading()
    const data = useMemo(() => communities, [communities])
    const columns = useMemo(() => communitiesColumns, [])
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
                    <tr className='text-start text-muted fw-bolder fs-6 text-uppercase gs-0'>
                        {headers.map((column: ColumnInstance<Community>) => (
                            <CustomHeaderColumn key={column.id} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold pe-none' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<Community>, i) => {
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

export {CommunityTable}