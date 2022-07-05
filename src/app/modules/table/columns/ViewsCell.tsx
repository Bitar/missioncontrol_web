/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect } from 'react'
import {ID} from "../../../../_metronic/helpers";
import {MenuComponent} from "../../../../_metronic/assets/ts/components";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

type Props = {
    id: ID,
    path: string,
    queryKey: string,
    showView?: boolean,
}

const ViewsCell: FC<Props> = ({id, path,  showView = true}) => {
    
    useEffect(() => {
        MenuComponent.reinitialization()
    }, [])

    // const deleteItem = useMutation(() => deleteObject(path + '/' + id), {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(`${queryKey}-${query}`)
    //     },
    // })

    return (                
        <>                   
            {showView &&
                <Link to={'/' + path + '/' + id } className="btn btn-icon btn-sm btn-active-light-warning">
                     <FontAwesomeIcon icon={faEye} className='text-warning'/>
                </Link>
            }

            {/* {showDelete &&
                <a className='btn btn-icon btn-sm btn-active-light-danger'
                onClick={async () => await deleteItem.mutateAsync()}>
                <i className="fa-solid fa-trash text-danger"/>
                </a>
            } */}
        </>
    )
}

export {ViewsCell}
