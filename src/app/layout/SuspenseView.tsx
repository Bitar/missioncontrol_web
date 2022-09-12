import React, {FC, Suspense} from 'react'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'

const SuspenseView: FC<React.PropsWithChildren<unknown>> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-mc-secondary')

  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 5,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {SuspenseView}
