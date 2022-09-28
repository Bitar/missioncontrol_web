import React, {FC} from 'react'
// import { useIntl } from "react-intl";
import {useAuth} from '../../modules/auth'
import {isUserCommunityAdmin, isUserSuperAdmin} from '../../sections/identity/user/models/User'
import {CommunityView} from '../../sections/community/pages/CommunityView'
import {CreateCommunityWidget} from '../../layout/widgets/CreateCommunityWidget'
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
  // const intl = useIntl()
  const {currentUser, communityAdmin, subscription} = useAuth()

  const communityLinks = [
    {
      text: 'Overview',
      link: '/dashboard/overview',
    },
    {
      text: 'Members',
      link: '/dashboard/members',
    },
  ]

  return (
    <>
      {currentUser &&
        (currentUser && isUserCommunityAdmin(currentUser) && communityAdmin ? (
          <CommunityView communityId={communityAdmin?.id} links={communityLinks}></CommunityView>
        ) : (
          <div className='row gy-5 g-xl-8'>
            <div className='col-xl-12'>
              {!communityAdmin && !isUserSuperAdmin(currentUser) ? (
                subscription ? (
                  <CreateCommunityWidget bgHex={'#FFFFFF'} type='create-community' />
                ) : (
                  <CreateCommunityWidget bgHex={'#FFFFFF'} />
                )
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ))}
    </>
  )
}

export {DashboardWrapper}
