import {Column} from 'react-table'
import {TextCell} from '../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../modules/table/columns/CustomHeader'
import {ActivityStanding} from '../models/ActivityStanding'
import {BadgeCell} from '../../../modules/table/columns/BadgeCell'
import {User} from '../../identity/user/models/User'
import React from 'react'

const ActivityMembersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
          <span className='text-gray-800'>
            <div className='symbol symbol-35px symbol-circle me-3'>
              <img
                alt={props.data[props.row.index].name + ' profile image'}
                src={props.data[props.row.index].meta?.image}
              />
            </div>
            <span className='pe-none mb-1'>{props.data[props.row.index].name}</span>
          </span>
        </div>
      </div>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Email' />,
    id: 'email',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].email} />,
  },
  // {
  //   Header: (props) => (
  //     <CustomHeader tableProps={props} title='First Name' className='text-mc-secondary' />
  //   ),
  //   id: 'first_name',
  //   Cell: ({...props}) => (
  //     <BadgeCell color='mc-secondary' status={props.data[props.row.index].first_name} />
  //   ),
  // },
]

export { ActivityMembersColumns };
