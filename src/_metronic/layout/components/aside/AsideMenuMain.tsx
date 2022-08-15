/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useIntl } from "react-intl";
import { AsideMenuItem } from "./AsideMenuItem";
import { faPeopleGroup, faUsers, faGamepad, faBurger } from "@fortawesome/free-solid-svg-icons";
import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";

export function AsideMenuMain() {
  const intl = useIntl();

  return (
    <>
      <AsideMenuItem
        to="/dashboard"
        icon="/media/icons/duotune/general/gen001.svg"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
      />
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">Sections</span>
        </div>
      </div>
      <AsideMenuItem
        to="/communities"
        title="Communities"
        fontIcon={faPeopleGroup}
        menuIcon="font"
      ></AsideMenuItem>
      <AsideMenuItem
        to="/activities"
        title="Activities"
        fontIcon={faBurger}
        menuIcon="font"
      ></AsideMenuItem>

      <AsideMenuItem to="/games" title="Games" fontIcon={faGamepad} menuIcon="font"></AsideMenuItem>

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">Settings</span>
        </div>
      </div>

      <AsideMenuItem
        to="/plans"
        title="Plans"
        // fontIcon='bi-archive'
        icon="/media/icons/duotune/general/gen022.svg"
      ></AsideMenuItem>

      <AsideMenuItem
        to="/subscriptions"
        title="Subscriptions"
        // fontIcon='bi-archive'
        icon="/media/icons/duotune/general/gen022.svg"
      ></AsideMenuItem>

      <AsideMenuItemWithSub
        to={["/users", "/roles", "/permissions"]}
        title="Identity"
        fontIcon={faUsers}
        menuIcon="font"
      >
        <AsideMenuItem to="/users" title="Users" hasBullet={true} />
        <AsideMenuItem to="/roles" title="Roles" hasBullet={true} />
        <AsideMenuItem to="/permissions" title="Permissions" hasBullet={true} />
      </AsideMenuItemWithSub>
    </>
  );
}
