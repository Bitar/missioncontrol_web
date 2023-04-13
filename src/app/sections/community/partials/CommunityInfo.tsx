import {KTCard, KTCardBody, KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Link, useLocation} from 'react-router-dom'
import React, {FC, useEffect, useState} from 'react'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import {useCommunity} from '../core/CommunityContext'
import {BadgeCell} from '../../../modules/table/columns/BadgeCell'

type Props = {
  links?: {text: string; link: string}[]
}

const CommunityInfo: FC<Props> = ({links}) => {
  const {community} = useCommunity()
  const location = useLocation()
  const [image, setImage] = useState<string>('')

  const notify = async () => {
    if (community?.dynamic_link) {
      let toastText = 'Community Share link copied!'
      await navigator.clipboard.writeText(community?.dynamic_link)
      toast.success(toastText)
    }
  }

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
                  <BadgeCell
                    status={
                      community?.status === 1
                        ? 'Pending'
                        : community?.status === 2
                        ? 'Active'
                        : 'Closed'
                    }
                    color={
                      community?.status === 1
                        ? 'secondary'
                        : community?.status === 2
                        ? 'success'
                        : 'danger'
                    }
                  />
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  {community?.contact && (
                    <>
                      <div className='d-flex align-items-center text-gray-400 me-5 mb-2'>
                        <KTSVG path='/media/icons/duotune/com006.svg' className='svg-icon-4 me-1' />
                        {community?.contact?.name}
                      </div>

                      <a
                        href={`mailto:${community.contact?.email}`}
                        className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                        <KTSVG path='/media/icons/duotune/com011.svg' className='svg-icon-4 me-1' />
                        {community?.contact?.email}
                      </a>
                    </>
                  )}

                  {community?.address && (
                    <div className='d-flex align-items-center text-gray-400 me-5 mb-2'>
                      <KTSVG path='/media/icons/duotune/gen018.svg' className='svg-icon-4 me-1' />
                      {community?.address?.city}, {community?.address?.state?.code}
                    </div>
                  )}

                  {/*{community?.subscription?.plan?.id && community?.subscription?.plan?.id > 1 &&*/}
                  {/*  <div className="d-flex align-items-center text-gray-400 mb-2">*/}
                  {/*    <i className="fa-duotone fa-money-check-dollar me-1 fs-2"></i>*/}
                  {/*    <span className="me-1">Payment Status:</span>{" "}*/}
                  {/*    {getStatus(community?.subscription?.status)}*/}
                  {/*  </div>*/}
                  {/*}*/}
                </div>

                {community?.dynamic_link && (
                  <div className='d-flex my-4'>
                    <button type='button' className='btn btn-sm btn-mc-primary' onClick={notify}>
                      Community Share Link
                    </button>
                  </div>
                )}
              </div>
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
        <div className='separator mt-10'></div>
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
  )
}

export {CommunityInfo}
