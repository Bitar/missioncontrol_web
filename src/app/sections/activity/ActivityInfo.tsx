import React, {FC} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {BadgeCell} from '../../modules/table/columns/BadgeCell'
import {formatActivityStatus} from '../../helpers/ActivityHelper'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import clsx from 'clsx'
import {useActivity} from './ActivityContext'

const ActivityInfo: FC = () => {
  dayjs.extend(utc)

  const {activity} = useActivity()
  const location = useLocation()

  const getStatus = (activityStatus: any) => {
    const {status, color} = formatActivityStatus(activityStatus)
    return <BadgeCell status={status} color={color} />
  }

  const links = [
    {
      text: 'Overview',
      link: '/activities/' + activity?.id + '/overview',
    },
    {
      text: `Matches`,
      link: '/activities/' + activity?.id + '/matches',
    },
    {
      icon: 'fa-solid fa-person',
      text: `Registrations (${activity?.additional_data?.players_count || 0})`,
      link: '/activities/' + activity?.id + '/registrations',
    },
    {
      icon: 'fa-solid fa-rocket',
      text: `Teams (${activity?.additional_data?.teams_count || 0})`,
      link: '/activities/' + activity?.id + '/teams',
    },
    {
      text: 'Chat',
      link: '/activities/' + activity?.id + '/chat',
    },
    // {
    //   text: 'Settings',
    //   link: '/activities/' + activity?.id + '/settings',
    // },
  ]

  return (
    <>
      <KTCard className='mb-5 mb-xl-10 overflow-hidden'>
        <KTCardBody>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div className='w-150px'>
                <img src={activity?.game?.image} alt={activity?.title} className='w-100' />
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex flex-wrap flex-stack'>
                <div className='d-flex flex-column justify-content-between align-items-start flex-wrap mb-2'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center mb-2'>
                      <div className='text-gray-800 fs-2 fw-bolder me-3'>{activity?.title}</div>
                      {getStatus(activity?.status)}
                    </div>
                    <div className='d-flex flex-wrap fw-semibold fs-6 mb-4 text-gray-400'>
                      {activity?.description}
                    </div>
                  </div>
                </div>
                <div className='d-flex flex-column justify-content-start'>
                  <div className='d-flex flex-wrap'>
                    {activity?.community && (
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <i className='fa fa-people-group text-mc-primary fs-2 me-2'></i>
                          <div className='fs-4 text-gray-400'>Community</div>
                        </div>
                        <div className='fw-semibold fs-6 fw-bold'>{activity?.community?.name}</div>
                      </div>
                    )}
                    {activity?.game_mode && (
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <i className='fa-solid fa-chess-board fs-2 me-2 text-mc-secondary'></i>
                          <div className='fs-4 text-gray-400'>Game Mode</div>
                        </div>
                        <div className='fw-semibold fs-6 fw-bold'>{activity?.game_mode?.name}</div>
                      </div>
                    )}
                  </div>
                  <div className='d-flex flex-wrap'>
                    {activity?.registration_dates && (
                      <div className='border border-gray-300 border-dashed rounded min-w-85px- py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fw-semibold fs-6 text-gray-400'>Registration Dates</div>
                        </div>
                        <div className='fs-4 fw-bold'>
                          <span>
                            {dayjs(new Date(activity?.registration_dates?.start_date * 1000))
                              .utc(false)
                              .format('DD MMM YY')}
                            <span className='mx-1'>
                              <i className='fa fa-arrow-circle-right text-mc-secondary'></i>
                            </span>
                            {dayjs(new Date(activity?.registration_dates?.end_date * 1000))
                              .utc(false)
                              .format('DD MMM YY')}
                          </span>
                        </div>
                      </div>
                    )}
                    {activity?.matchplay_dates && (
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fw-semibold fs-6 text-gray-400'>Match Play Dates</div>
                        </div>
                        <div className='fs-4 fw-bold'>
                          <span>
                            {dayjs(new Date(activity?.matchplay_dates?.start_date * 1000))
                              .utc(false)
                              .format('DD MMM YY')}
                            <span className='mx-1'>
                              <i className='fa fa-arrow-circle-right text-mc-secondary'></i>
                            </span>
                            {dayjs(new Date(activity?.matchplay_dates?.end_date * 1000))
                              .utc(false)
                              .format('DD MMM YY')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {activity?.teams && activity?.team_setting && activity?.team_setting?.max && (
                  <div className='d-flex flex-column justify-content-start'>
                    <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                      <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                        <span className='fw-bold fs-6 text-gray-400'>Activity Completion</span>
                        <span className='fw-bolder fs-6'>
                          {Math.round((activity?.teams?.length / activity?.team_setting?.max) * 100)}%
                        </span>
                      </div>
                      <div className='h-5px mx-3 w-100 bg-light mb-3'>
                        <div
                          className='bg-success rounded h-5px'
                          role='progressbar'
                          style={{
                            width: `${
                              Math.round((activity?.teams?.length / activity?.team_setting?.max) * 100)
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
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
                  {link.icon && (
                    <span>
                      {' '}
                      <i className={clsx('fs-4 me-2', link.icon)}></i>{' '}
                    </span>
                  )}
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

export { ActivityInfo };
