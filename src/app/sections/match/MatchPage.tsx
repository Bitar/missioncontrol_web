import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../layout/core'
import React, {FC, useEffect, useState} from 'react'
import {MatchInfo} from './MatchInfo'
import {MatchOverview} from './MatchOverview'
import {getActivityMatch} from '../activity/core/requests/ActivityMatchRequests'
import {useActivity} from '../activity/core/contexts/ActivityContext'
import {MatchChat} from './pages/MatchChat'
import {MatchSettings} from './pages/MatchSettings'
import {MatchContext} from './core/MatchContext'
import {Match} from '../../models/activity/matches/Match'
import {Team} from '../../models/squad/Team'

const MatchPage: FC = () => {
  const {activity} = useActivity()
  const [match, setMatch] = useState<Match | undefined>()
  const [teams, setTeams] = useState<Team[] | undefined>()

  const params = useParams()
  // const [match, setMatch] = useState<Match | undefined>(initialMatch)

  const matchBreadCrumbs: Array<PageLink> = [
    {
      title: 'Activities',
      path: '/activities/:id/overview',
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
      title: match?.activity?.title || '',
      path: '/activities/' + params.id + '/overview',
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
      setTeams(response?.teams)
    })
  }, [params.id, params.matchId])

  return (
    <MatchContext.Provider
      value={{
        match,
        setMatch,
        teams,
        setTeams,
      }}
    >
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
            path='overview'
            element={
              <>
                <PageTitle breadcrumbs={matchBreadCrumbs}>{'Overview'}</PageTitle>
                <MatchOverview activity={activity} match={match} />
              </>
            }
          />
          <Route
            path='chat'
            element={
              <>
                <PageTitle breadcrumbs={matchBreadCrumbs}>{'Chat'}</PageTitle>
                <MatchChat />
              </>
            }
          />
          <Route
            path='settings'
            element={
              <>
                <PageTitle breadcrumbs={matchBreadCrumbs}>{'Settings'}</PageTitle>
                <MatchSettings />
              </>
            }
          />
          <Route
            index
            element={
              <Navigate
                to={`/activities/${params.id}/matches/${params.matchId}/overview`}
                replace={true}
              />
            }
          />
        </Route>
      </Routes>
    </MatchContext.Provider>
  )
}

export {MatchPage}
