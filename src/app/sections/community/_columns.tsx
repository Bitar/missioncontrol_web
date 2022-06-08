import {Column} from 'react-table'
import {TextCell} from "../../modules/table/columns/TextCell";
import {CustomHeader} from "../../modules/table/columns/CustomHeader";
import {QUERIES} from "../../../_metronic/helpers";
import {ImageCell} from "../../modules/table/columns/ImageCell";
import {Community} from "../../models/community/Community";
import { ViewsCell } from '../../modules/table/columns/ViewsCell';

const communitiesColumns: ReadonlyArray<Column<Community>> = [
    {
        Header: (props) =>
            <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) =>
            <CustomHeader tableProps={props} title='Logo' className='min-w-125px'/>,
        id: 'logo',
        Cell: ({...props}) => <ImageCell dObject={props.data[props.row.index].logo}/>,
    },
    {
        Header: (props) =>
            <CustomHeader tableProps={props} title='Is Featured' className='min-w-125px'/>,
        id: 'is_featured',
        Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].is_featured ? 'Yes' : 'No'}/>,
    },

    {
        Header: (props) =>
            <CustomHeader tableProps={props} title='Description' className='min-w-125px'/>,
        id: 'description',
        Cell: ({...props}) => <TextCell dObject={props.data[props.row.index].description}/>
    },
     {
         Header: (props) => (
             <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
         ),
        id: 'actions',
         Cell: ({...props}) => <ViewsCell id={props.data[props.row.index].id} path={'community'}
                                            queryKey={QUERIES.COMMUNITIES_LIST}/>,
     },
]

export {communitiesColumns}
