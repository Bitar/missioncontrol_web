import {Column} from 'react-table'
import {TextCell} from '../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../modules/table/columns/ActionsCell'
import {QUERIES, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Activity} from '../models/Activity'
import {BadgeCell} from '../../../modules/table/columns/BadgeCell'
import {formatDates, formatActivityStatus} from '../../../helpers/ActivityHelper'
import dayjs from 'dayjs'

const ActivityColumns: ReadonlyArray<Column<Activity>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Title' className='min-w-125px' />,
    id: 'title',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='w-75px me-3'>
          <img
            src={toAbsoluteUrl(props.data[props.row.index].game?.image)}
            alt=''
            className='w-100 h-100vh rounded'
          />
        </div>
        <div className='d-flex flex-column'>
          <span className='text-gray-800 mb-1'>{props.data[props.row.index].title}</span>
        </div>
      </div>
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Community' className='min-w-200px' />
    ),
    id: 'community',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index]?.community?.name} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Status' className='min-w-125px' />,
    id: 'status',
    Cell: ({...props}) => {
      const {status, color} = formatActivityStatus(props.data[props.row.index].status)
      return <BadgeCell status={status} color={color} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Dates' className='min-w-200px' />,
    id: 'Registration',
    Cell: ({...props}) => {
      const {startDate, endDate} = formatDates(props.data[props.row.index].registration_dates)
      return (
        <>
          <div className='d-flex align-items-center'>
            <div className='d-flex flex-column text-center'>
              <span className='text-gray-800 pe-none'>{startDate}</span>
              <span className='my-1'>
                <i className='fa fa-arrow-circle-down text-mc-secondary'></i>
              </span>
              <span className='text-gray-800 pe-none'>{endDate}</span>
            </div>
          </div>
        </>
      )
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Dates' className='min-w-200px' />,
    id: 'Game Day',
    Cell: ({...props}) => {
      const {startDate, endDate} = formatDates(props.data[props.row.index].matchplay_dates)
      return (
        <>
          <div className='d-flex align-items-center'>
            <div className='d-flex flex-column text-center'>
              <span className='text-gray-800 pe-none'>{startDate}</span>
              <span className='my-1'>
                <i className='fa fa-arrow-circle-down text-mc-secondary'></i>
              </span>
              <span className='text-gray-800 pe-none'>{endDate}</span>
            </div>
          </div>
        </>
      )
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Fee' className='min-w-125px' />,
    id: 'fee',
    Cell: ({...props}) => (
      <TextCell
        dObject={
          props.data[props.row.index].entry_fee?.amount
            ? '$' + props.data[props.row.index].entry_fee?.amount / 100
            : 'Free'
        }
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Players' className='min-w-125px' />,
    id: 'players',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].data?.players_count} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='# of Teams' className='min-w-125px' />
    ),
    id: 'teams',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].data?.teams_count} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Created On' className='min-w-125px' />
    ),
    id: 'created_at',
    Cell: ({...props}) => (
      <TextCell
        dObject={dayjs(new Date(props.data[props.row.index].created_at * 1000)).format(
          'ddd, ll @ H:m a'
        )}
      />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <ActionsCell
        id={props.data[props.row.index].id}
        path={'activities'}
        queryKey={QUERIES.ACTIVITIES_LIST}
        showView={true}
        showDelete={false}
      />
    ),
  },
]

export {ActivityColumns}
