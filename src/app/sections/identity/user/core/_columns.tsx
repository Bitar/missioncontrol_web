import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {User} from '../models/User'
import {Link} from 'react-router-dom'
import {Role} from '../../role/models/Role'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <>
          <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
            <Link to={`/users/${props.data[props.row.index].id}`}>
              <div className='symbol-label'>
                {props.data[props.row.index]?.meta?.image && (
                  <img
                    src={toAbsoluteUrl(props.data[props.row.index]?.meta?.image)}
                    alt='Emma Smith'
                    className='w-100'
                  />
                )}
              </div>
            </Link>
          </div>
          <div className='d-flex flex-column'>
            <Link
              to={`/users/${props.data[props.row.index].id}`}
              className='text-gray-800 text-hover-primary mb-1'
            >
              {props.data[props.row.index].name}
            </Link>
            <span>{props.data[props.row.index].email}</span>
          </div>
        </>
      </div>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Roles' className='min-w-125px' />,
    id: 'roles',
    Cell: ({...props}) => (
      <>
        {props.data[props.row.index].roles?.map((role: Role) => (
          <TextCell key={role.id} dObject={role.name} />
        ))}
      </>
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Last Login' className='min-w-125px' />
    ),
    id: 'last_login',
    Cell: ({...props}) => (
      <div className='badge badge-light fw-bolder'>{props.data[props.row.index].created_at}</div>
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
        path={'users'}
        queryKey={QUERIES.USERS_LIST}
        showView={true}
        showEdit={false}
      />
    ),
  },
]

export {usersColumns}
