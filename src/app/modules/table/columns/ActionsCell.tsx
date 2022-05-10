/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
// import {useMutation, useQueryClient} from 'react-query'
import {ID} from "../../../../_metronic/helpers";
// import {useListView} from "../../apps/user-management/users-list/core/ListViewProvider";
// import {useQueryResponse} from "../QueryResponseProvider";
import {MenuComponent} from "../../../../_metronic/assets/ts/components";
import {Link} from "react-router-dom";
import {useMutation, useQueryClient} from "react-query";
import {useQueryResponse} from "../QueryResponseProvider";
import {deleteObject} from "../../../requests";

type Props = {
    id: ID,
    path: string,
    queryKey: string
}

const ActionsCell: FC<Props> = ({id, path, queryKey}) => {
    // const {setItemIdForUpdate} = useListView()
    const {query} = useQueryResponse()
    const queryClient = useQueryClient()

    useEffect(() => {
        MenuComponent.reinitialization()
    }, [])

    const deleteItem = useMutation(() => deleteObject(path + '/' + id), {
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: () => {
            // ✅ update detail view directly
            console.log(queryKey);
            queryClient.invalidateQueries(queryKey)
        },
    })

    return (
        <>
            <Link to={path + '/' + id + '/edit'} className="btn btn-icon btn-sm btn-active-light-warning">
                <i className="fa-solid fa-pencil text-warning"/>
            </Link>

            <a className='btn btn-icon btn-sm btn-active-light-danger' onClick={async () => await deleteItem.mutateAsync()}>
                <i className="fa-solid fa-trash text-danger"/>
            </a>

            {/* end::Menu */}
        </>
    )
}

export {ActionsCell}
