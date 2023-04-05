import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActivityStanding} from '../../../../models/activity/ActivityStanding'
import React from 'react'
import {TextImageCell} from '../../../../modules/table/columns/TextImageCell'

const ActivityStandingsColumns: ReadonlyArray<Column<ActivityStanding>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Team' className='mw-200px' />,
    id: 'image',
    Cell: ({...props}) => (
      <TextImageCell
        dImage={props.data[props.row.index]?.image}
        dText={props.data[props.row.index]?.name}
        size={'20'}
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='P' />,
    id: 'matches',
    Cell: ({...props}) => (
      <></>
      // <TextCell
      //   dObject={props.data[props.row.index].score?.win + props.data[props.row.index].score?.lose}
      // />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='W - L' />,
    id: 'record',
    Cell: ({...props}) => (
      <></>
      // <TextCell
      //   dObject={
      //     props.data[props.row.index].score?.win + ' - ' + props.data[props.row.index].score?.lose
      //   }
      // />
    ),
  },
]

export {ActivityStandingsColumns}
