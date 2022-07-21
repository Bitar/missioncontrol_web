import {TableListToolbar} from "./TableListToolbar";
import {FC} from "react";
import {TableSearchComponent} from "./TableSearchComponent";

type Props = {
    name: string,
    url: string,
    showAdd?: boolean
}


const TableHeader: FC<Props> = ({name, url, showAdd = true}) => {
    return (
        <div className='card-header border-0 pt-6'>
            <TableSearchComponent/>
            <div className='card-toolbar'>
                <TableListToolbar name={name} url={url} showAdd={showAdd}/>
            </div>
        </div>
    )
}

export {TableHeader}
