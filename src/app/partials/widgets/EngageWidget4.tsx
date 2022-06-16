/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {toAbsoluteUrl} from "../../../_metronic/helpers";
import {Link} from "react-router-dom";
import {useAuth} from "../../modules/auth";

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

    const {subscription} = useAuth()


    return (
        <><div className={`card ${className}`}
            style={{ backgroundColor: bgHex }}>
            <div className={`card-body ps-xl-15 d-flex`}>
                <div className="m-0">
                    <div className="position-relative fs-2x z-index-2 fw-bolder text-white mb-7">
                        <span className="me-2">Create your first Community</span>
                    </div>
                    <div className="mb-3">
                        {!subscription ? (
                            <Link to={'/billing/plan'} className="btn btn-primary fw-bold me-2">Create Community</Link>
                        ) : (
                            <Link to={'/community/create'} className="btn primary fw-bold me-2">Create Community</Link>
                        )}
                    </div>
                </div>

                <img src={toAbsoluteUrl('media/support/astroicon1.svg')}
                    className="position-absolute me-3 bottom-0 end-0 h-150px" alt="" />
            </div>
        </div>
            
            <div className='mt-4'>
            <div className={`card ${className}`}
            style={{ backgroundColor: bgHex }}>
                <div className={`card-body ps-xl-15 d-flex `}>
                    <div className="m-0">
                        <div className="position-relative fs-2x z-index-2 fw-bolder text-white mb-7">
                            <span className="me-2">Download our App</span>
                        </div>
                        <div className="mb-3">
                        <a href='https://apps.apple.com/us/app/mission-control-gg/id1477441476' target="_blank" rel="noreferrer" className="btn btn-primary fw-bold me-2">Click to Download</a>  
                        </div>
                    </div>

                    <img src={toAbsoluteUrl('media/support/rocket-icon.svg')}
                        className="position-absolute me-3 bottom-0 end-0 h-150px" alt="" />
                </div>



            </div>
            </div>
            </>

        
    )
}

export {EngageWidget4}
