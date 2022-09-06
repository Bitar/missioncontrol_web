import React, {useEffect, useState} from 'react'
import {Activity} from '../models/Activity'
import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {getActivityById, getActivityMatches, getActivityMembers} from '../core/ActivityRequests'
import {ActivityInfo} from '../ActivityInfo'
import {ActivityTeams} from './ActivityTeams'
import {ActivityOverview} from './ActivityOverview'
import {ActivityChat} from './ActivityChat'
import {Match} from '../models/matches/Match'
import {ActivityMembers} from './ActivityMembers'
import {User} from '../../identity/user/models/User'
import {MatchPage} from '../../match/MatchPage'

const ActivityView: React.FC = () => {
  const [activity, setActivity] = useState<Activity | undefined>()
  const [matches, setMatches] = useState<Match[] | undefined>([])
  const [members, setMembers] = useState<User[] | undefined>([])
  const [match, setMatch] = useState<Match | undefined>()

  const params = useParams()

  const activityViewBreadcrumbs: Array<PageLink> = [
    {
      title: 'Activities',
      path: '/activities/overview',
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
  ]

  useEffect(() => {
    getActivityById(params.id).then((response) => {
      setActivity(response)

      getActivityMatches(params.id).then((response) => {
        setMatches(response.data)
      })

      getActivityMembers(params.id).then((response) => {
        setMembers(response.data)
      })
    })
  }, [params.id])

  return (
    <Routes>
      <Route
        element={
          <>
            <ActivityInfo activity={activity} />
            <Outlet />
          </>
        }
      >
        <Route
          path='/overview'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Overview</PageTitle>
              <ActivityOverview
                activity={activity}
                setActivity={setActivity}
                matches={matches}
                setMatch={setMatch}
              />
            </>
          }
        />
        <Route
          path='/members'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Members</PageTitle>
              <ActivityMembers members={members} />
            </>
          }
        />
        <Route
          path='/teams'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Teams</PageTitle>
              <ActivityTeams activity={activity} setActivity={setActivity} />
            </>
          }
        />
        <Route
          path='/chat'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Chat</PageTitle>
              <ActivityChat activity={activity} setActivity={setActivity} />
            </>
          }
        />
        <Route
          path='/members'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Members</PageTitle>
            </>
          }
        />
        <Route
          path='/settings'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Settings</PageTitle>
            </>
          }
        />
        <Route
          path='/matches/:matchId/*'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Settings</PageTitle>
              <MatchPage activity={activity} match={match} setMatch={setMatch} />
            </>
          }
        />
        <Route index element={<Navigate to={'/activities/' + params.id + '/overview'} />} />
      </Route>
    </Routes>
  )
}

export { ActivityView };