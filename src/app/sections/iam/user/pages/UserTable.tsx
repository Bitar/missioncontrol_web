import {useMemo} from 'react'
import {usersColumns} from '../core/UserColumns'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {McTable} from '../../../../components/McTable'

const UserTable = () => {
  const users = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => users, [users])
  const columns = useMemo(() => usersColumns, [])

  return (
    <McTable
      data={data}
      columns={columns}
      model={users.length > 0 ? users[0] : null}
      isLoading={isLoading}
    />
  )
}

export {UserTable}
