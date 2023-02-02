/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { getCSS, getCSSVariableValue } from "../../../../_metronic/assets/ts/_utils";
import { useThemeMode } from "../../../../_metronic/partials";

export type CommunitiesCreation = {
  count: number,
  date: string
}

type Props = {
  className: string
  communitiesCreation?: CommunitiesCreation[]
  values: number[]
  dates: string[]
}


const CommunitiesByDay: React.FC<Props> = ({ className, communitiesCreation, values, dates }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

  // const [dates, setDates] = useState<string[]>([]);
  // const [values, setValues] = useState<number[]>([]);

  const refreshMode = () => {
    if (!chartRef.current) {
      return;
    }

    const height = parseInt(getCSS(chartRef.current, "height"));

    const chart = new ApexCharts(chartRef.current, getChartOptions(height, values, dates));
    if (chart) {
      chart.render();
    }

    return chart;
  };

  useEffect(() => {
    const chart = refreshMode();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef, mode]);


  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Recent Communities</span>

          {/*<span className='text-muted fw-semibold fs-7'>More than 1000 new records</span>*/}
        </h3>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body">
        {/* begin::Chart */}
        <div ref={chartRef} id="kt_charts_widget_3_chart" style={{ height: "350px" }}></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { CommunitiesByDay };

function getChartOptions(height: number, values?: number[], dates?: string[]): ApexOptions {
  console.log(values);
  console.log(dates);
  const labelColor = getCSSVariableValue("--kt-gray-500");
  const borderColor = getCSSVariableValue("--kt-gray-200");
  const baseColor = getCSSVariableValue("--kt-mc-secondary");
  const lightColor = getCSSVariableValue("--kt-mc-secondary-light");

  return {
    series: [
      {
        name: "New Community",
        data: values || []
      }
    ],
    chart: {
      fontFamily: "inherit",
      type: "area",
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {},
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "solid",
      opacity: 1
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [baseColor]
    },
    xaxis: {
      categories: dates || [],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px"
        }
      },
      crosshairs: {
        position: "front",
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3
        }
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px"
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px"
        }
      }
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0
        }
      },
      hover: {
        filter: {
          type: "none",
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0
        }
      }
    },
    tooltip: {
      style: {
        fontSize: "12px"
      },
      y: {
        formatter: function(val) {
          return val.toPrecision(1);
        }
      }
    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3
    }
  };
}
