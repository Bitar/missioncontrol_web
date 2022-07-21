import {Column} from 'react-table'
import {TextCell} from "../../modules/table/columns/TextCell";
import {CustomHeader} from "../../modules/table/columns/CustomHeader";
import {ActionsCell} from "../../modules/table/columns/ActionsCell";
import {QUERIES} from "../../../_metronic/helpers";
import {ImageCell} from "../../modules/table/columns/ImageCell";
import {Activity} from "../../models/activity/Activity";
import {BadgeCell} from "../../modules/table/columns/BadgeCell";
import {formatDates, formatStatus} from "../../helpers/ActivityHelper";

const activitiesColumns: ReadonlyArray<Column<Activity>> = [
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='Game Cover' className='min-w-125px'/>,
    id: 'image',
    Cell: ({...props}) => <ImageCell dObject={props.data[props.row.index].game?.image}/>,
  },
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='Title' className='min-w-125px'/>,
    id: 'title',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].title}/>,
  },
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='Status' className='min-w-125px'/>,
    id: 'status',
    Cell: ({...props}) => {
      const {status, color} = formatStatus(props.data[props.row.index].status)
      return <BadgeCell status={status} color={color}/>
    },
  },
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='Dates' className='min-w-200px'/>,
    id: 'dates',
    Cell: ({...props}) => {
      const {startDate, endDate} = formatDates(props.data[props.row.index].matchplay_dates)
      return <TextCell dObject={startDate + " - " + endDate}/>
    },
  },
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='Fee' className='min-w-125px'/>,
    id: 'fee',
    Cell: ({...props}) => <TextCell
        dObject={props.data[props.row.index].entry_fee?.amount ? ("$" + (props.data[props.row.index].entry_fee?.amount / 100)) : 'Free'}/>,
  },
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='Players' className='min-w-125px'/>,
    id: 'players',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].data?.players_count}/>,
  },
  {
    Header: (props) =>
        <CustomHeader tableProps={props} title='# of Teams' className='min-w-125px'/>,
    id: 'teams',
    Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].data?.teams_count}/>,
  },
  {
    Header: (props) => (
        <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} path={'activities'}
                                       queryKey={QUERIES.ACTIVITIES_LIST}/>,
  },
]

export {activitiesColumns}
