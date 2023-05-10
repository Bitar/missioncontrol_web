import React, {FC, useMemo} from 'react'
import {KTCard, KTCardBody} from '../../../helpers/components'
import clsx from 'clsx'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {ColumnInstance, Row, useTable} from 'react-table'
import {ActivityStandingsColumns} from '../core/columns/ActivityStandingsColumns'
import {Team} from '../../../models/squad/Team'
import {CustomHeaderColumn} from '../../../modules/table/columns/CustomHeaderColumn'
import {CustomRow} from '../../../modules/table/columns/CustomRow'
import {TableListPagination} from '../../../modules/table/TableListPagination'
import {TableListLoading} from '../../../modules/table/TableListLoading'
import {McTable} from '../../../components/McTable'
import {ActivityColumns} from '../core/columns/ActivityColumns'

type Props = {
  minimal?: boolean
  scroll?: boolean
}

const ActivityStandings: FC<Props> = ({scroll = false}) => {
  const teams = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => teams, [teams])
  const columns = useMemo(() => ActivityStandingsColumns, [])

  return (
    <>
      <KTCard>
        <div className='card-header bg-info' id='activities_standings_header'>
          <div className='card-title'>
            <h3 className='card-label text-white'>Standings</h3>
          </div>
        </div>

        <KTCardBody className={clsx('py-1', {'scroll-y mh-400px': scroll})}>
          <McTable
            data={data}
            columns={columns}
            model={teams.length > 0 ? teams[0] : null}
            isLoading={isLoading}
          />
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {ActivityStandings}
