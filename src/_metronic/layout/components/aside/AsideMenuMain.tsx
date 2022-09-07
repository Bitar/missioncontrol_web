import React from 'react'
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {Restricted} from '../../../../app/modules/auth/core/AuthPermission'
import {useAuth} from '../../../../app/modules/auth'
import {isUserCommunityAdmin} from '../../../../app/sections/identity/user/models/User'

export function AsideMenuMain() {
  const intl = useIntl()
  const {currentUser} = useAuth()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/gen001.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
      />

      {currentUser && !isUserCommunityAdmin(currentUser) && (
        <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Sections</span>
          </div>
        </div>
      )}

      <Restricted to='view-communities'>
        <AsideMenuItem
          to='/communities'
          title='Communities'
          fontIcon={'fa-people-group'}
          menuIcon='font'
        />
      </Restricted>
      <Restricted to='view-activities'>
        <AsideMenuItem to='/activities' title='Activities' fontIcon={'fa-burger'} menuIcon='font' />
      </Restricted>
      <Restricted to='view-games'>
        <AsideMenuItem to='/games' title='Games' fontIcon={'fa-gamepad'} menuIcon='font' />
      </Restricted>

      {currentUser && !isUserCommunityAdmin(currentUser) && (
        <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Settings</span>
          </div>
        </div>
      )}

      <Restricted to='view-plans'>
        <AsideMenuItem
          to='/plans'
          title='Plans'
          icon='/media/icons/duotune/gen022.svg'
        ></AsideMenuItem>
      </Restricted>

      <Restricted to='view-subscriptions'>
        <AsideMenuItem
          to='/subscriptions'
          title='Subscriptions'
          // fontIcon='bi-archive'
          icon='/media/icons/duotune/gen022.svg'
        ></AsideMenuItem>
      </Restricted>

      <Restricted to='view-users'>
        <AsideMenuItemWithSub
          to={['/users', '/roles', '/permissions']}
          title='Identity'
          fontIcon={'fa-users'}
          menuIcon='font'
        >
          <AsideMenuItem to='/users' title='Users' hasBullet={true} />
          <AsideMenuItem to='/roles' title='Roles' hasBullet={true} />
          <AsideMenuItem to='/permissions' title='Permissions' hasBullet={true} />
        </AsideMenuItemWithSub>
      </Restricted>
    </>
  )
}
