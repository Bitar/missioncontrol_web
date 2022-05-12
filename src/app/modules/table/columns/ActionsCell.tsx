import {FC, Suspense, useEffect} from 'react'
import {ID} from "../../../../_metronic/helpers";
import {MenuComponent} from "../../../../_metronic/assets/ts/components";
import {Link, Route, Routes} from "react-router-dom";
import {useMutation, useQueryClient} from "react-query";
import {deleteObject} from "../../../requests";
import {PermissionsEdit} from "../../../sections/user/permission/PermissionsEdit";
import {getCSSVariableValue} from "../../../../_metronic/assets/ts/_utils";
import TopBarProgress from "react-topbar-progress-indicator";

type Props = {
    id: ID,
    path: string,
    queryKey: string,
    object?: any
}

const components = {
    permission: PermissionsEdit,
}

const ActionsCell: FC<Props> = ({id, path, queryKey, object}) => {
    const queryClient = useQueryClient()

    useEffect(() => {
        MenuComponent.reinitialization()
    }, [])

    const deleteItem = useMutation(() => deleteObject(path + '/' + id), {
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: () => {
            // ✅ update detail view directly
            queryClient.invalidateQueries(queryKey)
        },
    })

    // console.log(object)
    //
    // function getComponent(text) {
    //     // @ts-ignore
    //     const EditComponent = components[text]
    //     return EditComponent
    // }


    return (
        <>
            <Link to={'/' + path + '/' + id + '/edit'} className="btn btn-icon btn-sm btn-active-light-warning">
                <i className="fa-solid fa-pencil text-warning"/>
            </Link>

            <a className='btn btn-icon btn-sm btn-active-light-danger' onClick={async () => await deleteItem.mutateAsync()}>
                <i className="fa-solid fa-trash text-danger"/>
            </a>
            {/* end::Menu */}
        </>
    )
}
//
// const SuspensedView: FC = ({children}) => {
//     const baseColor = getCSSVariableValue('--bs-primary')
//     TopBarProgress.config({
//         barColors: {
//             '0': baseColor,
//         },
//         barThickness: 1,
//         shadowBlur: 5,
//     })
//     return <Suspense fallback={<TopBarProgress/>}>{children}</Suspense>
// }

export {ActionsCell}
