import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import clsx from "clsx";

const CommunityPicker: FC = () => {
    const isActive = false;

    return (
        <div className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'>

            <div
                className="btn btn-icon btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
                data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end"
                data-kt-menu-flip="bottom">
                <i className="fa-solid fa-sun fs-2"/>
            </div>

            <div
                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-bold py-4 fs-6 w-200px"
                data-kt-menu="true">
                <div className="menu-item px-3 my-1">
                    <Link className={clsx('menu-link px-3', {active: isActive})} to="/light">
                        <span className="menu-icon">
                            <i className="fa-solid fa-sun fs-2"/>
                        </span>
                        <span className="menu-title">Light</span>
                    </Link>
                </div>

                <div className="menu-item px-3 my-1">
                    <Link className={clsx('menu-link px-3', {active: isActive})} to="/dark">
                        <span className="menu-icon">
                            <i className="fa-solid fa-moon fs-2"/>
                        </span>
                        <span className="menu-title">Dark</span>
                    </Link>
                </div>

            </div>

        </div>
    )
}

export {CommunityPicker}
