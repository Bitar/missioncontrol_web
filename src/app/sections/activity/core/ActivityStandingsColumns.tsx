import {Column} from 'react-table'
import {TextCell} from '../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../modules/table/columns/CustomHeader'
import {ActivityStanding} from '../models/ActivityStanding'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

const ActivityStandingsColumns: ReadonlyArray<Column<ActivityStanding>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Team' />,
    id: 'image',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='w-100px me-3'>
          <img
            src={toAbsoluteUrl(props.data[props.row.index].team?.image)}
            alt={props.data[props.row.index].team?.name + ' team image'}
            className='w-100 h-100vh rounded'
          />
        </div>
        <div className='d-flex flex-column'>
          <span className='text-gray-800 mb-1'>{props.data[props.row.index].team?.name}</span>
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
        dObject={
          props.data[props.row.index].score?.win + ' - ' + props.data[props.row.index].score?.lose
        }
      />
    ),
  },
]

export { ActivityStandingsColumns };
