import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {LayoutSplashScreen} from '../../../layout/core'
import {AuthModel} from './_models'
import * as authHelper from './AuthHelpers'
import {getUserByToken} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'
import {Community} from '../../../sections/community/models/Community'
import {Subscription} from '../../../models/billing/Subscription'
import {User} from '../../../sections/identity/user/models/User'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  updateAuth: () => void
  currentUser: User | undefined
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>
  communityAdmin: Community | undefined
  setCommunityAdmin: Dispatch<SetStateAction<Community | undefined>>
  subscription: Subscription | undefined
  setSubscription: Dispatch<SetStateAction<Subscription | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  updateAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  communityAdmin: undefined,
  setCommunityAdmin: () => {},
  subscription: undefined,
  setSubscription: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const [communityAdmin, setCommunityAdmin] = useState<Community | undefined>()
  const [subscription, setSubscription] = useState<Subscription | undefined>()
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
    setCommunityAdmin(undefined)
    setSubscription(undefined)
  }

  const updateAuth = async () => {
    if(auth) {
      const {data} = await getUserByToken(auth.token)
      if (data) {
        setSubscription(data.subscription)
        setCurrentUser(data.user)
        setCommunityAdmin(data.admin)
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        saveAuth,
        updateAuth,
        currentUser,
        setCurrentUser,
        communityAdmin,
        setCommunityAdmin,
        subscription,
        setSubscription,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, logout, setCurrentUser, setSubscription, setCommunityAdmin} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!didRequest.current && apiToken) {
          const {data} = await getUserByToken(apiToken)
          if (data) {
            setSubscription(data.subscription)
            setCurrentUser(data.user)
            setCommunityAdmin(data.admin)
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      didRequest.current = true
    }

    if (auth && auth.token) {
      requestUser(auth.token)
    } else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
