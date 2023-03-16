import React from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

interface Props {
  cancelUrl: string
  loading?: boolean
  useSeparator?: boolean
}

const McFormFooter: React.FC<Props> = ({cancelUrl, loading = false, useSeparator = true}) => {
  return (
    <div className='d-flex justify-content-end'>
      <Link to={cancelUrl}>
        <Button variant='light-secondary' type='submit' size='sm'>
          Cancel
        </Button>
      </Link>

      <Button variant='mc-secondary' type='submit' className={'ms-2'} size='sm'>
        {!loading && 'Submit'}
        {loading && 'Please wait ...'}
      </Button>
    </div>
  )
}

export default McFormFooter
