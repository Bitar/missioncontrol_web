import {Link} from "react-router-dom";
import {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

type Props = {
    name: string,
    url: string,
    showAdd?: boolean
}

const TableListToolbar: FC<Props> = ({name, url, showAdd}) => {
    return (
        <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
            {/* begin::Export */}
            {/*<button type='button' className='btn btn-light-primary me-3'>*/}
            {/*    <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>*/}
            {/*    Export*/}
            {/*</button>*/}
            {/* end::Export */}

            {showAdd &&
                <Link to={url + '/create'} className="btn-icon btn btn-primary">
                    <FontAwesomeIcon icon={faPlus} className={'fs-2'} />
                </Link>
            }

        </div>
    )
}

export {TableListToolbar}
