import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {KTCard, KTCardBody, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Match} from '../models/matches/Match'
import {getActivityMatches} from '../core/ActivityRequests'
import {getDateFromTimestamp, getTimeFromTimestamp} from '../../../helpers/MCHelper'
import {Activity} from '../models/Activity'

let matchesLoaded = false

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity | undefined>>
}

const ActivityMatches: FC<Props> = ({activity, setActivity}) => {
  const [matches, setMatches] = useState<Match[] | undefined>([])
  const params = useParams()

  useEffect(() => {
    if (!matchesLoaded) {
      getActivityMatches(params.id).then((response) => {
        setMatches(response.data)
        matchesLoaded = true
        //TODO: Check this one
        // updateData(
        //   {
        //     matches: response.data,
        //   },
        //   setActivity,
        //   activity
        // )
      })
    }
  }, [params.id])

  const calculateTeamScore = (match: any, team: any) => {
    let totalScore = 0

    match?.rounds.forEach((round: any) => {
      let scores = round.scores

      scores.forEach((score: any) => {
        if (score.team_id === team.id) {
          totalScore += score.score
        }
      })
    })

    return totalScore
  }

  return (
    <>
      <KTCard>
        <div className='card-header'>
          <div className='card-title'>
            <h3 className='card-label'>Matches</h3>
          </div>
        </div>
        <KTCardBody className='py-5' id='activity_matches_body'>
          <div
            className={'scroll-y me-n5 pe-5 h-300px h-lg-auto'}
            data-kt-element='matches'
            data-kt-scroll='true'
            data-kt-scroll-activate='{default: false, lg: true}'
            data-kt-scroll-max-height='600px'
            data-kt-scroll-dependencies={
              '#kt_header, #kt_toolbar, #kt_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer'
            }
            data-kt-scroll-wrappers={'#kt_content, #activity_matches_body'}
            data-kt-scroll-offset={'-2px'}
          >
            <div className='d-flex flex-column'>
              {matches?.map((match) => (
                <React.Fragment key={match.id}>
                  <div className='d-flex flex-stack text-center'>
                    {match?.teams && match?.teams[0] && (
                      <div className='flex-grow-1'>
                        <div className='d-inline-block'>
                          <div className='symbol symbol-60px symbol-circle mb-3'>
                            <img
                              alt={match?.teams[0].name + ' team image'}
                              src={match?.teams[0].image}
                              className='mw-100px'
                            />
                          </div>
                          <div className='fs-6 fw-bold'>{match?.teams[0].name}</div>
                        </div>
                      </div>
                    )}
                    <div className='flex-shrink-1'>
                      <div className='fs-6 fw-semibold text-gray-600 px-5'>
                        <p className='m-0'>{getTimeFromTimestamp(match?.start_date)}</p>
                        <p className='m-0'>{getDateFromTimestamp(match?.start_date)}</p>
                      </div>
                    </div>
                    {match?.teams && match?.teams[1] && (
                      <div className='flex-grow-1'>
                        <div className='d-inline-block'>
                          <div className='symbol symbol-60px symbol-circle mb-3'>
                            <img
                              alt={match?.teams[1].name + ' team image'}
                              src={match?.teams[1].image}
                              className='mw-100px'
                            />
                          </div>
                          <div className='fs-6 fw-bold'>{match?.teams[1].name}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/*</div>*/}
                  <div className='separator my-3'></div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export { ActivityMatches };