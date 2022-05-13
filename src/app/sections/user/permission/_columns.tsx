import {Column} from 'react-table'
import {TextCell} from "../../../modules/table/columns/TextCell";
import {CustomHeader} from "../../../modules/table/columns/CustomHeader";
import {ActionsCell} from "../../../modules/table/columns/ActionsCell";
import {QUERIES} from "../../../../_metronic/helpers";
import {Permission} from "../../../models/user/Permission";

const permissionColumns: ReadonlyArray<Column<Permission>> = [
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
    id: 'name',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].name}/>,
  },
  {
    Header: (props) => (
        <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id}
                                       path={'permissions'}
                                       queryKey={QUERIES.PERMISSIONS_LIST}
    />,
  },
]

export {permissionColumns}
