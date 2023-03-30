import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Role} from '../../../../models/iam/Role'
import {useAccessControl} from '../../../../modules/auth/core/AuthPermission'

const RolesColumns: ReadonlyArray<Column<Role>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => {
      const accessControl = useAccessControl()

      return (
        <ActionsCell
          id={props.data[props.row.index].id}
          path={'iam/roles'}
          queryKey={QUERIES.ROLES_LIST}
          showEdit={accessControl.userCan('manage-iam')}
          editPage={true}
        />
      )
    },
  },
]

export default RolesColumns
