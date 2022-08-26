import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
// import 'react-dates/initialize'
import { LicenseInfo } from '@mui/x-license-pro';
LicenseInfo.setLicenseKey('e5379e980da589db25ae8ddfcb672c0aTz00OTgyMCxFPTE2OTMxNzYzMDAwNzMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
