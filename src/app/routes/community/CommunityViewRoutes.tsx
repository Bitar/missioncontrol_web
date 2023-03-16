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

type Props = {
  communityId?: number
  links?: { text: string; link: string }[]
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
      text: "Members",
      link: link.current + "/members"
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
        setMembers
      }}
    >
      <Routes>
        <Route
          element={
            community && (
              <>
                <CommunityInfo links={links} />
                <Outlet />
              </>
            )
          }
        >
          <Route
            index
            element={
              <>
                <PageTitle breadcrumbs={communityViewBreadCrumbs}>Overview</PageTitle>
                {/*<Overview />*/}
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
            path="settings"
            element={
              <>
                <PageTitle breadcrumbs={communityViewBreadCrumbs}>Settings</PageTitle>
                <CommunitySettings />
                {/*{params.communityId ? (*/}
                {/*) : (*/}
                {/*  <CommunitySettings />*/}
                {/*  // <CommunityAdminSettings />*/}
                {/*)}*/}
              </>
            }
          />
        </Route>
      </Routes>
    </CommunityContext.Provider>
  );
};

export { CommunityViewRoutes };
