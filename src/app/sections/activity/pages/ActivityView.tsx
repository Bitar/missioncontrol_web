import React, {FC, useEffect, useState} from 'react'
import {Activity} from '../models/Activity'
import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../layout/core'
import {getActivityById, getActivityTeams} from '../core/ActivityRequests'
import {ActivityInfo} from '../partials/ActivityInfo'
import {ActivityTeams} from './ActivityTeams'
import {ActivityOverview} from './ActivityOverview'
import {ActivityChat} from '../partials/ActivityChat'
import {Match} from '../models/matches/Match'
import {MatchPage} from '../../match/MatchPage'
import {ActivityContext} from '../core/ActivityContext'
import {SuspenseView} from '../../../layout/SuspenseView'
import {ActivitySettings} from './ActivitySettings'
import {ActivityMatches} from './ActivityMatches'
import {Team} from '../../../models/squad/Team'
import {QUERIES} from '../../../helpers/crud-helper/consts'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {ActivityRegistration} from '../models/ActivityRegistration'
import {ActivityTeamsFilter} from '../partials/ActivityTeamsFilter'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {TableHeader} from '../../../modules/table/TableHeader'

const ActivityView: FC = () => {
  const [activity, setActivity] = useState<Activity | undefined>()
  const [matches, setMatches] = useState<Match[] | undefined>([])
  const [match, setMatch] = useState<Match | undefined>()
  const [registrations, setRegistrations] = useState<ActivityRegistration[] | undefined>()
  const [teams, setTeams] = useState<Team[] | undefined>()

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

      // getActivityMatches(params.id).then((response) => {
      //   setMatches(response.data)
      // })

      getActivityTeams(params.id).then((response) => {
        setTeams(response.data)
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
                  <ActivityOverview />
                </SuspenseView>
              </>
            }
          />
          {/*<Route*/}
          {/*  path='/registrations'*/}
          {/*  element={*/}
          {/*    <>*/}
          {/*      <SuspenseView>*/}
          {/*        <PageTitle breadcrumbs={activityViewBreadcrumbs}>Registrations</PageTitle>*/}
          {/*        {activity && (*/}
          {/*          <QueryRequestProvider>*/}
          {/*            <QueryResponseProvider*/}
          {/*              id={QUERIES.ACTIVITIES_LIST}*/}
          {/*              requestFunction={getActivityRegistrations}*/}
          {/*              requestId={activity?.id}*/}
          {/*            >*/}
          {/*              <ListViewProvider>*/}
          {/*                <ActivityRegistrations />*/}
          {/*              </ListViewProvider>*/}
          {/*            </QueryResponseProvider>*/}
          {/*          </QueryRequestProvider>*/}
          {/*        )}*/}
          {/*      </SuspenseView>*/}
          {/*    </>*/}
          {/*  }*/}
          {/*/>*/}
          <Route
            path='/matches'
            element={
              <>
                <SuspenseView>
                  <PageTitle breadcrumbs={activityViewBreadcrumbs}>Matches</PageTitle>
                  <ActivityMatches />
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
                  {activity && (
                    <QueryRequestProvider>
                      <QueryResponseProvider
                        id={QUERIES.TEAMS_LIST}
                        requestFunction={getActivityTeams}
                        requestId={activity?.id}
                      >
                        <ListViewProvider>
                          <KTCard>
                            <TableHeader name='Activity' url='/activities' showFilter={true} showAdd={false}/>
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
          <Route
            path='/settings'
            element={
              <>
                <SuspenseView>
                  <PageTitle breadcrumbs={activityViewBreadcrumbs}>Settings</PageTitle>
                  <ActivitySettings />
                </SuspenseView>
              </>
            }
          />
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
