import React, {FC} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {formatMatchStatus} from '../../helpers/ActivityHelper'
import {Match} from '../activity/models/matches/Match'
import {
  calculateTeamScore,
  getDateFromTimestamp,
  getTimeFromTimestamp,
} from '../../helpers/MCHelper'
import {KTCardBody} from '../../../_metronic/helpers'
import {KTCard} from '../../../_metronic/helpers'
import clsx from 'clsx'

type Props = {
  match?: Match | undefined
}

const MatchInfo: FC<Props> = ({match}) => {
  const location = useLocation()

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
    // {
    //   text: 'Settings',
    //   link: '/activities/' + match?.activity?.id + '/matches/' + match?.id + '/settings',
    // },
  ]

  return (
    <>
      <KTCard className='mb-5 mb-xl-10 overflow-hidden'>
        <KTCardBody className='pb-0 pt-20'>
          <div className='d-flex flex-stack text-center mb-3'>
            {match?.teams && match?.teams[0] && (
              <div className='flex-grow-1'>
                <div className='d-inline-block'>
                  <div className='symbol symbol-100px symbol-circle mb-3'>
                    {match?.result?.winner?.team_id === match?.teams[0].id && (
                      <span className='position-absolute w-100 text-center ' style={{top: '-35px'}}>
                        <i className='fas fa-trophy text-warning display-6'></i>
                      </span>
                    )}

                    <img alt={match?.teams[0].name + ' team image'} src={match?.teams[0].image} />
                  </div>
                  <div className='fs-6 fw-bold'>{match?.teams[0].name}</div>
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
            {match?.teams && match?.teams[1] && (
              <div className='flex-grow-1'>
                <div className='d-inline-block'>
                  <div className='symbol symbol-100px symbol-circle mb-3'>
                    {match?.result?.winner?.team_id === match?.teams[1].id && (
                      <span className='position-absolute w-100 text-center ' style={{top: '-15px'}}>
                        <i className='fas fa-trophy text-warning display-6'></i>
                      </span>
                    )}
                    <img alt={match?.teams[1].name + ' team image'} src={match?.teams[1].image} />
                  </div>
                  <div className='fs-6 fw-bold'>{match?.teams[1].name}</div>
                </div>
              </div>
            )}
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
    </>
  )
}

export {MatchInfo}
