import React, {FC, useEffect, useState} from 'react'
import clsx from 'clsx'
import {getAdminCommunities, setAdminCommunities} from './_requests'
import {Community} from '../../../sections/community/models/Community'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../../modules/auth'

let communityObj: any[] | undefined = []

const CommunityPicker: FC<React.PropsWithChildren<unknown>> = () => {
  const [communityAdmins, setCommunityAdmins] = useState<Community[] | undefined>()
  const {communityAdmin, setCommunityAdmin} = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (communityObj && communityObj?.length === 0) {
      getAdminCommunities().then((response) => {
        communityObj = response?.data
        setCommunityAdmins(communityObj)
      })
    } else {
      setCommunityAdmins(communityObj)
    }
  }, [communityAdmin])

  const setCommunity = (community: Community) => {
    setAdminCommunities(community.id).then(() => {
      setCommunityAdmin(community)
      navigate('/dashboard/overview')
    })
  }

  return (
    <div>
      {communityAdmins && communityAdmins?.length > 0 && (
        <div className='w-30px h-30px w-md-40px h-md-40px'>
          <div
            className='btn btn-icon btn-icon-muted btn-active-mc-primary btn-active-color-mc-secondary w-30px h-30px w-md-40px h-md-40px'
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            <i className='fa fa-people-group fs-2' />
          </div>

          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-bold py-4 fs-6 w-400px'
            data-kt-menu='true'
          >
            {communityAdmins?.map((community, i) => (
              <div className='menu-item px-3 my-1' key={`row-${i}-${community.id}`}>
                <span
                  onClick={() => {
                    setCommunity(community)
                  }}
                  className={clsx('menu-link px-3', {active: communityAdmin?.id === community?.id})}
                >
                  <img src={community.logo} alt='' className='w-40px me-2 d-inline-block' />
                  <span className='menu-title'>{community.name}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export {CommunityPicker}
