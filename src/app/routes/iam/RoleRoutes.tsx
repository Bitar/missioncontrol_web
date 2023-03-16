import {Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../layout/core'
import React from 'react'
import RoleIndex from '../../sections/iam/role/pages/RoleIndex'
import {RoleCreate} from '../../sections/iam/role/pages/RoleCreate'
import {RoleEdit} from '../../sections/iam/role/pages/RoleEdit'
import {SuspenseView} from '../../layout/SuspenseView'

const rolesBreadCrumbs: Array<PageLink> = [
  {
    title: 'Roles',
    path: '/iam/roles/',
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

const RoleRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={rolesBreadCrumbs}>{'Overview'}</PageTitle>
            <RoleIndex />
          </SuspenseView>
        }
      />
      <Route
        path='/create'
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={rolesBreadCrumbs}>{'Add Role'}</PageTitle>
            <RoleCreate />
          </SuspenseView>
        }
      />
      <Route
        path='/:id/edit'
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={rolesBreadCrumbs}>{'Update Role'}</PageTitle>
            <RoleEdit />
          </SuspenseView>
        }
      />
    </Routes>
  )
}

export default RoleRoutes
