import React, {useEffect, useState} from 'react'
import {Activity} from '../models/Activity'
import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {getActivityById} from '../core/ActivityRequests'
import {ActivityInfo} from '../ActivityInfo'
import {ActivityMatches} from './ActivityMatches'
import {ActivityTeams} from './ActivityTeams'
import { ActivityOverview } from './ActivityOverview'
import { ActivityChat } from "./ActivityChat";

const ActivityView: React.FC = () => {
  const [activity, setActivity] = useState<Activity | undefined>()
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
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Overview</PageTitle>
              <ActivityOverview activity={activity} setActivity={setActivity}/>
            </>
          }
        />
        <Route
          path='matches'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Matches</PageTitle>
              <ActivityMatches activity={activity} setActivity={setActivity}/>
            </>
          }
        />
        <Route
          path='teams'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Teams</PageTitle>
              <ActivityTeams activity={activity} setActivity={setActivity}/>
            </>
          }
        />
        <Route
          path='chat'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Chat</PageTitle>
              <ActivityChat activity={activity} setActivity={setActivity}/>
            </>
          }
        />
        <Route
          path='members'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Members</PageTitle>
            </>
          }
        />
        <Route
          path='settings'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Settings</PageTitle>
            </>
          }
        />
        <Route index element={<Navigate to={'/activities/' + params.id + '/overview'} />} />
      </Route>
    </Routes>
  )
}

export { ActivityView };