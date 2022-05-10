import {KTSVG} from "../../../_metronic/helpers";
// import {useListView} from "../apps/user-management/users-list/core/ListViewProvider";

// import {UsersListFilter} from "../apps/user-management/users-list/components/header/UsersListFilter";
import {Link} from "react-router-dom";

const TableListToolbar = () => {
    // const {setItemIdForUpdate} = useListView()
    // const openAddUserModal = () => {
    //     setItemIdForUpdate(null)
    // }

    return (
        <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
            {/*<UsersListFilter />*/}

            {/* begin::Export */}
            <button type='button' className='btn btn-light-primary me-3'>
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>
                Export
            </button>
            {/* end::Export */}

            {/* begin::Add New */}
            <Link to="/roles/create" className="btn btn-primary">
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
                Add User
            </Link>
            {/* end::Add user */}
        </div>
    )
}

export {TableListToolbar}
