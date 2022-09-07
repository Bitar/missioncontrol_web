import {KTCard, KTCardBody, KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link, useLocation} from 'react-router-dom'
import {Community} from './models/Community'
import React, {FC, useEffect, useState} from 'react'
import clsx from 'clsx'

type Props = {
  community: Community | undefined
  links?: {text: string; link: string}[]
}

const CommunityInfo: FC<Props> = ({
  community,
  links = [
    {
      text: 'Overview',
      link: '/communities/' + community?.id + '/overview',
    },
    {
      text: 'Activities',
      link: '/activities',
    },
    {
      text: 'Members',
      link: '/communities/' + community?.id + '/members',
    },
    {
      text: 'Settings',
      link: '/communities/' + community?.id + '/settings',
    },
  ],
}) => {
  const location = useLocation()
  const [image, setImage] = useState<string>('')

  useEffect(() => {
    if (community?.logo) {
      if (community?.logo !== '') {
        setImage(community?.logo)
      }

      if (community?.logo.constructor.name === 'File') {
        // @ts-ignore
        let url = URL.createObjectURL(community?.logo)
        setImage(url)
      }
      // if(user?.meta?.image.constructor.name)
    } else {
      setImage(toAbsoluteUrl('/media/svg/avatars/blank.svg'))
    }
  }, [community])

  return (
    <KTCard className='mb-5 mb-xl-10 overflow-hidden'>
      <KTCardBody className='pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img src={image} alt={community?.name} />
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <div className='text-gray-800 fs-2 fw-bolder me-1'>{community?.name}</div>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  {community?.contact && (
                    <>
                      <div className='d-flex align-items-center text-gray-400 me-5 mb-2'>
                        <KTSVG path='/media/icons/duotune/com006.svg' className='svg-icon-4 me-1' />
                        {community?.contact?.name}
                      </div>

                      <a
                        href='mailto:`{community.contact?.email}`'
                        className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                      >
                        <KTSVG path='/media/icons/duotune/com011.svg' className='svg-icon-4 me-1' />
                        {community?.contact?.email}
                      </a>
                    </>
                  )}

                  {community?.address && (
                    <div className='d-flex align-items-center text-gray-400 mb-2'>
                      <KTSVG path='/media/icons/duotune/gen018.svg' className='svg-icon-4 me-1' />
                      {community?.address?.city}
                    </div>
                  )}
                </div>
              </div>
              {/*<div className='card-toolbar'>*/}
              {/*  <Link className='btn btn-sm btn-primary' to='/activity/create'>*/}
              {/*    <KTSVG path='/media/icons/duotune/arr075.svg' className='svg-icon-2' />*/}
              {/*    New Activity*/}
              {/*  </Link>*/}
              {/*</div>*/}
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='d-flex text-gray-600  mb-1'>{community?.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </KTCardBody>
      <div className='separator mt-10'></div>
      <KTCardBody className='p-0 rounded-3 rounded-bottom'>
        <ul className='nav nav-fill nav-line-tabs nav-line-tabs-2x fs-5 fw-bolder flex-nowrap text-center border-transparent'>
          {links.map((link, index) => (
            <li className='nav-item' key={index}>
              <Link
                className={clsx(
                  `m-0 nav-link bg-active-mc-secondary text-active-white border-active-mc-secondary border-hover-mc-secondary py-5 `,
                  {
                    active: location.pathname === link.link,
                  }
                )}
                to={link.link}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </KTCardBody>
    </KTCard>
  )
}

export {CommunityInfo}
