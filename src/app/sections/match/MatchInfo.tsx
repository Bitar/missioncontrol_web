import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {formatMatchStatus} from '../../helpers/ActivityHelper'
import {KTCard, KTCardBody, KTSVG} from '../../helpers/components'
import clsx from 'clsx'
import {TeamImage} from '../activity/components/TeamImage'
import {approveMatchDispute, rejectMatchDispute} from './core/MatchRequests'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import {useMatch} from './core/MatchContext'
import {useActivity} from '../activity/core/contexts/ActivityContext'
import {MatchActions} from './partials/MatchActions'
import {DateTime} from 'luxon'

const MatchInfo = () => {
  const {activity} = useActivity()
  const {match, setMatch} = useMatch()
  const location = useLocation()

  const getStatus = (matchStatus: any) => {
    return formatMatchStatus(matchStatus)
  }

  const links = [
    {
      text: 'Overview',
      link: '/activities/' + activity?.id + '/matches/' + match?.id,
    },
    {
      text: 'Chat',
      link: '/activities/' + activity?.id + '/matches/' + match?.id + '/chat',
    },
    {
      text: 'Settings',
      link: '/activities/' + activity?.id + '/matches/' + match?.id + '/settings',
    },
  ]

  const rejectDispute = async () => {
    const {isConfirmed} = await Swal.fire({
      title: 'Are you sure to want to Reject dispute?',
      icon: 'error',
      showConfirmButton: true,
      showCancelButton: true,
    })

    if (isConfirmed) {
      rejectMatchDispute(match?.id).then((response) => {
        setMatch(response)
        toast.error('Match dispute rejected!')
      })
    }
  }

  const approveDispute = async () => {
    const {isConfirmed} = await Swal.fire({
      title: 'Are you sure to want to Approve dispute?',
      icon: 'success',
      showConfirmButton: true,
      showCancelButton: true,
    })

    if (isConfirmed) {
      approveMatchDispute(match?.id).then((response) => {
        setMatch(response)
        toast.success('Match dispute approved!')
      })
    }
  }

  return (
    <KTCard className='mb-5 mb-xl-10 overflow-hidden'>
      <KTCardBody className='pb-0 pt-20'>
        <div className='d-flex flex-stack text-center mb-3'>
          {match?.teams && match?.teams[0] ? (
            <div className='flex-grow-1'>
              <div className='d-inline-block'>
                <TeamImage
                  team={match?.teams[0]}
                  size='100px'
                  className='mb-3'
                  iconTop={'-21px'}
                  isWinner={match?.teams[0]?.result?.status === 1}
                />
              </div>

              {match?.teams[0]?.actions && match?.teams[0]?.actions?.length > 0 && (
                <>
                  <MatchActions actions={match?.teams[0].actions} />
                </>
              )}
            </div>
          ) : (
            <div className='flex-grow-1'>
              <div className='d-inline-block'>
                <TeamImage size='100px' className='mb-3' />
              </div>
            </div>
          )}

          {match?.teams && match?.teams[0] && match?.teams[1] && (
            <div className='flex-grow-1'>
              <div className='d-flex flex-stack'>
                <div className='display-1 text-mc-primary'>
                  {match?.teams[0]?.result?.total_score}
                </div>
                <div className='fs-6 fw-semibold text-gray-600 px-5'>
                  <p className='m-0'>
                    {DateTime.fromSeconds(match?.start_date).toFormat('hh:mm a ZZZZ')}
                  </p>
                  <p className='mb-1'>
                    {DateTime.fromSeconds(match?.start_date).toFormat('ccc, DD')}
                  </p>
                  <p className='m-0'>
                    <span className={'badge badge-' + getStatus(match?.status)['color']}>
                      {getStatus(match?.status)['status']}
                    </span>
                  </p>
                </div>
                <div className='display-1 text-mc-primary'>
                  {match?.teams[1]?.result?.total_score}
                </div>
              </div>
            </div>
          )}

          {match?.teams && match?.teams[1] ? (
            <div className='flex-grow-1'>
              <div className='d-inline-block'>
                <TeamImage
                  team={match?.teams[1]}
                  size='100px'
                  className='mb-3'
                  iconTop={'-21px'}
                  isWinner={match?.teams[1]?.result?.status === 1}
                />

                {match?.teams[1]?.actions && match?.teams[1]?.actions?.length > 0 && (
                  <>
                    <MatchActions actions={match?.teams[1].actions} />
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className='flex-grow-1'>
              <div className='d-inline-block'>
                <TeamImage size='100px' className='mb-3' />
              </div>
            </div>
          )}
        </div>

        {match?.dispute && (
          <div className='notice bg-light-warning rounded border-warning border border-dashed p-6'>
            <div className='d-flex'>
              <KTSVG
                path='/media/icons/duotune/gen044.svg'
                className='svg-icon-2tx svg-icon-warning me-4'
              />
              <div className='d-flex flex-grow-1'>
                <div className='fw-bold'>
                  <h4 className='text-gray-800 fw-bolder'>
                    {match?.dispute?.user?.name + ' has disputed!'}
                  </h4>
                  <div className='fs-6 text-gray-600'>
                    <span className='text-gray-700'>Reason: </span>
                    {match?.dispute?.message}
                  </div>
                </div>
              </div>
            </div>
            {match?.status !== 6 && match?.status !== 7 && (
              <div className='d-flex justify-content-center mt-3'>
                <div>
                  <button onClick={approveDispute} type='button' className='btn btn-sm btn-success'>
                    Approve
                  </button>
                  <button
                    onClick={rejectDispute}
                    type='button'
                    className='btn btn-sm btn-danger ms-3'>
                    Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
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

export {MatchInfo}
