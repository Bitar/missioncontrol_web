import {Link, useLocation} from 'react-router-dom'
import React, {FC, useEffect, useState} from 'react'
import {KTCard, KTCardBody, KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import Moment from 'moment'
import {useUser} from '../core/UserContext'
import {useAccessControl} from '../../../../modules/auth/core/AuthPermission'
import clsx from 'clsx'
import {LinkType} from '../../../../helpers/LinkType'

const UserInfo: FC = () => {
  const managePermission = 'manage-iam'
  const {user} = useUser()
  const location = useLocation()
  const {userCan} = useAccessControl()
  const [image, setImage] = useState<string>('')

  useEffect(() => {
    if (user?.meta?.image && user?.meta?.image !== '') {
      setImage(user?.meta?.image)
    } else {
      setImage(toAbsoluteUrl('/media/svg/avatars/blank.svg'))
    }
  }, [user?.meta?.image])

  const links: LinkType[] = [
    {
      text: 'Overview',
      link: '/iam/users/' + user?.id,
    },
    {
      text: 'Activities',
      link: '/iam/users/' + user?.id + '/activities',
    },
    {
      text: 'Teams',
      link: '/iam/users/' + user?.id + '/teams',
    },
    {
      text: 'Settings',
      link: '/iam/users/' + user?.id + '/settings',
      isManage: true,
    },
  ]

  return (
    <>
      <KTCard className='mb-5 mb-xl-10 overflow-hidden'>
        <KTCardBody className='pt-9 pb-0'>
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
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
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
            </div>
          </div>
          <div className='separator mt-10' />
          <ul className='mc-nav nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder'>
            {links?.map((link, index) => (
              <li className='nav-item' key={index}>
                <Link
                  className={clsx(`nav-link py-5 me-6`, {active: location.pathname === link.link})}
                  to={link.link}>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {UserInfo}
