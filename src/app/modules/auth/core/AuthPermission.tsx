import React, {createContext, FC, useContext} from 'react'
import {Permission} from '../../../models/iam/Permission'
import {Role} from '../../../models/iam/Role'

type PermissionContextProps = {
  isAllowedTo: (permission: string) => boolean
}

const initAuthPermissionContextPropsState: PermissionContextProps = {
  isAllowedTo: () => false,
}

const PermissionContext = createContext<PermissionContextProps>(initAuthPermissionContextPropsState)

type PermissionProviderProps = {roles: Role[] | undefined}

const PermissionProvider: FC<React.PropsWithChildren<PermissionProviderProps>> = ({
  roles,
  children,
}) => {
  // Creates a method that returns whether the requested permission is available in the list of permissions
  // passed as parameter
  const isAllowedTo = (permission: string) => {
    let exists = false

    roles?.forEach((role: Role) => {
      role?.permissions?.forEach((p: Permission) => {
        if (p.name === permission && !exists) {
          exists = true
        }
      })
    })

    return exists
  }

  // This component will render its children wrapped around a PermissionContext's provider whose
  // value is set to the method defined above
  return <PermissionContext.Provider value={{isAllowedTo}}>{children}</PermissionContext.Provider>
}

type RestrictedProps = {to: string}

const usePermissions = () => {
  return useContext(PermissionContext)
}

// This component is meant to be used everywhere a restriction based on user permission is needed
const Restricted: FC<React.PropsWithChildren<RestrictedProps>> = ({to, children}) => {
  // We "connect" to the provider thanks to the PermissionContext

  const {isAllowedTo} = useContext(PermissionContext)

  // If the user has that permission, render the children
  if (isAllowedTo(to)) {
    return <>{children}</>
  }

  // Otherwise, do not render anything
  return null
}

export {PermissionProvider, Restricted, usePermissions}
