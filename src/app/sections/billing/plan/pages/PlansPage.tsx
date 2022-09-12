import {Navigate, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../layout/core'
import React from 'react'
import {PlansIndex} from '../PlansIndex'
import {PlansCreate} from '../PlansCreate'
import {PlansEdit} from '../PlansEdit'

const plansBreadCrumbs: Array<PageLink> = [
  {
    title: 'Roles',
    path: '/roles/overview',
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

const PlansPage: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/overview'
        element={
          <>
            <PageTitle breadcrumbs={plansBreadCrumbs}>{'Overview'}</PageTitle>
            <PlansIndex />
          </>
        }
      />
      <Route
        path='/create'
        element={
          <>
            <PageTitle breadcrumbs={plansBreadCrumbs}>{'Add Plan'}</PageTitle>
            <PlansCreate />
          </>
        }
      />
      <Route
        path='/:id/edit'
        element={
          <>
            <PageTitle breadcrumbs={plansBreadCrumbs}>{'Update Plan'}</PageTitle>
            <PlansEdit />
          </>
        }
      />
      <Route index element={<Navigate to='/plans/overview' replace={true} />} />
    </Routes>
  )
}

export default  PlansPage
