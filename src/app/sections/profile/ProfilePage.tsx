import {UserContext} from '../iam/user/core/UserContext'
import {useAuth} from '../../modules/auth'
import {UserSettings} from '../iam/user/pages/UserSettings'
import React from 'react'

export const ProfilePage = () => {
  const {currentUser, setCurrentUser} = useAuth()

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        setUser: setCurrentUser,
      }}>
      <UserSettings />
    </UserContext.Provider>
  )
}
