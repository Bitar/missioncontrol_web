import {Link, useLocation} from 'react-router-dom'
import {FC, useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import Moment from 'moment'
import {useUser} from './core/UserContext'

const UserInfo: FC = () => {
  const {user} = useUser()
  const location = useLocation()
  const [image, setImage] = useState<string>('')

  useEffect(() => {
    if (user?.meta?.image && user?.meta?.image !== '') {
      setImage(user?.meta?.image)
    } else {
      setImage(toAbsoluteUrl('/media/svg/avatars/blank.svg'))
    }
  }, [user?.meta?.image])

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <img alt={user?.name} src={image} />
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <div className='text-gray-800 fs-2 fw-bolder me-1'>{user?.name}</div>
                  </div>

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    {user?.meta?.username && (
                      <div className='d-flex align-items-center text-gray-400 me-5 mb-2'>
                        <KTSVG
                          path='/media/icons/duotune/communication/com006.svg'
                          className='svg-icon-4 me-1'
                        />
                        {user?.meta?.username + '#' + user?.meta?.rng}
                      </div>
                    )}
                    <a
                      href='mailto:`{community.contact?.email}`'
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTSVG
                        path='/media/icons/duotune/communication/com011.svg'
                        className='svg-icon-4 me-1'
                      />
                      {user?.email}
                    </a>
                    {user?.created_at && (
                      <div className='d-flex align-items-center text-gray-400 mb-2'>
                        <KTSVG
                          path='/media/icons/duotune/general/gen014.svg'
                          className='svg-icon-4 me-1'
                        />
                        since {Moment(user.created_at * 1000).format('MMM D, YYYY')}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/*<div className='d-flex flex-wrap flex-stack'>*/}
              {/*    <div className='d-flex flex-column flex-grow-1 pe-8'>*/}
              {/*        <div className='d-flex flex-wrap'>*/}
              {/*            <div className='d-flex text-gray-600  mb-1'>*/}
              {/*                description*/}
              {/*            </div>*/}
              {/*        </div>*/}
              {/*    </div>*/}
              {/*</div>*/}
            </div>
          </div>

          <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/users/' + user?.id + '/overview' && 'active')
                  }
                  to={'/users/' + user?.id + '/overview'}
                >
                  Overview
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/users/' + user?.id + '/activity' && 'active')
                  }
                  to={'/users/' + user?.id + '/activity'}
                >
                  Activities
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/users/' + user?.id + '/teams' && 'active')
                  }
                  to={'/users/' + user?.id + '/teams'}
                >
                  Teams
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/users/' + user?.id + '/settings' && 'active')
                  }
                  to={'/users/' + user?.id + '/settings'}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export {UserInfo}
