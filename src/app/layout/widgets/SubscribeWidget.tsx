/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";

type Props = {
  className?: string
  bgColor?: string
  bgImage?: string
  innerPadding?: string
  bgHex?: string
  lg?: string
}

const SubscribeWidget: React.FC<Props> = ({ className, bgHex = "" }) => {
  return (
    <div className={`card ${className}`} style={{ backgroundColor: bgHex }}>
      <div className={`content d-flex flex-column flex-column-fluid" id="kt_content`}>
        <div className="post d-flex flex-column-fluid" id="kt_post">
          <div id="kt_content_container" className="container-xxl">
            <div className="card-body pt-0">
              <div className="card-px text-center py-10">
                <h2 className="fs-2x fw-bolder mb-10">Subscribe to Activate</h2>
                <p className="text-gray-400 fs-4 fw-bold mb-10">
                  Add a subscription to create communities and activities
                </p>
                <div className="text-center px-4 mb-10">
                  <img
                    className="mw-100 mh-300px"
                    alt=""
                    src={toAbsoluteUrl("/media/images/EmptyState.png")}
                  />
                </div>
                <Link to={"/billing/plan"} className="btn btn-mc-secondary">
                  Add Subscription
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SubscribeWidget };
