/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../../_metronic/assets/ts/_utils'
import {useThemeMode} from '../../../../_metronic/partials'
import clsx from 'clsx'
import moment from 'moment/moment'

export type UserRegistrations = {
  count: number
  date: string
}

type Props = {
  className: string
  userRegistrations?: UserRegistrations[]
  values?: number[]
  dates?: string[]
  daily?: any
  weekly?: any
  monthly?: any
}

const UsersRegistrationsCohort: React.FC<Props> = ({
  className,
  values,
  dates,
  daily,
  weekly,
  monthly,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const [activeFilter, setActiveFilter] = useState<string>('')

  const [valuesState, setValuesState] = useState<any[]>([])
  const [datesState, setDatesState] = useState<string[]>([])
  const [extraDataState, setExtraDataState] = useState<string[]>([])

  const [subText, setSubText] = useState<string>('')

  const [dailyData, setDailyData] = useState<any>()
  const [weeklyData, setWeeklyData] = useState<any>()
  const [monthlyData, setMonthlyData] = useState<any>()

  const updateChartData = (filter: string) => {
    if (filter === activeFilter) return
    setActiveFilter(filter)

    switch (filter) {
      case 'day':
        setSubText('User registrations in the last 30 days.')
        extractValues(dailyData, 'ddd, DD MMM')
        break
      case 'week':
        setSubText('User registrations in the last 13 weeks.')
        extractValues(weeklyData)
        break
      case 'month':
        setSubText('User registrations in the last 6 months.')
        extractValues(monthlyData)
        break
      default:
        break
    }
  }

  function extractValues(dataObject: any, format?: string) {
    let dates: string[] = []
    let values: any[] = []
    let extraData: any[] = []

    dataObject.forEach((month: any) => {
      const date = moment(month?.date * 1000)
      dates.push(date.format(format || "MMM 'YY"))
      values.push(month?.new_users)
      extraData.push(month?.total_users)
    })

    setValuesState(values)
    setDatesState(dates)
    setExtraDataState(extraData)
  }

  useEffect(() => {
    if (!daily) return
    setDailyData(daily)
  }, [daily])

  useEffect(() => {
    if (!dailyData) return
    if (!values || values?.length === 0) {
      updateChartData('day')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailyData])

  useEffect(() => {
    if (!weekly) return
    setWeeklyData(weekly)
  }, [weekly])

  useEffect(() => {
    if (!monthly) return
    setMonthlyData(monthly)
  }, [monthly])

  useEffect(() => {
    const refreshMode = () => {
      if (!valuesState || !datesState || !chartRef.current) return

      const height = parseInt(getCSS(chartRef.current, 'height'))

      let chartOpts = getChartOptions(height, valuesState, datesState, extraDataState)

      const chart = new ApexCharts(chartRef.current, chartOpts)

      if (chart) {
        chart?.render()
      }

      return chart
    }

    const chart = refreshMode()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef, mode, valuesState, datesState, extraDataState])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>User Registrations</span>
          <span className='text-muted fw-semibold fs-7'>{subText}</span>
        </h3>
        <div className='card-toolbar' data-kt-buttons='true'>
          <button
            className={clsx('btn btn-sm btn-color-muted active px-4 me-1', {
              'btn-active btn-active-primary': activeFilter === 'day',
            })}
            onClick={() => updateChartData('day')}>
            Daily
          </button>

          <button
            className={clsx('btn btn-sm btn-color-muted active px-4 me-1', {
              'btn-active btn-active-primary': activeFilter === 'week',
            })}
            onClick={() => updateChartData('week')}>
            Weekly
          </button>

          <button
            className={clsx('btn btn-sm btn-color-muted active px-4 me-1', {
              'btn-active btn-active-primary': activeFilter === 'month',
            })}
            onClick={() => updateChartData('month')}>
            Monthly
          </button>
        </div>
      </div>

      <div className='card-body'>
        <div ref={chartRef} style={{height: '350px'}}></div>
      </div>
    </div>
  )
}

export {UsersRegistrationsCohort}

function getChartOptions(
  height: number,
  values?: any[],
  dates?: string[],
  extraData?: any[]
): ApexOptions {
  const labelColor = getCSSVariableValue('--kt-gray-500')
  const borderColor = getCSSVariableValue('--kt-gray-200')
  const baseColor = getCSSVariableValue('--kt-danger')
  const lightColor = getCSSVariableValue('--kt-danger-light')

  return {
    series: [
      {
        name: 'User Registrations',
        data: values || [],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'line',
      height: 350,
      toolbar: {
        tools: {
          download: true,
          zoomin: true,
          zoomout: true,
          reset: true,
          pan: false,
        },
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: dates || [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        offsetY: 0,
        style: {
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
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
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
      custom: function (options) {
        let yValue = options.series[options.seriesIndex][options.dataPointIndex]
        let xValue = options.w.globals.categoryLabels[options.dataPointIndex]
        let additionalValue = extraData && extraData[options.dataPointIndex]

        return `
          <div class="apexcharts-tooltip-title" style="font-family: inherit; font-size: 12px;">${xValue}</div>
          <div class="apexcharts-tooltip-series-group apexcharts-active" style="order: 1; display: flex;">
            <span class="apexcharts-tooltip-marker" style="background-color: rgb(255, 245, 248);"></span>
            <div class="apexcharts-tooltip-text" style="font-family: inherit; font-size: 12px;">
            <div class="apexcharts-tooltip-y-group">
              <span class="apexcharts-tooltip-text-y-label">User Registrations: </span>
              <span class="apexcharts-tooltip-text-y-value">${yValue}</span>
            </div>
            <div class="apexcharts-tooltip-y-group">
              <span class="apexcharts-tooltip-text-y-label">Total Registrations: </span>
              <span class="apexcharts-tooltip-text-y-value">${additionalValue.toLocaleString()}</span>
            </div>
          </div>
          </div>
         `
      },
      style: {
        fontSize: '12px',
      },
    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  }
}
