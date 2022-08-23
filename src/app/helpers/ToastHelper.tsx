import {Toaster} from 'react-hot-toast'
import React, {FC} from 'react'

const MCToaster: FC<React.PropsWithChildren<unknown>> = () => {
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

export {MCToaster}
