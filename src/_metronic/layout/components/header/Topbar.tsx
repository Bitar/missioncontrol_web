import clsx from 'clsx'
import React, {FC} from 'react'
import {toAbsoluteUrl} from '../../../helpers'
import {HeaderUserMenu} from '../../../partials'
import {CommunityPicker} from "../../../../app/layout/partials/community-picker/CommunityPicker";
import {useAuth} from "../../../../app/modules/auth";

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
    toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const Topbar: FC = () => {
    const {currentUser} = useAuth()

    return (
        <div className='d-flex align-items-stretch flex-shrink-0'>
            {/* Search */}
            {/*<div className={clsx('d-flex align-items-stretch', toolbarButtonMarginClass)}>*/}
            {/*    <Search/>*/}
            {/*</div>*/}

            {/*  Community Picker*/}
            <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
                <CommunityPicker/>
            </div>

            {/* begin::User */}
            <div
                className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
                id='kt_header_user_menu_toggle'
            >
                {/* begin::Toggle */}
                <div
                    className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
                    data-kt-menu-trigger='click'
                    data-kt-menu-attach='parent'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='bottom'
                >
                    <img alt={currentUser?.name + ' image'} src={toAbsoluteUrl("/media/avatars/blank.png")} />
                    {/*<img alt={currentUser?.name + ' image'} src={currentUser?.meta?.image}/>*/}
                </div>
                <HeaderUserMenu/>
                {/* end::Toggle */}
            </div>
            {/* end::User */}

            {/* begin::Aside Toggler */}
            {/*{config.header.left === 'menu' && (*/}
            {/*    <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>*/}
            {/*        <div*/}
            {/*            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'*/}
            {/*            id='kt_header_menu_mobile_toggle'*/}
            {/*        >*/}
            {/*            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1'/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    )
}

export {Topbar}
