import React, {FC} from 'react'
import {PageLink, PageTitle} from '../../../layout/core'
import {Navigate, Route, Routes} from 'react-router-dom'
import {ActivityIndex} from './ActivityIndex'
import {ActivityCreateOld} from './ActivityCreateOld'
import {ActivityView} from './ActivityView'
import {SuspenseView} from '../../../layout/SuspenseView'

const activityBreadCrumbs: Array<PageLink> = [
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
]

const ActivityPage: FC = () => {
  return (
    <Routes>
      <Route
        path='/overview'
        element={
          <>
            <SuspenseView>
              <PageTitle breadcrumbs={activityBreadCrumbs}>{'Overview'}</PageTitle>
              <ActivityIndex />
            </SuspenseView>
          </>
        }
      />
      <Route
        path='/create'
        element={
          <>
            <SuspenseView>
              <PageTitle breadcrumbs={activityBreadCrumbs}>{'Add Activity'}</PageTitle>
              <ActivityCreateOld />
            </SuspenseView>
          </>
        }
      />
      <Route
        path='/:id/*'
        element={
          <>
            <SuspenseView>
              <PageTitle breadcrumbs={activityBreadCrumbs}>{'View Community'}</PageTitle>
              <ActivityView />
            </SuspenseView>
          </>
        }
      />
      <Route index element={<Navigate to='/activities/overview' replace={true} />} />
    </Routes>
  )
}

export default ActivityPage
