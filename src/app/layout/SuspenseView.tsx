import {FC, Suspense} from 'react'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'

const SuspenseView: FC = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-mc-secondary')

  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })

  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {SuspenseView}
