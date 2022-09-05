import React, {FC} from 'react'
import {Activity} from './models/Activity'
import {Link, useLocation} from 'react-router-dom'
import {BadgeCell} from '../../modules/table/columns/BadgeCell'
import {formatActivityStatus} from '../../helpers/ActivityHelper'
import CountUp from 'react-countup'
import dayjs from "dayjs";

type Props = {
  activity: Activity | undefined
}

const ActivityInfo: FC<Props> = ({activity}) => {
  const location = useLocation()

  const getStatus = (activityStatus: any) => {
    const {status, color} = formatActivityStatus(activityStatus)
    return <BadgeCell status={status} color={color} />
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div className='w-150px'>
                <img src={activity?.game?.image} alt={activity?.title} className='w-100' />
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
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

              <div className='d-flex flex-wrap justify-content-start'>
                <div className='d-flex flex-wrap'>
                  {activity?.matchplay_dates &&
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <i className='fa fa-gamepad text-info fs-2 me-2'></i>
                        <div className='fs-4 fw-bold'>
                          {dayjs(new Date(activity?.matchplay_dates?.start_date * 1000)).format('ll')}
                          {/*29 Jan, 2022*/}
                        </div>
                      </div>
                      <div className='fw-semibold fs-6 text-gray-400'>Game Date</div>
                    </div>
                  }
                  {activity?.additional_data && (
                    <>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <i className='fab fa-steam text-mc-secondary fs-2 me-2'></i>

                          <div className='fs-4 fw-bold'>
                            <CountUp
                              useEasing={false}
                              end={activity?.additional_data?.players_count}
                            />
                          </div>
                        </div>
                        <div className='fw-semibold fs-6 text-gray-400'>Registrations</div>
                      </div>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <i className='fab fa-discord text-mc-primary fs-2 me-2'></i>

                          <div className='fs-4 fw-bold'>
                            <CountUp
                              useEasing={false}
                              end={activity?.additional_data?.teams_count}
                            />
                          </div>
                        </div>
                        <div className='fw-semibold fs-6 text-gray-400'>Teams</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='separator'></div>

          <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/activities/' + activity?.id + '/overview' && 'active')
                  }
                  to={'/activities/' + activity?.id + '/overview'}
                >
                  Overview
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/activities/' + activity?.id + '/members' && 'active')
                  }
                  to={'/activities/' + activity?.id + '/members'}
                >
                  Members
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/activities/' + activity?.id + '/teams' && 'active')
                  }
                  to={'/activities/' + activity?.id + '/teams'}
                >
                  Teams
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/activities/' + activity?.id + '/chat' && 'active')
                  }
                  to={'/activities/' + activity?.id + '/chat'}
                >
                  Chat
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/activities/' + activity?.id + '/settings' && 'active')
                  }
                  to={'/activities/' + activity?.id + '/settings'}
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

export { ActivityInfo };