import toast, {Toaster, ToastPosition} from "react-hot-toast";
import React, {FC} from "react";


const MCToaster: FC = () => {
    return (
        <>
            <Toaster
                position={'top-right'}
                toastOptions={{
                    duration: 3000,

                    success: {
                        className: 'bg-success text-light',
                    },

                    error: {
                        className: 'bg-danger text-light',
                    },
                }}
            />
        </>
    )
}

const notifySuccess = (text: string) => {
    toast.success(text)
}

const notifyErrpr = (text: string) => {
    toast.success(text)
}

export {MCToaster}