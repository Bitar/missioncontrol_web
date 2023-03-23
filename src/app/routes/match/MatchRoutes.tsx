import {Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../layout/core'
import React, { FC, useEffect, useRef, useState } from "react";
import {MatchInfo} from '../../sections/match/MatchInfo'
import {MatchOverview} from '../../sections/match/MatchOverview'
import {getActivityMatch} from '../../sections/activity/core/requests/ActivityMatchRequests'
import {useActivity} from '../../sections/activity/core/contexts/ActivityContext'
import {MatchChat} from '../../sections/match/pages/MatchChat'
import {MatchSettings} from '../../sections/match/pages/MatchSettings'
import {MatchContext} from '../../sections/match/core/MatchContext'
import {Match, NewMatch} from '../../models/activity/matches/Match'
import {Team} from '../../models/squad/Team'
import {SuspenseView} from '../../layout/SuspenseView'

const MatchRoutes: FC = () => {
  const {activity} = useActivity()
  const [match, setMatch] = useState<NewMatch | undefined>()
  const [teams, setTeams] = useState<Team[] | undefined>()
  const bottomRef = useRef<null | HTMLDivElement>(null)

  const params = useParams()

  const matchBreadCrumbs: Array<PageLink> = [
    {
      title: 'Activities',
      path: '/activities/:id',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: activity?.title || '',
      path: '/activities/' + params.id,
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: 'Match',
      path: '',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  useEffect(() => {
    getActivityMatch(params.id, params.matchId).then((response) => {
      setMatch(response)
      // setTeams(response?.teams);
    })
  }, [params.id, params.matchId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [params])

  return (
    <MatchContext.Provider
      value={{
        match,
        setMatch,
        teams,
        setTeams,
      }}
    >
      <div ref={bottomRef} />
      <Routes>
        <Route
          element={
            <>
              <MatchInfo />
              <Outlet />
            </>
          }
        >
          <Route
            index
            element={
              <SuspenseView>
                <PageTitle breadcrumbs={matchBreadCrumbs}>{'Overview'}</PageTitle>
                <MatchOverview activity={activity} match={match} />
              </SuspenseView>
            }
          />
          <Route
            path='chat'
            element={
              <SuspenseView>
                <PageTitle breadcrumbs={matchBreadCrumbs}>{'Chat'}</PageTitle>
                <MatchChat />
              </SuspenseView>
            }
          />
          <Route
            path='settings'
            element={
              <SuspenseView>
                <PageTitle breadcrumbs={matchBreadCrumbs}>{'Settings'}</PageTitle>
                <MatchSettings />
              </SuspenseView>
            }
          />
        </Route>
      </Routes>
    </MatchContext.Provider>
  )
}

export default MatchRoutes
