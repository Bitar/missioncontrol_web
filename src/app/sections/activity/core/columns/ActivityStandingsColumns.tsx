import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActivityStanding} from '../../models/ActivityStanding'
import {TeamImage} from '../../components/TeamImage'
import React from 'react'

const ActivityStandingsColumns: ReadonlyArray<Column<ActivityStanding>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Team' className='mw-200px' />,
    id: 'image',
    Cell: ({...props}) => <TeamImage team={props.data[props.row.index]} size='50px' />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='M' />,
    id: 'matches',
    Cell: ({...props}) => (
      <TextCell
        dObject={props.data[props.row.index].score?.win + props.data[props.row.index].score?.lose}
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='W - L' />,
    id: 'record',
    Cell: ({...props}) => (
      <TextCell
        dObject={
          props.data[props.row.index].score?.win + ' - ' + props.data[props.row.index].score?.lose
        }
      />
    ),
  },
]

export {ActivityStandingsColumns}