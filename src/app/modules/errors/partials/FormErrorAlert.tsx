import React, {FC} from 'react'

type Props = {
  hasErrors: boolean | undefined
  message: string | undefined
}

const FormErrorAlert: FC<Props> = ({hasErrors, message}) => {
  return (
    <>
      {hasErrors === true && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{message}</div>
        </div>
      )}

      {hasErrors === false && (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>{message}</div>
        </div>
      )}
    </>
  )
}

export {FormErrorAlert}
