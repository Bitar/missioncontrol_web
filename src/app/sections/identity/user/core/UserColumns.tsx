import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {User} from '../models/User'
import {Role} from '../../role/models/Role'
import {TextImageCell} from '../../../../modules/table/columns/TextImageCell'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)
const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => (
      <TextImageCell
        dImage={props.data[props.row.index]?.meta?.image}
        dText={props.data[props.row.index].name}
        link={`/users/${props.data[props.row.index].id}`}
        dExtraText={props.data[props.row.index].email}
      />
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
      <div className='badge badge-light fw-bolder'>
        {dayjs(new Date(props.data[props.row.index].created_at * 1000)).format('lll')}
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
        path={'users'}
        queryKey={QUERIES.USERS_LIST}
        showView={true}
        showEdit={false}
      />
    ),
  },
]

export {usersColumns}
