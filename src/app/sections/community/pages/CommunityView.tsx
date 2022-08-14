import React, { useEffect, useState } from "react";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { getCommunityById } from "../core/_requests";
import { Community } from "../models/Community";
import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import { CommunityFollower } from "./CommunityFollowers";
import { CommunityInfo } from "../CommunityInfo";
import { CommunityEdit } from "../CommunityEdit";

const CommunityView: React.FC = () => {
  const [community, setCommunity] = useState<Community | undefined>();
  const params = useParams();

  const communityViewBreadCrumbs: Array<PageLink> = [
    {
      title: "Communities",
      path: "/communities/overview",
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
      path: "/communities/" + params.id + "/overview",
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
    const query = "include=contact,address,access";
    getCommunityById(params.id, query).then(response => {
      setCommunity(response);
    });
  }, [params.id]);

  return (
    <Routes>
      <Route
        element={
          <>
            <CommunityInfo community={community} />
            <Outlet />
          </>
        }
      >
        <Route
          path="overview"
          element={
            <>
              <PageTitle breadcrumbs={communityViewBreadCrumbs}>Overview</PageTitle>
              {/*<Overview />*/}
            </>
          }
        />
        <Route
          path="activities"
          element={
            <>
              <PageTitle breadcrumbs={communityViewBreadCrumbs}>Activities</PageTitle>
            </>
          }
        />
        <Route
          path="members"
          element={
            <>
              <PageTitle breadcrumbs={communityViewBreadCrumbs}>Members</PageTitle>
              {/* TODO: Work on the members tab to be a separate component*/}
              <CommunityFollower />
            </>
          }
        />
        <Route
          path="settings"
          element={
            <>
              <PageTitle breadcrumbs={communityViewBreadCrumbs}>Settings</PageTitle>
              <CommunityEdit community={community} setCommunity={setCommunity}/>
            </>
          }
        />
        <Route index element={<Navigate to={"/communities/" + params.id + "/overview"} />} />
      </Route>
    </Routes>
  );
};

export { CommunityView };