import React, {FC, useEffect, useState} from 'react'
import clsx from 'clsx'
import {getAdminCommunities, setAdminCommunities} from './_requests'
import {Community} from '../../../sections/community/models/Community'
import {ID} from '../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'

const CommunityPicker: FC<React.PropsWithChildren<unknown>> = () => {
  const [communityAdmin, setCommunityAdmin] = useState<Community[] | undefined>()

  const isActive = false
  const navigate = useNavigate()

  useEffect(() => {
    getAdminCommunities().then((response) => {
      setCommunityAdmin(response.data)
    })
  }, [])

  const setCommunity = (communityId: ID) => {
    setAdminCommunities(communityId).then(() => {
      navigate('/')
    })
  }

  return (
    <div>
      {communityAdmin && communityAdmin?.length > 0 && (
        <div className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'>
          <div
            className='btn btn-icon btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px'
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            <i className='fa-solid fa-sun fs-2' />
          </div>

          {communityAdmin?.map((community, i) => {
            return (
              <div
                className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-bold py-4 fs-6 w-400px'
                data-kt-menu='true'
                key={`row-${i}-${community.id}`}
              >
                <div className='menu-item px-3 my-1'>
                  <span
                    onClick={() => {
                      setCommunity(community.id)
                    }}
                    className={clsx('menu-link px-3', {active: isActive})}
                  >
                    <img src={community.logo} alt='' className='w-40px me-2 d-inline-block' />
                    <span className='menu-title'>{community.name}</span>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export {CommunityPicker}
