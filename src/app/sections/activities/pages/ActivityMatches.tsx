import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {Match} from '../models/matches/Match'
import {getDateFromTimestamp, getTimeFromTimestamp} from '../../../helpers/MCHelper'

// let matchesLoaded = false

type Props = {
  matches: Match[] | undefined
}

const ActivityMatches: FC<Props> = ({matches}) => {
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

  function openMatches(element: Match) {
    return element.status !== 3
  }

  return (
    <>
      {/*<KTCard>*/}
      {/*  <KTCardBody>*/}
      {/*    <Tabs defaultActiveKey='home' id='noanim-tab-example' className='mb-3 flex-nowrap text-nowrap scroll-x' >*/}
      {/*      <Tab eventKey='home' title='Home'>*/}
      {/*        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, perferendis.*/}
      {/*      </Tab>*/}
      {/*      <Tab eventKey='profile' title='Profile'>*/}
      {/*        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius et impedit praesentium*/}
      {/*        quia repellat saepe. Beatae ipsam modi odit quis?*/}
      {/*      </Tab>*/}
      {/*      <Tab eventKey='contact' title='Contact'>*/}
      {/*        /!*<Sonnet />*!/*/}
      {/*        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium aut culpa*/}
      {/*        delectus distinctio, dolores earum est ipsum laborum nesciunt nobis quas quos,*/}
      {/*        repellendus reprehenderit sapiente sunt suscipit totam. Accusantium at beatae dolore,*/}
      {/*        exercitationem facere fugit id incidunt ipsam ipsum laboriosam, minima omnis pariatur*/}
      {/*        praesentium qui recusandae reprehenderit similique, sint.*/}
      {/*      </Tab>*/}
      {/*    </Tabs>*/}
      {/*  </KTCardBody>*/}
      {/*</KTCard>*/}
      <KTCard>
        <div className='card-header bg-mc-primary' id='activities_matches_header'>
          <div className='card-title'>
            <h3 className='card-label text-white'>Upcoming Matches</h3>
          </div>
        </div>
        <KTCardBody className='py-5' id='activity_matches_body'>
          <div
            className={'scroll-y me-n5 pe-5 h-300px h-lg-auto'}
            data-kt-element='matches'
            data-kt-scroll='true'
            data-kt-scroll-activate='{default: false, lg: true}'
            data-kt-scroll-max-height='600px'
            data-kt-scroll-dependencies={'#kt_header, #kt_toolbar, #kt_footer, #activities_matches_header'}
            data-kt-scroll-wrappers={'#kt_content, #activity_matches_body'}
            data-kt-scroll-offset={'-2px'}
          >
            <div className='d-flex flex-column'>
              {matches?.filter(openMatches).map((match) => (
                <React.Fragment key={match.id}>
                  <div className='d-flex flex-stack text-center'>
                    {match?.teams && match?.teams[0] && (
                      <div className='flex-grow-1'>
                        <div className='d-inline-block'>
                          <div className='symbol symbol-60px symbol-circle mb-3'>
                            <img
                              alt={match?.teams[0].name + ' team image'}
                              src={match?.teams[0].image}
                            />
                          </div>
                          <div className='fs-6 fw-bold'>{match?.teams[0].name}</div>
                        </div>
                      </div>
                    )}
                    <div className='flex-shrink-1'>
                      <div className='fs-6 fw-semibold text-gray-600 px-5'>
                        <p className='m-0'>
                          {getTimeFromTimestamp(match?.start_date, match?.timezone)}
                        </p>
                        <p className='m-0'>
                          {getDateFromTimestamp(match?.start_date, match?.timezone)}
                        </p>
                      </div>
                    </div>
                    {match?.teams && match?.teams[1] && (
                      <div className='flex-grow-1'>
                        <div className='d-inline-block'>
                          <div className='symbol symbol-60px symbol-circle mb-3'>
                            <img
                              alt={match?.teams[1].name + ' team image'}
                              src={match?.teams[1].image}
                            />
                          </div>
                          <div className='fs-6 fw-bold'>{match?.teams[1].name}</div>
                        </div>
                      </div>
                    )}
                  </div>
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