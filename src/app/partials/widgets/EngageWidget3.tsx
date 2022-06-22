/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom';
import {toAbsoluteUrl} from "../../../_metronic/helpers";


type Props = {
    className?: string
    bgColor?: string
    bgImage?: string
    innerPadding?: string
    bgHex?: string
    lg?: string
}

const EngageWidget3: React.FC<Props> = (
    {
        className,
        bgHex = '',
    }) => {

    return (
        <div className={`card ${className}`}
        style={{ backgroundColor: bgHex }}>
            <div className={`content d-flex flex-column flex-column-fluid" id="kt_content`}>
                <div className="post d-flex flex-column-fluid" id="kt_post">
                    <div id="kt_content_container" className="container-xxl">
                        <div className="card">
                        <div className="card-body p-0">    
                        <div className="card-px text-center py-20 my-10">   
                            <h2 className="fs-2x fw-bolder mb-10">Admins, Create a Community</h2>
                            <p className="text-gray-400 fs-4 fw-bold mb-10">If you are on Mission Control to host a community and recreational esports activities, start by creating a community here!</p>      
                            <Link to={'/community/create'} className="btn btn-primary">Create Community</Link>                 
                        </div>
                         <div className='mt-4'> 
                        <div className="text-center px-4">
                            <img className="mw-100 mh-300px" alt=""src={toAbsoluteUrl('media/avatars/EmptyStateimg.png')} />
                        </div>          
                        </div>           
                    </div>  
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}

export {EngageWidget3}
