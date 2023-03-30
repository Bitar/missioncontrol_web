import React, {FC} from 'react'
import {useAuth} from '../../modules/auth'
import {isCommunityAdmin, isSuperAdmin} from '../../models/iam/User'
import {CommunityViewRoutes} from '../../routes/community/CommunityViewRoutes'
import {SuperAdmin} from './partials/SuperAdmin'

const DashboardWrapper: FC<React.PropsWithChildren<unknown>> = () => {
  const {currentUser, communityAdmin} = useAuth()

  return (
    <>
      {currentUser &&
        (isSuperAdmin(currentUser) ? (
          <SuperAdmin />
        ) : (
          isCommunityAdmin(currentUser) &&
          communityAdmin && <CommunityViewRoutes communityId={communityAdmin?.id} />
        ))}
    </>
  )
}

export {DashboardWrapper}
