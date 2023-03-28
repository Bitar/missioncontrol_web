import React, { FC } from "react";
import { useAuth } from "../../modules/auth";
import { isCommunityAdmin, isSuperAdmin } from "../../sections/iam/user/core/User";
import { CommunityViewRoutes } from "../../routes/community/CommunityViewRoutes";
import { SuperAdmin } from "./partials/SuperAdmin";

const DashboardWrapper: FC<React.PropsWithChildren<unknown>> = () => {
  const { currentUser, communityAdmin } = useAuth();

  return (
    <>
      {currentUser && (
        isSuperAdmin(currentUser) ? (
          <SuperAdmin />
        ) : (
          isCommunityAdmin(currentUser) && communityAdmin && (
            <CommunityViewRoutes communityId={communityAdmin?.id} />
          )
        )
      )}
    </>
  );
};

export { DashboardWrapper };
