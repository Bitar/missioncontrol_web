import React, {FC} from 'react'

type Props = {
  text: string
  isSubmitting: boolean
}

const FormAction: FC<React.PropsWithChildren<Props>> = ({text, isSubmitting}) => {
  return (
    <>
      <div className='card-footer d-flex justify-content-end py-6 px-9'>
        <button
          type='submit'
          className='btn btn-light-mc-secondary btn-active-mc-secondary btn-sm'
          data-kt-users-modal-action='submit'
        >
          <span className='indicator-label'>{text}</span>
          {isSubmitting && (
            <span className='indicator-progress'>
              Please wait... <span className='spinner-border spinner-border-sm align-middle ms-2' />
            </span>
          )}
        </button>
      </div>
    </>
  )
}

export {FormAction}
