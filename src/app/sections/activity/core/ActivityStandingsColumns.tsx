import {Column} from 'react-table'
import {TextCell} from '../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../modules/table/columns/CustomHeader'
import {ActivityStanding} from '../models/ActivityStanding'
import {BadgeCell} from '../../../modules/table/columns/BadgeCell'

const ActivityStandingsColumns: ReadonlyArray<Column<ActivityStanding>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Team' className='min-w-125px' />,
    id: 'team',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
          <span className='text-gray-800'>
            <span className='pe-none mb-1 me-4'>{props.row.index + 1}</span>
            <span className='pe-none mb-1'>{props.data[props.row.index].team?.name}</span>
          </span>
        </div>
      </div>
    ),
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
        dObject={props.data[props.row.index].score?.win + ' - ' + props.data[props.row.index].score?.lose}
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Score' className='text-mc-secondary' />,
    id: 'Score',
    Cell: ({...props}) => <BadgeCell color='mc-secondary' status={props.data[props.row.index].score?.score_win + props.data[props.row.index].score?.score_lose} />,
  },
]

export { ActivityStandingsColumns };
