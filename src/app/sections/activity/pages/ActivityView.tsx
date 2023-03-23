import React, {FC, lazy, useEffect, useState} from 'react'
import {Activity} from '../../../models/activity/Activity'
import {Outlet, Route, Routes, useNavigate, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../layout/core'
import {getActivityById, getActivityTeams} from '../core/requests/ActivityRequests'
import {ActivityInfo} from '../partials/ActivityInfo'
import {ActivityTeams} from './ActivityTeams'
import {ActivityOverview} from './ActivityOverview'
import {ActivityChat} from '../partials/ActivityChat'
import {Match} from '../../../models/activity/matches/Match'
// import { MatchRoutes } from "../../../routes/match/MatchRoutes";
import {ActivityContext} from '../core/contexts/ActivityContext'
import {SuspenseView} from '../../../layout/SuspenseView'
import {ActivitySettings} from './ActivitySettings'
import {ActivityMatches} from './ActivityMatches'
import {Team} from '../../../models/squad/Team'
import {QUERIES} from '../../../helpers/crud-helper/consts'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {ActivityRegistration} from '../../../models/activity/ActivityRegistration'
import {ActivityTeamsFilter} from '../partials/ActivityTeamsFilter'
import {KTCard, KTCardBody} from '../../../helpers/components'
import toast from 'react-hot-toast'
import {ActivityMembersSection} from './ActivityMembersSection'

const ActivityView: FC = () => {
  const [activity, setActivity] = useState<Activity | undefined>()
  const [matches, setMatches] = useState<Match[] | undefined>([])
  const [match, setMatch] = useState<Match | undefined>()
  const [registrations, setRegistrations] = useState<ActivityRegistration[] | undefined>()
  const [teams, setTeams] = useState<Team[] | undefined>()
  const navigate = useNavigate()
  const MatchRoutes = lazy(() => import('../../../routes/match/MatchRoutes'))

  const params = useParams()

  const activityViewBreadcrumbs: Array<PageLink> = [
    {
      title: 'Activities',
      path: '/activities',
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
  ]

  useEffect(() => {
    getActivityById(params.id)
      .then((response) => {
        setActivity(response)

        getActivityTeams(params.id).then((response) => {
          setTeams(response.data)
        })
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            toast.error('Activity not found!')
            navigate('/activities')
          }
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  return (
    <ActivityContext.Provider
      value={{
        activity,
        setActivity,
        matches,
        setMatches,
        match,
        setMatch,
        registrations,
        setRegistrations,
        teams,
        setTeams,
      }}
    >
      <Routes>
        <Route
          element={
            <SuspenseView>
              <ActivityInfo />
              <Outlet />
            </SuspenseView>
          }
        >
          <Route
            index
            element={
              <SuspenseView>
                <PageTitle breadcrumbs={activityViewBreadcrumbs}>Overview</PageTitle>
                <ActivityOverview />
              </SuspenseView>
            }
          />
          <Route
            path='/matches'
            element={
              <SuspenseView>
                <PageTitle breadcrumbs={activityViewBreadcrumbs}>Matches</PageTitle>
                <ActivityMatches />
              </SuspenseView>
            }
          />
          <Route
            path='/members'
            element={
              <SuspenseView>
                <PageTitle breadcrumbs={activityViewBreadcrumbs}>Members</PageTitle>
                <ActivityMembersSection />
              </SuspenseView>
            }
          />
          <Route
            path='/teams'
            element={
              <SuspenseView>
                <PageTitle breadcrumbs={activityViewBreadcrumbs}>Teams</PageTitle>
                {activity && (
                  <QueryRequestProvider>
                    <QueryResponseProvider
                      id={QUERIES.TEAMS_LIST}
                      requestFunction={getActivityTeams}
                      requestId={activity?.id}
                    >
                      <ListViewProvider>
                        <KTCard>
                          <KTCardBody>
                            <ActivityTeamsFilter />
                            <ActivityTeams />
                          </KTCardBody>
                        </KTCard>
                      </ListViewProvider>
                    </QueryResponseProvider>
                  </QueryRequestProvider>
                )}
              </SuspenseView>
            }
          />
          <Route
            path='/chat'
            element={
              <SuspenseView>
                <PageTitle breadcrumbs={activityViewBreadcrumbs}>Chat</PageTitle>
                <ActivityChat />
              </SuspenseView>
            }
          />
          <Route
            path='/settings'
            element={
              <SuspenseView>
                <PageTitle breadcrumbs={activityViewBreadcrumbs}>Settings</PageTitle>
                {activity && <ActivitySettings />}
              </SuspenseView>
            }
          />
          <Route
            path='/matches/:matchId/*'
            element={
              <SuspenseView>
                <PageTitle breadcrumbs={activityViewBreadcrumbs}>Settings</PageTitle>
                <MatchRoutes />
              </SuspenseView>
            }
          />
        </Route>
      </Routes>
    </ActivityContext.Provider>
  )
}

export {ActivityView}
