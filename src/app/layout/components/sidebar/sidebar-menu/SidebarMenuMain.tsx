/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useIntl } from "react-intl";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useAuth } from "../../../../modules/auth";
import { isUserCommunityAdmin } from "../../../../sections/identity/user/models/User";
import { Restricted } from "../../../../modules/auth/core/AuthPermission";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";

const SidebarMenuMain = () => {
  const intl = useIntl();
  const { currentUser } = useAuth();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="/media/icons/duotune/art002.svg"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
      />

      {currentUser && !isUserCommunityAdmin(currentUser) && (
        <div className="menu-item">
          <div className="menu-content pt-8 pb-2">
            <span className="menu-section text-muted text-uppercase fs-8 ls-1">Sections</span>
          </div>
        </div>
      )}

      <Restricted to="view-communities">
        <SidebarMenuItem to="/communities" title="Communities" fontIcon="fa-people-group" />
      </Restricted>

      <Restricted to="view-activities">
        <SidebarMenuItem to="/activities" title="Activities" fontIcon="fa-gamepad" />
      </Restricted>

      <Restricted to="view-games">
        <SidebarMenuItem to="/games" title="Games" fontIcon="fa-chess-pawn" />
      </Restricted>

      {currentUser && !isUserCommunityAdmin(currentUser) && (
        <>
          <div className="menu-item">
            <div className="menu-content pt-8 pb-2">
              <span className="menu-section text-muted text-uppercase fs-8 ls-1">Settings</span>
            </div>
          </div>
          <SidebarMenuItemWithSub
            to={["/users", "/roles", "/permissions"]}
            title="Identity"
            fontIcon="fa-users"
          >
            <SidebarMenuItem to="/users" title="Users" hasBullet={true} />
            <SidebarMenuItem to="/roles" title="Roles" hasBullet={true} />
            <SidebarMenuItem to="/permissions" title="Permissions" hasBullet={true} />
          </SidebarMenuItemWithSub>
        </>
      )}

      {/*<Restricted to="view-plans">*/}
      {/*  <SidebarMenuItem*/}
      {/*    to="/plans"*/}
      {/*    title="Plans"*/}
      {/*  />*/}
      {/*</Restricted>*/}

      {/*<Restricted to="view-subscriptions">*/}
      {/*  <SidebarMenuItem*/}
      {/*    to="/subscriptions"*/}
      {/*    title="Subscriptions"*/}
      {/*  />*/}
      {/*</Restricted>*/}

      {/*<Restricted to="view-users">*/}
      {/*  <SidebarMenuItem*/}
      {/*    to={['/users', '/roles', '/permissions']}*/}
      {/*    title="Identity"*/}
      {/*  />*/}
      {/*</Restricted>*/}


    </>
  );
};

export { SidebarMenuMain };
