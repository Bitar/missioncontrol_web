import React, {FC} from 'react'
import {KTCardFooter} from '../components'
import {useFormikContext} from 'formik'

type Props = {
  text: string
  isSubmitting?: boolean
}

const FormAction: FC<Props> = ({text}) => {
  // const {isSubmitting} = useFormikContext()
  return (
    <KTCardFooter className='card-footer d-flex justify-content-end py-6 px-9'>
      <button
        type='submit'
        className='btn btn-mc-secondary btn-active-mc-secondary btn-sm'
        // disabled={isSubmitting}
      >
        <span className='indicator-label'>{text}</span>
        {/*// {isSubmitting && (*/}
        <span className='indicator-progress' style={{display: 'inline-block'}}>
          <span className='spinner-border spinner-border-sm align-middle ms-2' />
        </span>
        {/*// )}*/}
      </button>
    </KTCardFooter>
  )
}

export {FormAction}
