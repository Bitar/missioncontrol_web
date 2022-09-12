import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from './layout/core'
import {MasterInit} from './layout/MasterInit'
import {AuthInit, useAuth} from './modules/auth'
// import * as PusherPushNotifications from '@pusher/push-notifications-web'
import {LicenseInfo} from '@mui/x-license-pro'
import {PermissionProvider} from './modules/auth/core/AuthPermission'

LicenseInfo.setLicenseKey(
  'e5379e980da589db25ae8ddfcb672c0aTz00OTgyMCxFPTE2OTMxNzYzMDAwNzMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
)
//
// const beamsClient = new PusherPushNotifications.Client({
//   instanceId: 'aee679f4-935e-4cb1-960f-85c135834eee',
// })
//
// beamsClient
//   .start()
//   .then((beamsClient: any) => beamsClient?.getDeviceId())
//   .catch(console.error)

const App = () => {
  const {currentUser} = useAuth()

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <PermissionProvider roles={currentUser?.roles}>
              <Outlet />
              <MasterInit />
            </PermissionProvider>
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
