import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from './layout/core'
import {MasterInit} from './layout/MasterInit'
import {AuthInit} from './modules/auth'
import {AccessControlProvider} from './modules/auth/core/AuthPermission'
import {McApp} from './modules/general/McApp'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <AccessControlProvider>
              <McApp>
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
