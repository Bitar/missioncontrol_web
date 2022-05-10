// import {useListView} from '../../core/ListViewProvider'
// import {UsersListToolbar} from './UserListToolbar'
// import {UsersListGrouping} from './UsersListGrouping'
// import {UsersListSearchComponent} from './UsersListSearchComponent'

import {useListView} from "../apps/user-management/users-list/core/ListViewProvider";
import {TableSearchComponent} from "./TableSearchComponent";
import {TableListGrouping} from "./TableListGrouping";
import {TableListToolbar} from "./TableListToolbar";

const TableHeader = () => {
    const {selected} = useListView()
    return (
        <div className='card-header border-0 pt-6'>
            <TableSearchComponent/>
            {/* begin::Card toolbar */}
            <div className='card-toolbar'>
                {/* begin::Group actions */}
                {selected.length > 0 ? <TableListGrouping/> : <TableListToolbar/>}
                {/* end::Group actions */}
            </div>
            {/* end::Card toolbar */}
        </div>
    )
}

export {TableHeader}
