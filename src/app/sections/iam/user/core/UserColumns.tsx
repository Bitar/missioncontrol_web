import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {User} from '../../../../models/iam/User'
import {Role} from '../../../../models/iam/Role'
import {TextImageCell} from '../../../../modules/table/columns/TextImageCell'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import {useAccessControl} from '../../../../modules/auth/core/AuthPermission'

dayjs.extend(localizedFormat)
const UsersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => (
      <TextImageCell
        dImage={props.data[props.row.index]?.meta?.image}
        dText={props.data[props.row.index].name}
        link={`/iam/users/${props.data[props.row.index].id}`}
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
    Header: (props) => <CustomHeader tableProps={props} title='Actions' className='min-w-100px' />,
    id: 'actions',
    Cell: ({...props}) => {
      const accessControl = useAccessControl()

      return (
        <ActionsCell
          id={props.data[props.row.index].id}
          path={'iam/users'}
          queryKey={QUERIES.USERS_LIST}
          showView={true}
          showEdit={accessControl.userCan('manage-iam')}
          showDelete={accessControl.userCan('delete-iam')}
          title='Delete User'
          text={`Are you sure you want to delete the user '${props.data[props.row.index].name}'?`}
        />
      )
    },
  },
]

export default UsersColumns
