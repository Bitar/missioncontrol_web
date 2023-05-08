import React, {FC} from 'react'
import {PageLink, PageTitle} from '../../layout/core'
import {Route, Routes} from 'react-router-dom'
import ActivityIndex from '../../sections/activity/pages/ActivityIndex'
import {ActivityViewRoutes} from './ActivityViewRoutes'
import {SuspenseView} from '../../layout/SuspenseView'
import {ActivityCreate} from '../../sections/activity/pages/ActivityCreate'
import {Restricted} from '../../modules/auth/core/AuthPermission'

const activityBreadCrumbs: Array<PageLink> = [
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
]

const ActivityRoutes: FC = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={activityBreadCrumbs}>{'Overview'}</PageTitle>
            <Restricted to='view-activities'>
              <ActivityIndex />
            </Restricted>
          </SuspenseView>
        }
      />
      <Route
        path='/create'
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={activityBreadCrumbs}>{'Add Activity'}</PageTitle>
            <ActivityCreate />
          </SuspenseView>
        }
      />
      <Route
        path='/:id/*'
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={activityBreadCrumbs}>{'View Activity'}</PageTitle>
            <ActivityViewRoutes />
          </SuspenseView>
        }
      />
    </Routes>
  )
}

export default ActivityRoutes
