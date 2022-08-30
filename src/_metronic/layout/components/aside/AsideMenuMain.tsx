import React from 'react'
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {Restricted} from '../../../../app/modules/auth/core/AuthPermission'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/gen001.svg'
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
        fontIcon={'fa-people-group'}
        menuIcon='font'
      />
      <AsideMenuItem to='/activities' title='Activities' fontIcon={'fa-burger'} menuIcon='font' />

      <AsideMenuItem to='/games' title='Games' fontIcon={'fa-gamepad'} menuIcon='font' />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Settings</span>
        </div>
      </div>

      <Restricted to='manage-plans'>
        <AsideMenuItem
          to='/plans'
          title='Plans'
          // fontIcon='bi-archive'
          icon='/media/icons/duotune/gen022.svg'
        ></AsideMenuItem>
      </Restricted>

      <AsideMenuItem
        to='/subscriptions'
        title='Subscriptions'
        // fontIcon='bi-archive'
        icon='/media/icons/duotune/gen022.svg'
      ></AsideMenuItem>

      <Restricted to='manage-users'>
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
