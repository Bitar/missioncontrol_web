import {useMemo} from 'react'
import {ColumnInstance, Row, useTable} from 'react-table'
import {gamesColumns} from './core/GameColumns'
import {Game} from '../../models/game/Game'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../modules/table/QueryResponseProvider'
import {CustomHeaderColumn} from '../../modules/table/columns/CustomHeaderColumn'
import {CustomRow} from '../../modules/table/columns/CustomRow'
import {TableListLoading} from '../../modules/table/TableListLoading'
import {TableListPagination} from '../../modules/table/TableListPagination'

const GameTable = () => {
  const games = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => games, [games])
  const columns = useMemo(() => gamesColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <>
      <div className='table-responsive'>
        <table
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-6 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<Game>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Game>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={3}>
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
    </>
  )
}

export {GameTable}
