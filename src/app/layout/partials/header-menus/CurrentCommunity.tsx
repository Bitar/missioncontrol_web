import React from 'react'
import {useAuth} from '../../../modules/auth'
import {useLocation, useParams} from 'react-router-dom'

const CurrentCommunity = () => {
  const {communityAdmin} = useAuth()

  return (
    <div className='d-flex align-items-center'>
      {communityAdmin && (
        <>
          <div className='symbol symbol-circle symbol-40px me-3'>
            <img src={communityAdmin?.logo} alt={communityAdmin?.name + ' community image'} />
          </div>
          <span className='text-gray-800'>{communityAdmin?.name}</span>
        </>
      )}
    </div>
  )
}

export {CurrentCommunity}
