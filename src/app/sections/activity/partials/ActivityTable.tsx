import {useMemo} from 'react'
import {useSortBy, useTable} from 'react-table'
import {ActivityColumns} from '../core/columns/ActivityColumns'
import {Activity} from '../../../models/activity/Activity'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {McTable} from '../../../components/McTable'

const ActivityTable = () => {
  const activities = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => activities, [activities])
  const columns = useMemo(() => ActivityColumns, [])

  return (
    <McTable
      data={data}
      columns={columns}
      model={activities.length > 0 ? activities[0] : null}
      isLoading={isLoading}
    />
  )
}

export { ActivityTable };
