/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {ID, stringifyRequestQuery} from "../../../../_metronic/helpers";
import {MenuComponent} from "../../../../_metronic/assets/ts/components";
import {Link} from "react-router-dom";
import {useMutation, useQueryClient} from "react-query";
import {deleteObject} from "../../../requests";
import {useQueryRequest} from "../QueryRequestProvider";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencil, faTrash, faEye} from '@fortawesome/free-solid-svg-icons'

type Props = {
    id: ID,
    path: string,
    queryKey: string,
    showEdit?: boolean,
    showDelete?: boolean
    showView?: boolean
}

const ActionsCell: FC<Props> = ({id, path, queryKey, showEdit = true, showDelete = true, showView = false}) => {
    const queryClient = useQueryClient()
    const {state} = useQueryRequest()
    const [query] = useState<string>(stringifyRequestQuery(state))

    useEffect(() => {
        MenuComponent.reinitialization()
    }, [])

    const deleteItem = useMutation(() => deleteObject(path + '/' + id), {
        onSuccess: () => {
            queryClient.invalidateQueries(`${queryKey}-${query}`)
        },
    })

    return (
        <>
            {showView &&
                <Link to={'/' + path + '/' + id} className="btn btn-icon btn-sm btn-active-light-dark">
                    <FontAwesomeIcon icon={faEye} className='text-dark'/>
                </Link>
            }

            {showEdit &&
                <Link to={'/' + path + '/' + id + '/edit'} className="btn btn-icon btn-sm btn-active-light-warning">
                    <FontAwesomeIcon icon={faPencil} className='text-warning'/>
                </Link>
            }

            {showDelete &&
                <a className='btn btn-icon btn-sm btn-active-light-danger'
                   onClick={async () => await deleteItem.mutateAsync()}>
                    <FontAwesomeIcon icon={faTrash} className='text-danger'/>
                </a>
            }
        </>
    )
}

export {ActionsCell}
