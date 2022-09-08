import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {useAuth} from '../../modules/auth'
import {isUserCommunityAdmin} from '../../sections/identity/user/models/User'
import {CommunityView} from '../../sections/community/pages/CommunityView'
// import Pusher from "pusher-js";

// const DashboardPage: FC<React.PropsWithChildren<unknown>> = () => {
//   // const pusher = new Pusher("ef3138c351470ed98d7b", {
//   //   cluster: "us2"
//   // });
//   // const channel = pusher.subscribe('match-113-chat');
//   //
//   // channel.bind('MessageSent', function(data: any) {
//   //   console.log(data)
//   //   return data
//   // });
//
//   return <></>
// }

const DashboardWrapper: FC<React.PropsWithChildren<unknown>> = () => {
  const intl = useIntl()
  const {currentUser, communityAdmin} = useAuth()

  const communityLinks = [
    {
      text: 'Overview',
      link: '/dashboard/overview',
    },
    // {
    //   text: 'Activities',
    //   link: '/activities',
    // },
    {
      text: 'Members',
      link: '/dashboard/members',
    },
    {
      text: 'Settings',
      link: '/dashboard/settings',
    },
  ]

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>

      {currentUser && isUserCommunityAdmin(currentUser) && (
        <CommunityView communityId={communityAdmin?.id} links={communityLinks}></CommunityView>
      )}

      {/*<DashboardPage />*/}
    </>
  )
}

export {DashboardWrapper}
