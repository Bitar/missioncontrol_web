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
    queryKey: string
}

const ActionsCell: FC<Props> = ({id, path, queryKey}) => {
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
            <Link to={'/' + path + '/' + id + '/edit'} className="btn btn-icon btn-sm btn-active-light-warning">
                <i className="fa-solid fa-pencil text-warning"/>
            </Link>

            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className='btn btn-icon btn-sm btn-active-light-danger'
               onClick={async () => await deleteItem.mutateAsync()}>
                <i className="fa-solid fa-trash text-danger"/>
            </a>
            {/* end::Menu */}
        </>
    )
}

export {ActionsCell}
