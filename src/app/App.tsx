import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from './layout/core'
import {MasterInit} from './layout/MasterInit'
import {AuthInit} from './modules/auth'
import {AccessControlProvider} from './modules/auth/core/AuthPermission'
import {McApp} from './modules/general/McApp'
// import * as PusherPushNotifications from '@pusher/push-notifications-web'
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
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <AccessControlProvider>
              <McApp>
                {/*<MCToaster />*/}
                <Outlet />
                <MasterInit />
              </McApp>
            </AccessControlProvider>
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
