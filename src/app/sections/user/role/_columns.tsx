import {Column} from 'react-table'
import {User} from "../../../modules/apps/user-management/users-list/core/_models";
import {TextCell} from "../../../modules/table/columns/TextCell";
import {CustomHeader} from "../../../modules/table/columns/CustomHeader";
import {ActionsCell} from "../../../modules/table/columns/ActionsCell";
import {QUERIES} from "../../../../_metronic/helpers";

const rolesColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
    id: 'name',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index]}/>,
  },
  {
    Header: (props) => (
        <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} path={'roles'} queryKey={QUERIES.ROLES_LIST}/>,
  },
]

export {rolesColumns}
