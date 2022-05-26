/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
    const intl = useIntl()

    return (
        <>
            <AsideMenuItem
                to='/dashboard'
                icon='/media/icons/duotune/art/art002.svg'
                title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
                fontIcon='bi-app-indicator'
            />
            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Sections</span>
                </div>
            </div>
            <AsideMenuItem
                to='/activities'
                title='Activities'
                fontIcon='bi-archive'
                icon='/media/icons/duotune/general/gen022.svg'
            >
            </AsideMenuItem>

            <AsideMenuItem
                to='/games'
                title='Games'
                fontIcon='bi-archive'
                icon='/media/icons/duotune/general/gen022.svg'
            >
            </AsideMenuItem>
            <AsideMenuItem
                to='/marketing'
                title='marketing'
                fontIcon='bi-archive'
                icon='/media/icons/duotune/general/gen022.svg'
            >
            </AsideMenuItem>

            <AsideMenuItem
                to='/support'
                title='support'
                fontIcon='bi-archive'
                icon='/media/icons/duotune/general/gen022.svg'
            >
            </AsideMenuItem>


            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Settings</span>
                </div>
            </div>

            <AsideMenuItem
                to='/plans'
                title='Plans'
                fontIcon='bi-archive'
                icon='/media/icons/duotune/general/gen022.svg'
            >
            </AsideMenuItem>

            <AsideMenuItem
                to='/roles'
                title='Roles'
                fontIcon='bi-archive'
                icon='/media/icons/duotune/general/gen022.svg'
            >
            </AsideMenuItem>

            <AsideMenuItem
                to='/permissions'
                title='Permissions'
                fontIcon='bi-archive'
                icon='/media/icons/duotune/general/gen022.svg'
            >
            </AsideMenuItem>

            {/*<AsideMenuItemWithSub*/}
            {/*    to=''*/}
            {/*    title='roles'*/}
            {/*    fontIcon='bi-archive'*/}
            {/*    icon='/media/icons/duotune/general/gen022.svg'*/}
            {/*>*/}
            {/*    <AsideMenuItem to='/roles/' title='List Roles'/>*/}
            {/*    <AsideMenuItem to='/roles/create' title='Create Role'/>*/}
            {/*</AsideMenuItemWithSub>*/}
        </>
    )
}
