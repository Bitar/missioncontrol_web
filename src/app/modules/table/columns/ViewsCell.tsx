/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {ID, stringifyRequestQuery} from "../../../../_metronic/helpers";
import {MenuComponent} from "../../../../_metronic/assets/ts/components";
import {Link} from "react-router-dom";
import {useMutation, useQueryClient} from "react-query";
import {deleteObject} from "../../../requests";
import {useQueryRequest} from "../QueryRequestProvider";

type Props = {
    id: ID,
    path: string,
    queryKey: string,
    showView?: boolean,
}

const ViewsCell: FC<Props> = ({id, path, queryKey, showView = true}) => {
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
                <Link to={'/' + path + '/' + id + '/view'} className="btn btn-icon btn-sm btn-active-light-warning">
                    <i className="fa-solid fa-image text-warning"/>
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
