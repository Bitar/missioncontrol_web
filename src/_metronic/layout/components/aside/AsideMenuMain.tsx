/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {AsideMenuItem} from './AsideMenuItem'
import {faPeopleGroup, faGamepad} from '@fortawesome/free-solid-svg-icons'

export function AsideMenuMain() {
    const intl = useIntl()

    return (
        <>
            <AsideMenuItem
                to='/dashboard'
                icon='/media/icons/duotune/general/gen001.svg'
                title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
            />
            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Sections</span>
                </div>
            </div>
            <AsideMenuItem
                to='/communities'
                title='Communities'
                fontIcon={faPeopleGroup}
                menuIcon='font'
            >
            </AsideMenuItem>
            <AsideMenuItem
                to='/activities'
                title='Activities'
                // fontIcon='bi-archive'
                icon='/media/icons/duotune/general/gen022.svg'
            >
            </AsideMenuItem>

            <AsideMenuItem
                to='/games'
                title='Games'
                fontIcon={faGamepad}
                menuIcon='font'
            >
            </AsideMenuItem>

            {/*<AsideMenuItem*/}
            {/*    to='/marketing'*/}
            {/*    title='Marketing'*/}
            {/*    // fontIcon='bi-archive'*/}
            {/*    icon='/media/icons/duotune/general/gen022.svg'*/}
            {/*>*/}
            {/*</AsideMenuItem>*/}

            {/*<AsideMenuItem*/}
            {/*    to='/support'*/}
            {/*    title='Support'*/}
            {/*    // fontIcon='bi-archive'*/}
            {/*    icon='/media/icons/duotune/general/gen022.svg'*/}
            {/*>*/}
            {/*</AsideMenuItem>*/}


            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Settings</span>
                </div>
            </div>

            <AsideMenuItem
                to='/plans'
                title='Plans'
                // fontIcon='bi-archive'
                icon='/media/icons/duotune/general/gen022.svg'
            >
            </AsideMenuItem>

            <AsideMenuItem
                to='/subscriptions'
                title='Subscriptions'
                // fontIcon='bi-archive'
                icon='/media/icons/duotune/general/gen022.svg'
            >
            </AsideMenuItem>

            <AsideMenuItem
                to='/users'
                title='Users'
                // fontIcon='bi-archive'
                icon='/media/icons/duotune/general/gen022.svg'
            >
            </AsideMenuItem>

            <AsideMenuItem
                to='/roles'
                title='Roles'
                // fontIcon='bi-archive'
                icon='/media/icons/duotune/general/gen022.svg'
            >
            </AsideMenuItem>

            <AsideMenuItem
                to='/permissions'
                title='Permissions'
                // fontIcon='bi-archive'
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
