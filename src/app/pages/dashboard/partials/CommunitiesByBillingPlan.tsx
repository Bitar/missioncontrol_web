/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../../_metronic/assets/ts/_utils'
import {useThemeMode} from '../../../../_metronic/partials'

export type CommunitiesSubscriptions = {
  total_communities: number
  billing_plan: {
    name: string
  }
}

type Props = {
  className: string
  communitiesCreation?: CommunitiesSubscriptions[]
  values: number[]
  dates: string[]
}

const CommunitiesByBillingPlan: React.FC<Props> = ({className, values, dates}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()

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
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Communities By Subscriptions</span>
        </h3>
      </div>

      <div className='card-body'>
        <div ref={chartRef} id='kt_charts_widget_3_chart' style={{height: '350px'}}></div>
      </div>
    </div>
  )
}

export {CommunitiesByBillingPlan}

function getChartOptions(height: number, values?: number[], dates?: string[]): ApexOptions {
  const labelColor = getCSSVariableValue('--kt-gray-500')
  // const borderColor = getCSSVariableValue("--kt-gray-200");
  const baseColor = getCSSVariableValue('--kt-mc-secondary')

  return {
    series: [
      {
        name: 'Community Billing Plan',
        data: values || [],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: [baseColor],
    },
    xaxis: {
      categories: dates || [],
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return val + ''
        },
      },
    },
  }
}
