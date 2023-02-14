import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../modules/table/QueryResponseProvider'
import {useMemo} from 'react'
import {communitiesColumns} from './core/CommunityColumns'
import {McTable} from '../../components/McTable'

const CommunityTable = () => {
  const communities = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => communities, [communities])
  const columns = useMemo(() => communitiesColumns, [])

  return (
    <McTable
      data={data}
      columns={columns}
      model={communities.length > 0 ? communities[0] : null}
      isLoading={isLoading}
    />
  )
}

export {CommunityTable}
