import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../../_metronic/assets/ts/_utils'
import {useThemeMode} from '../../../../_metronic/partials'

type Props = {
  className: string
  values: number[]
  dates: string[]
}
const PopularGames: React.FC<Props> = ({className, values, dates}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()

  // const [dates, setDates] = useState<string[]>([]);
  // const [values, setValues] = useState<number[]>([]);

  const refreshMode = () => {
    if (!chartRef.current) {
      return
    }

    const height = parseInt(getCSS(chartRef.current, 'height'))

    const chart = new ApexCharts(chartRef.current, getChartOptions(height, values, dates))
    if (chart) {
      chart.render()
    }

    return chart
  }

  useEffect(() => {
    const chart = refreshMode()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Most Popular Games</span>

          {/*<span className='text-muted fw-semibold fs-7'>More than 1000 new records</span>*/}
        </h3>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} id='kt_charts_widget_3_chart' style={{height: '350px'}}></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {PopularGames}

function getChartOptions(height: number, values?: number[], dates?: string[]): ApexOptions {
  const baseColor = getCSSVariableValue('--kt-mc-secondary')

  const primary = getCSSVariableValue('--kt-primary')
  const success = getCSSVariableValue('--kt-success')
  const warning = getCSSVariableValue('--kt-warning')
  const danger = getCSSVariableValue('--kt-danger')
  const info = getCSSVariableValue('--kt-info')
  const secondary = getCSSVariableValue('--kt-secondary')

  return {
    series: values,
    labels: dates,
    chart: {
      height: 400,
      fontFamily: 'inherit',
      type: 'pie',
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    plotOptions: {},
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 2,
      colors: ['#ffffff'],
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
    },
    // colors: [lightColor],
    colors: [primary, success, warning, danger, info, secondary],
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  }
}
