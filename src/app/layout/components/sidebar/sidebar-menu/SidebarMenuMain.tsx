/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useAuth} from '../../../../modules/auth'
import {Restricted} from '../../../../modules/auth/core/AuthPermission'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {isCommunityAdmin} from '../../../../sections/identity/user/models/User'

const SidebarMenuMain = () => {
  const intl = useIntl()
  const {currentUser, communityAdmin} = useAuth()

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
      />

      <Restricted to='view-communities'>
        <SidebarMenuItem to='/communities' title='Communities' fontIcon='fa-people-group' />
      </Restricted>
      {currentUser && isCommunityAdmin(currentUser) ? (
        communityAdmin && (
          <Restricted to='view-activities'>
            <SidebarMenuItem to='/activities' title='Activities' fontIcon='fa-gamepad' />
          </Restricted>
        )
      ) : (
        <Restricted to='view-activities'>
          <SidebarMenuItem to='/activities' title='Activities' fontIcon='fa-gamepad' />
        </Restricted>
      )}

      <Restricted to='view-games'>
        <SidebarMenuItem to='/games' title='Games' fontIcon='fa-chess-pawn' />
      </Restricted>

      <Restricted to='view-users'>
        <SidebarMenuItemWithSub
          to={['/users', '/roles', '/permissions']}
          title='Identity'
          fontIcon='fa-users'
        >
          <SidebarMenuItem to='/users' title='Users' hasBullet={true} />
          <SidebarMenuItem to='/roles' title='Roles' hasBullet={true} />
          <SidebarMenuItem to='/permissions' title='Permissions' hasBullet={true} />
        </SidebarMenuItemWithSub>
      </Restricted>

      <Restricted to='view-games'>
        <SidebarMenuItem to='/resources' title='Resources' fontIcon='fa-file' />
      </Restricted>
    </>
  )
}

export {SidebarMenuMain}
