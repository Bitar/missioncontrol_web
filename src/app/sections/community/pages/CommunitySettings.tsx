import React, { FC, useState } from "react";
import { CommunityFormType, initialCommunityFormTypeByCommunity } from "../models/Community";
import { ID, KTCard, KTCardBody, QUERIES } from "../../../../_metronic/helpers";
import { useCommunity } from "../CommunityContext";
import { KTCardHeader } from "../../../helpers/components/KTCardHeader";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { GeneralDetail } from "../partials/community-form-steps/GeneralDetail";
import { ContactDetails } from "../partials/community-form-steps/ContactDetails";
import { AddressDetails } from "../partials/community-form-steps/AddressDetails";
import { AccessDetail } from "../partials/community-form-steps/AccessDetail";
import {
  PermissionDetails
} from "../partials/community-form-steps/permission/PermissionDetails";
import { SuspenseView } from "../../../layout/SuspenseView";
import { QueryRequestProvider } from "../../../modules/table/QueryRequestProvider";
import { QueryResponseProvider } from "../../../modules/table/QueryResponseProvider";
import { getCommunityPermissions } from "../core/CommunityPermissionRequests";
import { ListViewProvider } from "../../../modules/table/ListViewProvider";

type Props = {
  communityId?: ID
}

const CommunitySettings: FC<Props> = () => {
  const { community } = useCommunity();
  const [communityForm, setCommunityForm] = useState<CommunityFormType>(
    initialCommunityFormTypeByCommunity(community)
  );

  const settingsNav = [
    {
      title: "Details",
      description: "Basic Details",
      icon: "fas fa-file"
    },
    {
      title: "Contact",
      description: "Who shall we speak to",
      icon: "fas fa-phone"
    },
    {
      title: "Address",
      description: "Where art thou?",
      icon: "fas fa-map-marker"
    },
    {
      title: "Access",
      description: "You can do what again?",
      icon: "fas fa-key"
    },
    {
      title: "Permissions",
      description: "Let's add people",
      icon: "fas fa-users"
    }
  ];

  return (
    <>
      <KTCard>
        <KTCardHeader text={'Settings'} className='bg-mc-secondary' text_color='white'/>
        <KTCardBody>
          <Tab.Container defaultActiveKey="settingsNav-0">
            <div className="row">
              <div className="col-lg-4 col-xl-3">
                <Nav variant="pills" className="flex-column settings-nav">
                  {settingsNav.map((settings, index) => (
                    <Nav.Item key={`settings-nav-${index}`} className="mb-5">
                      <Nav.Link className="settings-nav-item" eventKey={`settingsNav-${index}`}>
                        <div className="settings-nav-icon w-45px h-45px bg-transparent">
                          <i className={`${settings.icon} fs-2x text-mc-secondary`}></i>
                        </div>
                        <div className="settings-nav-label">
                          <span className="settings-nav-title">{settings.title}</span>
                          <span className="settings-nav-desc">{settings.description}</span>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </div>
              <div className="col-lg-8 col-xl-9">
                <Tab.Content>
                  <Tab.Pane eventKey="settingsNav-0">
                    <GeneralDetail communityForm={communityForm} setCommunityForm={setCommunityForm}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="settingsNav-1">
                    <ContactDetails communityForm={communityForm} setCommunityForm={setCommunityForm}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="settingsNav-2">
                    <AddressDetails communityForm={communityForm} setCommunityForm={setCommunityForm}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="settingsNav-3">
                    <AccessDetail communityForm={communityForm} setCommunityForm={setCommunityForm}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="settingsNav-4">
                    <SuspenseView>
                      {community && (
                        <QueryRequestProvider>
                          <QueryResponseProvider
                            id={QUERIES.COMMUNITIES_PERMISSIONS_LIST}
                            requestFunction={getCommunityPermissions}
                            requestId={community?.id}
                          >
                            <ListViewProvider>
                              <PermissionDetails/>
                            </ListViewProvider>
                          </QueryResponseProvider>
                        </QueryRequestProvider>
                      )}
                    </SuspenseView>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </div>
          </Tab.Container>
        </KTCardBody>
      </KTCard>
    </>
  );
};

export { CommunitySettings };
