import React, {FC} from 'react'
import {useAuth} from '../../modules/auth'
import {isCommunityAdmin, isSuperAdmin} from '../../models/iam/User'
import {CommunityView} from '../../sections/community/pages/CommunityView'
import {CreateCommunityWidget} from '../../layout/widgets/CreateCommunityWidget'
import {SuperAdmin} from './partials/SuperAdmin'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const DashboardWrapper: FC<React.PropsWithChildren<unknown>> = () => {
  const {currentUser, communityAdmin} = useAuth()

  const communityLinks = [
    {
      text: 'Overview',
      link: '/dashboard/overview',
    },
    {
      text: 'Members',
      link: '/dashboard/members',
    },
  ]

  return (
    <>
      {currentUser &&
        (currentUser && isCommunityAdmin(currentUser) && communityAdmin ? (
          <CommunityView communityId={communityAdmin?.id} links={communityLinks}></CommunityView>
        ) : (
          <div className='row gy-5 g-xl-8'>
            <div className='col-xl-12'>
              {!communityAdmin && !isSuperAdmin(currentUser) ? (
                <>
                  <div className='row'>
                    <div className='col-xl-6'>
                      <CreateCommunityWidget bgHex={'#FFFFFF'} type='create-community' />
                    </div>
                    <div className='col-xl-6'>
                      <div className={`card bg-mc-secondary text-white`} >
                        <div className={`content d-flex flex-column flex-column-fluid" id="kt_content`}>
                          <div className='post d-flex flex-column-fluid' id='kt_post'>
                            <div id='kt_content_container' className='container-xxl'>
                              <div className='card-body pt-0'>
                                <div className='card-px text-center py-10'>
                                  <h2 className='fs-2x fw-bolder mb-10 text-white'>Join A Community</h2>
                                  <p className='fs-4 fw-bold mb-10'>
                                    Players can join a community by downloading our mobile app
                                  </p>
                                  <div className='text-center px-4 mb-10'>
                                    <img
                                      className='mw-100 mh-300px'
                                      alt=''
                                      src={toAbsoluteUrl(`/media/marketing/mockview.png`)}
                                    />
                                  </div>
                                  <a href='https://apps.apple.com/us/app/mission-control-gg/id1477441476' target='_blank' className='btn btn-mc-primary fw-semibold' rel='noreferrer'>
                                    <i className='fab fa-apple'></i> Download on App Store
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                isSuperAdmin(currentUser) && <SuperAdmin />
              )}
            </div>
          </div>
        ))}
    </>
  )
}

export { DashboardWrapper };
