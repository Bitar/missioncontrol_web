import React, { FC, useMemo } from "react";
import { KTCard, KTCardBody } from "../../../../_metronic/helpers";
import { ColumnInstance, Row, useTable } from "react-table";
import { CustomHeaderColumn } from "../../../modules/table/columns/CustomHeaderColumn";
import { CustomRow } from "../../../modules/table/columns/CustomRow";
import { TableListPagination } from "../../../modules/table/TableListPagination";
import { TableListLoading } from "../../../modules/table/TableListLoading";
import { useQueryResponseData, useQueryResponseLoading } from "../../../modules/table/QueryResponseProvider";
import { MatchesColumns } from "../core/MatchesColumns";
import { Match } from "../models/matches/Match";
import clsx from "clsx";

type Props = {
  title: string
}

const MatchesTable: FC<Props> = ({title}) => {
  const teams = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => teams, [teams])
  const columns = useMemo(() => MatchesColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <>
      <KTCard>
        <div className='card-header bg-info'>
          <div className='card-title'>
            <h3 className='card-label text-white'>{title}</h3>
          </div>
        </div>
        <KTCardBody className='scroll-y mh-800px'>
          <div className='table-responsive'>
            <table
              className='table align-middle table-row-bordered fs-6 gy-0 dataTable no-footer'
              {...getTableProps()}
            >
              <thead>
              <tr className='text-start text-muted fw-bolder fs-6 text-uppercase gs-0'>
                {headers.map((column: ColumnInstance<Match>) => (
                  <CustomHeaderColumn key={column.id} column={column} />
                ))}
              </tr>
              </thead>
              <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row: Row<Match>, i) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()} className={clsx({'text-end': cell.column.id === 'actions'})}>
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                      Matches are not scheduled yet
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
    </>
  )
}

export { MatchesTable };
