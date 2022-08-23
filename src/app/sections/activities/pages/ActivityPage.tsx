import React, {FC} from 'react'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {Navigate, Route, Routes} from 'react-router-dom'
import {ActivityIndex} from './ActivityIndex'
import {ActivityCreate} from '../ActivityCreate'

const activityBreadCrumbs: Array<PageLink> = [
  {
    title: 'Activities',
    path: '/Activities/overview',
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

const ActivityPage: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Routes>
      <Route
        path='/overview'
        element={
          <>
            <PageTitle breadcrumbs={activityBreadCrumbs}>{'Overview'}</PageTitle>
            <ActivityIndex />
          </>
        }
      />
      <Route
        path='/create'
        element={
          <>
            <PageTitle breadcrumbs={activityBreadCrumbs}>{'Add Activity'}</PageTitle>
            <ActivityCreate />
          </>
        }
      />
      <Route
        path='/:id/*'
        element={
          <>
            <PageTitle breadcrumbs={activityBreadCrumbs}>{'View Community'}</PageTitle>
          </>
        }
      />
      <Route index element={<Navigate to='/activities/overview' replace={true} />} />
    </Routes>
  )
}

export {ActivityPage}
