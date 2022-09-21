/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { toAbsoluteUrl } from "../../../_metronic/helpers";

type Props = {
  className?: string
  bgColor?: string
  bgImage?: string
  innerPadding?: string
  bgHex?: string
  lg?: string
}

const DownloadAppWidget: React.FC<Props> = ({ className, bgHex = "" }) => {
  return (
    <div className="mt-10">
      <div className={`card ${className}`} style={{ backgroundColor: bgHex }}>
        <div className={`card-body ps-xl-15 d-flex `}>
          <div className="m-0">
            <div className="position-relative fs-2x z-index-2 fw-bolder text-white mb-7">
              <span className="me-2">Players, Download the App</span>
              <p className="text-white fw-bold fs-5 mt-1 mb-7">
                If you are on Mission Control to play in leagues and tournaments, you can only do
                that by downloading our mobile app!
              </p>
            </div>
            <div className="mb-3">
              <a
                href="https://missioncontrol.app.link/z7antLdv1qb"
                target="_blank"
                rel="noreferrer"
                className="btn btn-mc-secondary fw-bold me-2"
              >
                Download App
              </a>
            </div>
          </div>
          <img
            src={toAbsoluteUrl("media/avatars/AstroPlay.png")}
            className="position-absolute ml-20 bottom-20 end-0 h-150px"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export { DownloadAppWidget };
