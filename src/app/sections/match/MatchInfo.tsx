import React, {Dispatch, FC, SetStateAction, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {formatMatchStatus} from '../../helpers/ActivityHelper'
import {Match} from '../activity/models/matches/Match'
import {
  calculateTeamScore,
  getDateFromTimestamp,
  getTimeFromTimestamp,
} from '../../helpers/MCHelper'
import {KTCard, KTCardBody, KTSVG} from '../../helpers/components'
import clsx from 'clsx'
import {TeamImage} from '../activity/components/TeamImage'
import {isWinner} from '../../helpers/MatchHelper'
import {BadgeCell} from '../../modules/table/columns/BadgeCell'
import {rejectMatchDispute, updateMatchResult} from './core/MatchRequests'
import toast from 'react-hot-toast'
import {useActivity} from '../activity/core/contexts/ActivityContext'
import {ScoreSettings} from './partials/ScoreSettings'

type Props = {
  match: Match | undefined
  setMatch: Dispatch<SetStateAction<Match | undefined>>
}

const MatchInfo: FC<Props> = ({match, setMatch}) => {
  const location = useLocation()
  const {activity} = useActivity()
  const [isDisputeApproved, setIsDisputeApproved] = useState<boolean>(false)
  const navigate = useNavigate()

  const getStatus = (matchStatus: any) => {
    return formatMatchStatus(matchStatus)
  }

  const links = [
    {
      text: 'Overview',
      link: '/activities/' + match?.activity?.id + '/matches/' + match?.id + '/overview',
    },
    {
      text: 'Chat',
      link: '/activities/' + match?.activity?.id + '/matches/' + match?.id + '/chat',
    },
    {
      text: 'Settings',
      link: '/activities/' + match?.activity?.id + '/matches/' + match?.id + '/settings',
    },
  ]

  // const makeWinner = (match: Match, teamId: any) => {
  //   const formData = new FormData()
  //   formData.append('_method', 'PUT')
  //   formData.append('team_winner', teamId)
  //
  //   updateMatchResult(match?.id, formData).then((response) => {
  //     setMatch(response)
  //   })
  // }

  const rejectDispute = () => {
    setIsDisputeApproved(false)
    rejectMatchDispute(match?.id).then((response) => {
      setMatch(response)
      toast.error('Match dispute rejected!')
    })
  }

  return (
    <>
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
                    isWinner={isWinner(match, match?.teams[0]?.id)}
                  />
                </div>
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
                    {calculateTeamScore(match, match?.teams[0])}
                  </div>
                  <div className='fs-6 fw-semibold text-gray-600 px-5'>
                    <p className='m-0'>{getTimeFromTimestamp(match?.start_date)}</p>
                    <p className='mb-1'>{getDateFromTimestamp(match?.start_date)}</p>
                    <p className='m-0'>
                      <span className={'badge badge-' + getStatus(match?.status)['color']}>
                        {getStatus(match?.status)['status']}
                      </span>
                    </p>
                  </div>
                  <div className='display-1 text-mc-primary'>
                    {calculateTeamScore(match, match?.teams[1])}
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
                    isWinner={isWinner(match, match?.teams[1]?.id)}
                  />
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
                  <button
                    onClick={() =>
                      navigate(
                        '/activities/' + activity?.id + '/matches/' + match?.id + '/settings'
                      )
                    }
                    type='button'
                    className='btn btn-sm btn-success'
                  >
                    Approve
                  </button>
                  <button
                    onClick={rejectDispute}
                    type='button'
                    className='btn btn-sm btn-danger ms-3'
                  >
                    Reject
                  </button>
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
                  to={link.link}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </KTCardBody>
      </KTCard>

      {/*{isDisputeApproved && activity?.settings?.rounds && <MatchDispute match={match} />}*/}
    </>
  )
}

export {MatchInfo}
