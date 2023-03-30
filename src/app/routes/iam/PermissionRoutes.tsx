import {Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../layout/core'
import React from 'react'
import PermissionIndex from '../../sections/iam/permission/pages/Index'
import PermissionCreate from '../../sections/iam/permission/pages/Create'
import PermissionEdit from '../../sections/iam/permission/pages/Edit'
import {SuspenseView} from '../../layout/SuspenseView'

const permissionsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Permissions',
    path: '/iam/permissions',
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

const PermissionRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={permissionsBreadCrumbs}>{'Overview'}</PageTitle>
            <PermissionIndex />
          </SuspenseView>
        }
      />
      <Route
        path='/create'
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={permissionsBreadCrumbs}>{'Add Permission'}</PageTitle>
            <PermissionCreate />
          </SuspenseView>
        }
      />
      <Route
        path='/:id/edit'
        element={
          <SuspenseView>
            <PageTitle breadcrumbs={permissionsBreadCrumbs}>{'Update Permission'}</PageTitle>
            <PermissionEdit />
          </SuspenseView>
        }
      />
    </Routes>
  )
}

export {PermissionRoutes}
