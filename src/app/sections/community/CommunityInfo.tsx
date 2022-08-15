import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link, useLocation} from 'react-router-dom'
import {Community} from './models/Community'
import {FC, useEffect, useState} from 'react'

type Props = {
  community: Community | undefined
}

const CommunityInfo: FC<Props> = ({community}) => {
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
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
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
                          <KTSVG
                            path='/media/icons/duotune/communication/com006.svg'
                            className='svg-icon-4 me-1'
                          />
                          {community?.contact?.name}
                        </div>

                        <a
                          href='mailto:`{community.contact?.email}`'
                          className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                        >
                          <KTSVG
                            path='/media/icons/duotune/communication/com011.svg'
                            className='svg-icon-4 me-1'
                          />
                          {community?.contact?.email}
                        </a>
                      </>
                    )}

                    {community?.address && (
                      <div className='d-flex align-items-center text-gray-400 mb-2'>
                        <KTSVG
                          path='/media/icons/duotune/general/gen018.svg'
                          className='svg-icon-4 me-1'
                        />
                        {community?.address?.city}
                      </div>
                    )}
                  </div>
                </div>
                {/*<div className='card-toolbar'>*/}
                {/*  <Link className='btn btn-sm btn-primary' to='/activities/create'>*/}
                {/*    <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />*/}
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

          <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/communities/' + community?.id + '/overview' &&
                      'active')
                  }
                  to={'/communities/' + community?.id + '/overview'}
                >
                  Overview
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/communities/' + community?.id + '/activities' &&
                      'active')
                  }
                  to={'/communities/' + community?.id + '/activities'}
                >
                  Activities
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/communities/' + community?.id + '/members' && 'active')
                  }
                  to={'/communities/' + community?.id + '/members'}
                >
                  Members
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/communities/' + community?.id + '/settings' &&
                      'active')
                  }
                  to={'/communities/' + community?.id + '/settings'}
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

export {CommunityInfo}
