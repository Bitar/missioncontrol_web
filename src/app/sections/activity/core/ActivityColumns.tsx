import {Column} from 'react-table'
import {TextCell} from '../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../modules/table/columns/ActionsCell'
import {QUERIES, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Activity} from '../models/Activity'
import {BadgeCell} from '../../../modules/table/columns/BadgeCell'
import {formatActivityStatus, formatDates} from '../../../helpers/ActivityHelper'
import dayjs from 'dayjs'
import React from 'react'
import {Link} from 'react-router-dom'

const ActivityColumns: ReadonlyArray<Column<Activity>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='' className='min-w-75px' />,
    id: 'image',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='w-75px me-3'>
          <Link to={'/activities/' + props.data[props.row.index].id} className='d-block'>
            <img
              src={toAbsoluteUrl(props.data[props.row.index].game?.image)}
              alt=''
              className='w-100 h-100vh rounded'
            />
          </Link>
        </div>
      </div>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Title' className='min-w-125px' />,
    id: 'title',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
          <Link to={'/activities/' + props.data[props.row.index].id} className='d-block'>
            <span className='text-gray-800 mb-1'>{props.data[props.row.index].title}</span>
          </Link>
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
    Header: (props) => (
      <CustomHeader tableProps={props} title='Registration Dates' className='min-w-200px' />
    ),
    id: 'Registration',
    Cell: ({...props}) => {
      return (
        <div className='d-flex align-items-center'>
          <div className='d-flex flex-column text-center'>
            <span className='text-gray-800 pe-none'>
              {dayjs(new Date(props.data[props.row.index]?.registration_dates?.start_date * 1000))
                .utc(false)
                .format('DD MMM YY')}
              <span className='my-1 d-block'>
                <i className='fa fa-arrow-circle-down text-mc-secondary'></i>
              </span>
              {dayjs(new Date(props.data[props.row.index]?.registration_dates?.end_date * 1000))
                .utc(false)
                .format('DD MMM YY')}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='MatchPlay Dates' className='min-w-200px' />
    ),
    id: 'Game Day',
    Cell: ({...props}) => {
      const {startDate, endDate} = formatDates(
        props.data[props.row.index].matchplay_dates,
        props.data[props.row.index].settings.timezone.value
      )
      return (
        <div className='d-flex align-items-center'>
          <div className='d-flex flex-column text-center'>
            <span className='text-gray-800 pe-none'>{startDate}</span>
            <span className='my-1'>
              <i className='fa fa-arrow-circle-down text-mc-secondary'></i>
            </span>
            <span className='text-gray-800 pe-none'>{endDate}</span>
          </div>
        </div>
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
    Cell: ({...props}) => (
      <div className='text-center'>
        <span className='text-gray-800 pe-none mb-1'>
          {props.data[props.row.index].additional_data?.players_count || 0}
        </span>
      </div>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Teams' className='min-w-125px' />,
    id: 'teams',
    Cell: ({...props}) => (
      <div className='text-center'>
        <span className='text-gray-800 pe-none mb-1'>
          {props.data[props.row.index].additional_data?.teams_count || 0}
        </span>
      </div>
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Created On' className='min-w-125px' />
    ),
    id: 'created_at',
    Cell: ({...props}) => (
      <div className='text-center'>
        <span className='text-gray-800 pe-none mb-1'>
          {dayjs(new Date(props.data[props.row.index].created_at * 1000)).format(
            'ddd, ll @ h:mm a'
          )}
        </span>
      </div>
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
