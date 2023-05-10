import {Column} from 'react-table'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActivityStanding} from '../../../../models/activity/ActivityStanding'
import React from 'react'
import {TextImageCell} from '../../../../modules/table/columns/TextImageCell'
import {TextCell} from '../../../../modules/table/columns/TextCell'

const ActivityStandingsColumns: ReadonlyArray<Column<ActivityStanding>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Team' className='mw-200px' />,
    id: 'image',
    Cell: ({...props}) => (
      <TextImageCell
        dImage={props.data[props.row.index]?.team?.image}
        dText={props.data[props.row.index]?.team?.name}
        size={'20'}
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='P' />,
    id: 'matches',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].games_played} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='W - L' />,
    id: 'record',
    Cell: ({...props}) => (
      <TextCell
        dObject={
          props.data[props.row.index].games_won + ' - ' + props.data[props.row.index].games_lost
        }
      />
    ),
  },
]

export {ActivityStandingsColumns}
