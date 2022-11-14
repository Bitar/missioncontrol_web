import React, { FC } from "react";
import { useAuth } from "../../modules/auth";
import { isCommunityAdmin, isSuperAdmin } from "../../sections/identity/user/models/User";
import { CommunityView } from "../../sections/community/pages/CommunityView";
import { CreateCommunityWidget } from "../../layout/widgets/CreateCommunityWidget";

const DashboardWrapper: FC<React.PropsWithChildren<unknown>> = () => {
  const { currentUser, communityAdmin } = useAuth();

  const communityLinks = [
    {
      text: "Overview",
      link: "/dashboard/overview"
    },
    {
      text: "Members",
      link: "/dashboard/members"
    }
  ];

  return (
    <>
      {currentUser &&
        (currentUser && isCommunityAdmin(currentUser) && communityAdmin ? (
          <CommunityView communityId={communityAdmin?.id} links={communityLinks}></CommunityView>
        ) : (
          <div className="row gy-5 g-xl-8">
            <div className="col-xl-12">
              {!communityAdmin && !isSuperAdmin(currentUser) ? (
                <CreateCommunityWidget bgHex={"#FFFFFF"} type="create-community" />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export { DashboardWrapper };
