/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {toAbsoluteUrl} from "../../../_metronic/helpers";
import {Link} from "react-router-dom";

type Props = {
    className?: string
    bgColor?: string
    bgImage?: string
    innerPadding?: string
    bgHex?: string
    lg?: string
}

const EngageWidget4: React.FC<Props> = (
    {
        className,
        bgHex = '',
    }) => {

    return (
        <div className={`card ${className}`}
             style={{backgroundColor: bgHex}}>
            <div
                className={`card-body ps-xl-15 d-flex`}
            >
                <div className="m-0">
                    <div className="position-relative fs-2x z-index-2 fw-bolder text-white mb-7">
                        <span className="me-2">Create your first Community</span>
                    </div>

                    <div className="mb-3">
                        <Link to={'/billing/plan'} className="btn btn-danger fw-bold me-2">Create Community</Link>
                    </div>
                </div>

                <img src={toAbsoluteUrl('media/illustrations/sigma-1/17-dark.png')}
                     className="position-absolute me-3 bottom-0 end-0 h-200px" alt=""/>
            </div>
        </div>
    )
}

export {EngageWidget4}
