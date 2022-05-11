import {Column} from 'react-table'
import {TextCell} from "../../modules/table/columns/TextCell";
import {CustomHeader} from "../../modules/table/columns/CustomHeader";
import {ActionsCell} from "../../modules/table/columns/ActionsCell";
import {QUERIES} from "../../../_metronic/helpers";
import {Role} from "../../models/user/Role";
import {ImageCell} from "../../modules/table/columns/ImageCell";

const rolesColumns: ReadonlyArray<Column<Role>> = [
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='Image' className='min-w-125px'/>,
    id: 'image',
    Cell: ({...props}) => <ImageCell dObject={props.data[props.row.index].game?.image}/>,
  },
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
    id: 'name',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].name}/>,
  },
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='Status' className='min-w-125px'/>,
    id: 'status',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].status}/>,
  },
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='Dates' className='min-w-125px'/>,
    id: 'dates',
    Cell: ({...props}) => {
      var startDate = new Date(props.data[props.row.index].matchplay_dates.start_date).toDateString();
      var endDate = new Date(props.data[props.row.index].matchplay_dates.end_date).toDateString();

      return <TextCell dObject={startDate + " - " + endDate}/>
    },
  },
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='Fee' className='min-w-125px'/>,
    id: 'fee',
    Cell: ({...props}) => <TextCell
        dObject={props.data[props.row.index].entry_fee.amount ? ("$" + (props.data[props.row.index].entry_fee.amount / 100)) : 'Free'}/>,
  },
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='Players' className='min-w-125px'/>,
    id: 'players',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].data.players_count}/>,
  },
  {
    Header: (props) => (
        <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} path={'roles'}
                                       queryKey={QUERIES.ROLES_LIST}/>,
  },
]

export {rolesColumns}
