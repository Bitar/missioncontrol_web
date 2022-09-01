import React, {useEffect, useState} from 'react'
import {Activity} from '../models/Activity'
import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {getActivityById} from '../core/ActivityRequests'
import {CommunityInfo} from '../../community/CommunityInfo'
import {CommunityActivities} from '../../community/pages/CommunityActivities'
import {CommunityUsers} from '../../community/pages/CommunityUsers'
import {CommunityEdit} from '../../community/pages/CommunityEdit'
import {ActivityInfo} from '../ActivityInfo'
import {ActivityMatches} from './ActivityMatches'

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
            </>
          }
        />
        <Route
          path='matches'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Matches</PageTitle>
              <ActivityMatches activity={activity} />
            </>
          }
        />
        <Route
          path='teams'
          element={
            <>
              <PageTitle breadcrumbs={activityViewBreadcrumbs}>Teams</PageTitle>
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