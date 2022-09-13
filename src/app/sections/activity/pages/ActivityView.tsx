import React, {FC, useEffect, useState} from 'react'
import {Activity} from '../models/Activity'
import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../layout/core'
import {getActivityById, getActivityMatches, getActivityMembers} from '../core/ActivityRequests'
import {ActivityInfo} from '../ActivityInfo'
import {ActivityTeams} from './ActivityTeams'
import {ActivityOverview} from './ActivityOverview'
import {ActivityChat} from './ActivityChat'
import {Match} from '../models/matches/Match'
import {ActivityRegistrations} from './ActivityRegistrations'
import {User} from '../../identity/user/models/User'
import {MatchPage} from '../../match/MatchPage'
import {ActivityContext} from '../AuthContext'
import {SuspenseView} from '../../../layout/SuspenseView'

const ActivityView: FC = () => {
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

      // setTeams(response?.teams)

      getActivityMatches(params.id).then((response) => {
        setMatches(response.data)
      })

      getActivityMembers(params.id).then((response) => {
        setMembers(response.data)
      })
    })
  }, [params.id])

  return (
    <ActivityContext.Provider
      value={{
        activity,
        setActivity,
        matches,
        setMatches,
        members,
        setMembers,
        match,
        setMatch,
      }}
    >
      <Routes>
        <Route
          element={
            <>
              <SuspenseView>
                <ActivityInfo />
                <Outlet />
              </SuspenseView>
            </>
          }
        >
          <Route
            path='/overview'
            element={
              <>
                <SuspenseView>
                  <PageTitle breadcrumbs={activityViewBreadcrumbs}>Overview</PageTitle>
                  <ActivityOverview setMatch={setMatch} />
                </SuspenseView>
              </>
            }
          />
          <Route
            path='/registrations'
            element={
              <>
                <SuspenseView>
                  <PageTitle breadcrumbs={activityViewBreadcrumbs}>Registrations</PageTitle>
                  <ActivityRegistrations registrations={activity?.registrations} />
                </SuspenseView>
              </>
            }
          />
          <Route
            path='/teams'
            element={
              <>
                <SuspenseView>
                  <PageTitle breadcrumbs={activityViewBreadcrumbs}>Teams</PageTitle>
                  <ActivityTeams />
                </SuspenseView>
              </>
            }
          />
          <Route
            path='/chat'
            element={
              <>
                <SuspenseView>
                  <PageTitle breadcrumbs={activityViewBreadcrumbs}>Chat</PageTitle>
                  <ActivityChat />
                </SuspenseView>
              </>
            }
          />
          {/*<Route*/}
          {/*  path='/settings'*/}
          {/*  element={*/}
          {/*    <>*/}
          {/*      <PageTitle breadcrumbs={activityViewBreadcrumbs}>Settings</PageTitle>*/}
          {/*    </>*/}
          {/*  }*/}
          {/*/>*/}
          <Route
            path='/matches/:matchId/*'
            element={
              <>
                <SuspenseView>
                  <PageTitle breadcrumbs={activityViewBreadcrumbs}>Settings</PageTitle>
                  <MatchPage />
                </SuspenseView>
              </>
            }
          />
          <Route index element={<Navigate to={'/activities/' + params.id + '/overview'} />} />
        </Route>
      </Routes>
    </ActivityContext.Provider>
  )
}

export {ActivityView}
