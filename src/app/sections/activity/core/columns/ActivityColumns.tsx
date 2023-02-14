import React from 'react'
import {Column, UseSortByColumnOptions} from 'react-table'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Activity} from '../../../../models/activity/Activity'
import {createDateFrom, formatActivityStatus} from '../../../../helpers/ActivityHelper'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import {BadgeCell} from '../../../../modules/table/columns/BadgeCell'

dayjs.extend(localizedFormat)

const ActivityColumns: (Column<Activity> & UseSortByColumnOptions<Activity>)[] = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='' className='min-w-75px' />,
    id: 'image',
    defaultCanSort: false,
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
    defaultCanSort: true,
    Cell: ({...props}) => (
      <>
        <div className='d-flex align-items-center'>
          <div className='d-flex flex-column'>
            <Link to={'/activities/' + props.data[props.row.index].id} className='d-block'>
              <span className='text-gray-800 mb-1'>{props.data[props.row.index].title}</span>
            </Link>
          </div>
        </div>
        <div style={{fontSize: '12px'}}>
          <div className='d-flex align-items-center'>
            <div className='d-flex flex-column'>
              <span className='text-gray-800 pe-none mb-1'>
                <i className='fas fa fa-people-group text-mc-secondary'></i>{' '}
                {props.data[props.row.index]?.community?.name}
              </span>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Status' className='min-w-125px' />,
    id: 'status',
    defaultCanSort: false,
    Cell: ({...props}) => {
      const {status, color} = formatActivityStatus(props.data[props.row.index].status)
      return <BadgeCell status={status} color={color} align={'left'} />
    },
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Registration' className='min-w-200px' />
    ),
    id: 'registrationDates',
    defaultCanSort: false,
    Cell: ({...props}) => {
      return (
        <div className='d-flex align-items-center'>
          <div className='d-flex flex-column text-center'>
            <span className='text-gray-800 pe-none'>
              <div>
                {createDateFrom(props.data[props.row.index]?.registration_dates?.start_date).format(
                  'DD MMM YY hh:mm A'
                )}
              </div>
              <i className='fa fa-arrow-circle-right text-mc-secondary ps-2 pe-2'></i>
              <div>
                {createDateFrom(props.data[props.row.index]?.registration_dates?.end_date).format(
                  'DD MMM YY hh:mm A'
                )}
              </div>
            </span>
          </div>
        </div>
      )
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Play' className='min-w-200px' />,
    id: 'matchPlayDates',
    defaultCanSort: false,
    Cell: ({...props}) => {
      return (
        <div className='d-flex align-items-center'>
          <div className='d-flex flex-column text-center'>
            <span className='text-gray-800'>
              <div>
                {createDateFrom(props.data[props.row.index]?.matchplay_dates?.start_date).format(
                  'DD MMM YY hh:mm A'
                )}
              </div>
              <i className='fa fa-arrow-circle-right text-mc-secondary ps-2 pe-2'></i>
              <div>
                {createDateFrom(props.data[props.row.index]?.matchplay_dates?.end_date).format(
                  'DD MMM YY hh:mm A'
                )}
              </div>
            </span>
          </div>
        </div>
      )
    },
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Created On' className='min-w-125px' />
    ),
    id: 'created_at',
    defaultCanSort: true,
    Cell: ({...props}) => (
      <div className='text-center'>
        <span className='text-gray-800 pe-none mb-1'>
          {dayjs(new Date(props.data[props.row.index].created_at * 1000)).format('D MMM, YYYY')}
        </span>
      </div>
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Updated On' className='min-w-125px' />
    ),
    id: 'updated_at',
    defaultCanSort: true,
    Cell: ({...props}) => (
      <div className='text-center'>
        <span className='text-gray-800 pe-none mb-1'>
          {dayjs(new Date(props.data[props.row.index].updated_at * 1000)).format(
            'D MMM, YYYY [at] h:mm A'
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
    defaultCanSort: false,
    Cell: ({...props}) => (
      <ActionsCell
        id={props.data[props.row.index].id}
        path={'activities'}
        queryKey={QUERIES.ACTIVITIES_LIST}
        showView={true}
        showDelete={true}
      />
    ),
  },
]

export {ActivityColumns}
