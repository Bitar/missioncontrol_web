import React from 'react'
import {Column, UseSortByColumnOptions} from 'react-table'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Activity} from '../../../../models/activity/Activity'
import {formatActivityStatus} from '../../../../helpers/ActivityHelper'
import {Link} from 'react-router-dom'
import {BadgeCell} from '../../../../modules/table/columns/BadgeCell'
import {useAccessControl} from '../../../../modules/auth/core/AuthPermission'
import moment from 'moment'
import momentTz from 'moment-timezone'

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
    Header: (props) => <CustomHeader tableProps={props} title='Type' className='min-w-125px' />,
    id: 'type_id',
    defaultCanSort: true,
    Cell: ({...props}) => (
      <>
        <div style={{fontSize: '12px'}}>
          <div className='d-flex align-items-center'>
            <div className='d-flex flex-column'>
              <span className='text-gray-800 pe-none mb-1'>
                {props.data[props.row.index]?.type?.name}
                {props.data[props.row.index]?.type?.id === 1 &&
                  props.data[props.row.index]?.playoff?.is_enabled &&
                  ' w/ Playoffs'}
              </span>
            </div>
          </div>
        </div>
      </>
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
      const timeZoneAbbr = moment.tz(momentTz.tz.guess()).zoneAbbr()

      return (
        <div className='d-flex align-items-center'>
          <div className='d-flex flex-column text-center'>
            <span className='text-gray-800 pe-none'>
              <div>
                {moment(props.data[props.row.index]?.registration_dates?.start_date * 1000).format(
                  "DD MMM 'YY - hh:mm a "
                )}
                {timeZoneAbbr}
              </div>
              <i className='fa fa-arrow-circle-right text-mc-secondary ps-2 pe-2'></i>
              <div>
                {moment(props.data[props.row.index]?.registration_dates?.end_date * 1000).format(
                  "DD MMM 'YY - hh:mm a "
                )}
                {timeZoneAbbr}
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
      const timeZoneAbbr = moment.tz(momentTz.tz.guess()).zoneAbbr()

      return (
        <div className='d-flex align-items-center'>
          <div className='d-flex flex-column text-center'>
            <span className='text-gray-800'>
              <div>
                {moment(props.data[props.row.index]?.matchplay_dates?.start_date * 1000).format(
                  "DD MMM 'YY - hh:mm a "
                )}
                {timeZoneAbbr}
              </div>
              <i className='fa fa-arrow-circle-right text-mc-secondary ps-2 pe-2'></i>
              <div>
                {moment(props.data[props.row.index]?.matchplay_dates?.end_date * 1000).format(
                  "DD MMM 'YY - hh:mm a "
                )}
                {timeZoneAbbr}
              </div>
            </span>
          </div>
        </div>
      )
    },
  },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title='Timezone' className='min-w-200px' />,
  //   id: 'timezone',
  //   defaultCanSort: false,
  //   Cell: ({...props}) => {
  //     return (
  //       <div className='d-flex align-items-center'>
  //         <div className='d-flex flex-column text-center'>
  //           <span className='text-gray-800'>
  //             {props.data[props.row.index]?.settings?.timezone?.abbreviation}
  //           </span>
  //         </div>
  //       </div>
  //     )
  //   },
  // },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Fee' className='min-w-125px' />,
    id: 'fee',
    defaultCanSort: false,
    Cell: ({...props}) => {
      if (props.data[props.row.index]?.entry_fee?.type === 1) {
        return <BadgeCell status={'Free'} color={'success'} align={'left'} />
      } else if (props.data[props.row.index]?.entry_fee?.type === 2) {
        return <BadgeCell status={'Paid'} color={'info'} align={'left'} />
      } else {
        return <></>
      }
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
          {moment(props.data[props.row.index].created_at * 1000).format('D MMM, YYYY')}
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
          {moment(props.data[props.row.index].created_at * 1000).format('D MMM, YYYY [at] h:mm A')}
        </span>
      </div>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Actions' className='min-w-100px' />,
    id: 'actions',
    defaultCanSort: false,
    Cell: ({...props}) => {
      const accessControl = useAccessControl()

      return (
        <ActionsCell
          id={props.data[props.row.index].id}
          path={'activities'}
          queryKey={QUERIES.ACTIVITIES_LIST}
          showView={accessControl.userCan('view-activities')}
          showDelete={accessControl.userCan('manage-activities')}
        />
      )
    },
  },
]

export {ActivityColumns}
