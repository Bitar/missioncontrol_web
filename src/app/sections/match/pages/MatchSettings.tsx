import { KTCard, KTCardBody, KTCardHeader } from "../../../helpers/components";
import { Tab } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import React, { FC, useEffect, useRef } from "react";
import { ScoreSettings } from "../partials/ScoreSettings";
import { Match } from "../../activity/models/matches/Match";
import { defaultScoreSettings, initScoreSettings } from "../../activity/models/matches/Score";
import { useActivity } from "../../activity/core/contexts/ActivityContext";

type Props = {
  match: Match | undefined
}

export const MatchSettings: FC<Props> = ({ match }) => {
  const {activity} = useActivity()

  const settingsNav = [
    {
      title: "Scores",
      description: "Update Scores",
      icon: "fa-duotone fa-hundred-points"
    }
  ];

  return (
    <KTCard className="mb-5">
      <KTCardHeader text={"Settings"} className="bg-mc-secondary" text_color="white" />
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
                  <ScoreSettings/>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </KTCardBody>
    </KTCard>
  );
};