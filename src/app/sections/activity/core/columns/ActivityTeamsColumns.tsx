import {Column} from 'react-table'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import React from 'react'
import {BadgeCell} from '../../../../modules/table/columns/BadgeCell'
import {getTeamStatus, Team} from '../../../../models/squad/Team'
import {User} from '../../../identity/user/models/User'

const ActivityTeamsColumns: ReadonlyArray<Column<Team>> = [
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
                src={props.data[props.row.index].image}
              />
            </div>
            <span className='pe-none mb-1'>{props.data[props.row.index].name}</span>
          </span>
        </div>
      </div>
    )
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Players' />,
    id: 'players',
    Cell: ({...props}) =>
      props.data[props.row.index].users?.map((user: User) => (
        <div key={`standing-user-${user.id}`} className='d-flex align-items-center mb-2'>
          <div className='symbol symbol-circle me-3 symbol-30px'>
            {user?.id === props.data[props.row.index].captain_id && (
              <span className='position-absolute w-100 text-center fs-6' style={{top: '-15px'}}>
                <i className='fas fa-crown text-warning'></i>
              </span>
            )}
            <img src={user?.meta?.image} alt={user?.name + ' profile image'} />
          </div>
          <div className='d-flex flex-column'>
            <span className='text-gray-800 mb-1'>{user?.name}</span>
          </div>
        </div>
      )),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Team Status' />,
    id: 'team_status',
    Cell: ({...props}) => {
      const {status, color} = getTeamStatus(props.data[props.row.index].status)
      return <BadgeCell status={status} color={color} />
    },
  },
]

export {ActivityTeamsColumns}
