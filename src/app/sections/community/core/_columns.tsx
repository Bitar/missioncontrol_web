import {Column} from 'react-table'
import {TextCell} from "../../../modules/table/columns/TextCell";
import {CustomHeader} from "../../../modules/table/columns/CustomHeader";
import {ImageCell} from "../../../modules/table/columns/ImageCell";
import {Community} from "../models/Community";
import {QUERIES} from '../../../../_metronic/helpers';
import {ActionsCell} from "../../../modules/table/columns/ActionsCell";

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
            <CustomHeader tableProps={props} title='Actions' className='text-end min-w-125px'/>
        ),
        id: 'actions',
        Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} path={'communities'} showView={true}
                                           queryKey={QUERIES.COMMUNITIES_LIST}/>,
    },
]

export {communitiesColumns}
