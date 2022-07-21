import {KTSVG} from "../../../_metronic/helpers";
import {Link} from "react-router-dom";
import {FC} from "react";

type Props = {
    name: string,
    url: string,
    showAdd?: boolean
}

const TableListToolbar: FC<Props> = ({name, url, showAdd = true}) => {
    return (
        <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
            {/* begin::Export */}
            {/*<button type='button' className='btn btn-light-primary me-3'>*/}
            {/*    <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>*/}
            {/*    Export*/}
            {/*</button>*/}
            {/* end::Export */}

            {showAdd &&
                <Link to={url + '/create'} className="btn btn-primary">
                    <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
                    Add {name}
                </Link>
            }

        </div>
    )
}

export {TableListToolbar}
