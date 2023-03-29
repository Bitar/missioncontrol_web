import React, { FC, useEffect, useRef, useState } from "react";
import { PageLink, PageTitle } from "../../layout/core";
import { getCommunityById } from "../../sections/community/core/CommunityRequests";
import { Community } from "../../models/community/Community";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import { CommunityUsers } from "../../sections/community/partials/community-view/CommunityUsers";
import { CommunityInfo } from "../../sections/community/partials/CommunityInfo";
import { CommunitySettings } from "../../sections/community/pages/CommunitySettings";
import { CommunityContext } from "../../sections/community/core/CommunityContext";
import { User } from "../../sections/iam/user/core/User";
import { SuspenseView } from "../../layout/SuspenseView";
import {
  CommunityAnnouncement,
  CommunityAnnouncementEdit
} from "../../sections/community/partials/community-view/CommunityAnnouncement";
import CommunityActivities from "../../sections/community/partials/community-view/CommunityActivities";
import CommunityOverview from "../../sections/community/partials/community-view/CommunityOverview";


type Props = {
  communityId?: number
}

const CommunityViewRoutes: FC<Props> = ({ communityId }) => {
  const [community, setCommunity] = useState<Community | undefined>();
  const [members, setMembers] = useState<User[] | undefined>([]);
  const params = useParams();
  const indexLink = useRef("");
  const link = useRef("");
  const links = [
    {
      text: "Overview",
      link: link.current
    },
    {
      text: "Activities",
      link: link.current + "/activities"
    },
    {
      text: "Members",
      link: link.current + "/members"
    },
    {
      text: "Announcements",
      link: link.current + "/announcements"
    },
    {
      text: "Settings",
      link: link.current + "/settings"
    }
  ];

  const communityViewBreadCrumbs: Array<PageLink> = [
    {
      title: "Communities",
      path: "/communities",
      isSeparator: false,
      isActive: false
    },
    {
      title: "",
      path: "",
      isSeparator: true,
      isActive: false
    },
    {
      title: community?.name || "",
      path: "/communities/" + params.communityId,
      isSeparator: false,
      isActive: false
    },
    {
      title: "",
      path: "",
      isSeparator: true,
      isActive: false
    }
  ];

  useEffect(() => {
    updateCommunity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityId, params.communityId]);

  const updateCommunity = () => {
    if (params.communityId) {
      getCommunityById(params.communityId).then((response) => {
        setCommunity(response);
      });

      link.current = "/communities/" + params.communityId;
      indexLink.current = "/communities/" + params.communityId;
    } else {
      getCommunityById(communityId).then((response) => {
        setCommunity(response);
      });

      link.current = "/dashboard";
      indexLink.current = "/dashboard/overview";
    }
  };

  return (
    <CommunityContext.Provider
      value={{
        community,
        setCommunity,
        updateCommunity,
        members,
        setMembers,
        link: link.current
      }}>
      <Routes>
        <Route
          element={
            community && (
              <>
                <CommunityInfo links={links} />
                <Outlet />
              </>
            )
          }>
          <Route
            index
            element={
              <>
                <PageTitle breadcrumbs={communityViewBreadCrumbs}>Overview</PageTitle>
                <CommunityOverview/>
              </>
            }
          />
          <Route
            path="activities"
            element={
              <>
                <PageTitle breadcrumbs={communityViewBreadCrumbs}>Activities</PageTitle>
                <CommunityActivities />
              </>
            }
          />
          <Route
            path="members"
            element={
              <>
                <PageTitle breadcrumbs={communityViewBreadCrumbs}>Members</PageTitle>
                <CommunityUsers />
              </>
            }
          />
          <Route
            path="announcements"
            element={
              <>
                <PageTitle breadcrumbs={communityViewBreadCrumbs}>Announcements</PageTitle>
                <CommunityAnnouncement />
              </>
            }
          />
          <Route
            path="/announcements/:announcementId/edit"
            element={
              <SuspenseView>
                <PageTitle breadcrumbs={communityViewBreadCrumbs}>Edit Announcement</PageTitle>
                <CommunityAnnouncementEdit />
              </SuspenseView>
            }
          />
          <Route
            path="settings"
            element={
              <>
                <PageTitle breadcrumbs={communityViewBreadCrumbs}>Settings</PageTitle>
                <CommunitySettings />
              </>
            }
          />
        </Route>
      </Routes>
    </CommunityContext.Provider>
  );
};

export { CommunityViewRoutes };
