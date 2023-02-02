/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { KTSVG } from "../../../helpers/components";

type Props = {
  className: string
  color: string
  svgIcon?: string
  iconColor: string
  title: string
  titleColor?: string
  description: string
  descriptionColor?: string

  faIcon?: string
}

const StatisticsWidget5: React.FC<Props> = ({
                                              className,
                                              color,
                                              svgIcon,
                                              iconColor,
                                              title,
                                              titleColor,
                                              description,
                                              descriptionColor,
                                              faIcon
                                            }) => {
  return (
    <a href="#" className={`card bg-${color} hoverable ${className}`}>
      <div className="card-body">
        {faIcon ? (
          <i className={`${faIcon} fs-3x ms-n1 text-${iconColor}`}></i>
        ) : (
          svgIcon && <KTSVG path={svgIcon} className={`svg-icon-${iconColor} svg-icon-3x ms-n1`} />
        )}

        <div className={`text-${titleColor} fw-bold fs-2 mb-2 mt-5`}>{title}</div>

        <div className={`fw-semibold text-${descriptionColor}`}>{description}</div>
      </div>
    </a>
  );
};

export { StatisticsWidget5 };
