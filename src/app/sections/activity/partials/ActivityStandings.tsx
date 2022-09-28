import React, {FC} from 'react'
import {ID, KTCard, KTCardBody, toAbsoluteUrl} from '../../../../_metronic/helpers'
import clsx from 'clsx'
import {useActivity} from '../ActivityContext'

type Props = {
  minimal?: boolean
  scroll?: boolean
}

const ActivityStandings: FC<Props> = ({minimal = false, scroll = false}) => {
  const {activity} = useActivity()
  const getTeam = (teamId: ID) => {
    return activity?.teams?.filter(function (e: any) {
      return e.id === teamId
    })[0]
  }

  return (
    <>
      <KTCard>
        <div className='card-header bg-info' id='activities_standings_header'>
          <div className='card-title'>
            <h3 className='card-label text-white'>Standings</h3>
          </div>
        </div>
        <KTCardBody
          className={clsx('py-1', {'scroll-y mh-400px': scroll})}
          id='activities_standings_body'
        >
          <div className='table-responsive'>
            <table
              className='table align-middle table-row-bordered fs-6 gy-5 dataTable no-footer'
              role='table'
            >
              <thead>
                <tr className='text-start text-muted fw-bolder fs-6 text-uppercase gs-0'>
                  <th colSpan={2}>Team</th>
                  {!minimal && <th colSpan={1}>Players</th>}
                  <th colSpan={1}>M</th>
                  <th colSpan={1}>W - L</th>
                  <th colSpan={1}>W %</th>
                </tr>
              </thead>
              <tbody className='text-gray-600 fw-bold'>
                {activity?.standings?.length && activity?.standings?.length > 0 ? (
                  activity?.standings?.map((standing, i) => (
                    <tr key={`standing-header-${i}`}>
                      <td colSpan={2}>
                        <div className='d-flex align-items-center'>
                          <div
                            className={clsx(
                              'symbol symbol-circle me-3',
                              {'symbol-30px': minimal},
                              {'symbol-100px': !minimal}
                            )}
                          >
                            <img
                              src={toAbsoluteUrl(standing.team?.image)}
                              alt={standing.team?.name + ' team image'}
                            />
                          </div>
                          <div className='d-flex flex-column'>
                            <span className='text-gray-800 mb-1'>{standing.team?.name}</span>
                          </div>
                        </div>
                      </td>
                      {!minimal && (
                        <td colSpan={1}>
                          {getTeam(standing?.team?.id)?.users?.map((user) => (
                            <div
                              key={`standing-user-${user.id}`}
                              className='d-flex align-items-center mb-2'
                            >
                              <div className='symbol symbol-circle me-3 symbol-30px'>
                                <img src={user?.meta?.image} alt={user?.name + ' profile image'} />
                              </div>
                              <div className='d-flex flex-column'>
                                <span className='text-gray-800 mb-1'>{user?.name}</span>
                              </div>
                            </div>
                          ))}
                        </td>
                      )}

                      <td>{standing.score?.win + standing.score?.lose}</td>
                      <td>{standing.score?.win + ' - ' + standing.score?.lose}</td>
                      <td>
                        {standing.score?.win + standing.score?.lose !== 0
                          ? Math.round((standing.score?.win / (standing.score?.win + standing.score?.lose)) *
                            100)
                          : 0}
                        %
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                        No records found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {ActivityStandings}
