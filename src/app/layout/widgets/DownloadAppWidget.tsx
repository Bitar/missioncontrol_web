/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import { Link } from "react-router-dom";

type Props = {
  className?: string
  bgColor?: string
  bgImage?: string
  innerPadding?: string
  bgHex?: string
  lg?: string
}

const DownloadAppWidget: React.FC<Props> = ({className, bgHex = ''}) => {
  return (
    <div className={`card ${className} bg-mc-secondary`} style={{backgroundColor: bgHex}}>
      <div className={`content d-flex flex-column flex-column-fluid" id="kt_content`}>
        <div className='post d-flex flex-column-fluid' id='kt_post'>
          <div id='kt_content_container' className='container-xxl'>
            <div className='card-body pt-0'>
              <div className='card-px text-center py-10'>
                <h2 className='fs-2x fw-bolder mb-10 text-white'>Players, Download the App</h2>
                <p className='fs-4 fw-bold mb-10 text-white'>
                  If you are on Mission Control to play in leagues and tournaments, you can only do
                  that by downloading our mobile app!
                </p>
                <div className='text-center px-4 mb-10'>
                  <img
                    className='mw-100 mh-300px'
                    alt=''
                    src={toAbsoluteUrl('media/avatars/AstroPlay.png')}
                  />
                </div>
                <a
                  href='https://missioncontrol.app.link/z7antLdv1qb'
                  target='_blank'
                  rel='noreferrer'
                  className='btn btn-mc-primary fw-bold me-2'>
                  Download App
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {DownloadAppWidget}
