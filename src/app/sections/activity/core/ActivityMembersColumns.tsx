import {Column} from 'react-table'
import {TextCell} from '../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../modules/table/columns/CustomHeader'
import React from 'react'
import {ActivityRegistration} from '../models/ActivityRegistration'
import dayjs from 'dayjs'
import {BadgeCell} from '../../../modules/table/columns/BadgeCell'
import { getTeamStatus } from "../../../models/squad/Team";

const ActivityMembersColumns: ReadonlyArray<Column<ActivityRegistration>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
          <span className='text-gray-800'>
            <div className='symbol symbol-35px symbol-circle me-3'>
              <img
                alt={props.data[props.row.index].user?.name + ' profile image'}
                src={props.data[props.row.index].user?.meta?.image}
              />
            </div>
            <span className='pe-none mb-1'>{props.data[props.row.index].user?.name}</span>
          </span>
        </div>
      </div>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Email' />,
    id: 'email',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].user?.email} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Team' />,
    id: 'team',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].team?.name} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Team Status' />,
    id: 'team_status',
    Cell: ({...props}) => {
      const {status, color} = getTeamStatus(props.data[props.row.index].team?.status)
      return <BadgeCell status={status} color={color} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Registered On' />,
    id: 'registered_on',
    Cell: ({...props}) => (
      <TextCell
        dObject={dayjs(new Date(props.data[props.row.index].created_at * 1000)).format('ddd, ll @ LT')}
      />
    ),
  },
]

export { ActivityMembersColumns };
