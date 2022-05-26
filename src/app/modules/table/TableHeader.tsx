// import {useListView} from '../../core/ListViewProvider'
// import {UsersListToolbar} from './UserListToolbar'
// import {UsersListGrouping} from './UsersListGrouping'
// import {UsersListSearchComponent} from './UsersListSearchComponent'

// import {TableSearchComponent} from "./TableSearchComponent";
// import {TableListGrouping} from "./TableListGrouping";
import {TableListToolbar} from "./TableListToolbar";
import {FC} from "react";
import {TableSearchComponent} from "./TableSearchComponent";
// import {useListView} from "./ListViewProvider";

type Props = {
    name: string,
    url: string,
    showAdd?: boolean
}


const TableHeader: FC<Props> = ({name, url, showAdd = true}) => {
    // const {selected} = useListView()
    return (
        <div className='card-header border-0 pt-6'>
            <TableSearchComponent/>
            {/* begin::Card toolbar */}
            <div className='card-toolbar'>
                {/* begin::Group actions */}
                <TableListToolbar name={name} url={url} showAdd={showAdd}/>
                {/*{selected.length > 0 ? <TableListGrouping/> : <TableListToolbar/>}*/}
                {/* end::Group actions */}
            </div>
            {/* end::Card toolbar */}
        </div>
    )
}

export {TableHeader}
