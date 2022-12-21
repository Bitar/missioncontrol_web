import React, { useEffect, useRef, useState } from "react";
import { ActivityForm, initialActivityFormByActivity } from "../models/Activity";
import { KTCardBody } from "../../../helpers/components/KTCardBody";
import { KTCard } from "../../../helpers/components/KTCard";
import { useActivity } from "../core/contexts/ActivityContext";
import { jsonToFormData, updateData } from "../../../helpers/form/FormHelper";
import { Community } from "../../community/models/Community";
import { getAllCommunities } from "../../community/core/CommunityRequests";
import { useAuth } from "../../../modules/auth";
import { Game } from "../../../models/game/Game";
import { getAllGameModes, getAllGamePlatforms, getAllGames } from "../../games/core/GameRequests";
import { GameMode } from "../../../models/game/GameMode";
import { Platform } from "../../../models/game/Platform";
import { ID } from "../../../helpers/crud-helper/models";
import { Location } from "../components";
import { DateRangePicker } from "rsuite";
import { DateRange } from "rsuite/esm/DateRangePicker/types";
import { getDateConvertedToLocal } from "../../../helpers/ActivityHelper";
import { TimeZone } from "../../../models/misc/TimeZone";
import { getTimeZones } from "../../misc/core/_requests";
import { useParams } from "react-router-dom";
import { updateActivity } from "../core/requests/ActivityRequests";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { KTCardHeader } from "../../../helpers/components/KTCardHeader";
import Nav from "react-bootstrap/Nav";
import { Tab } from "react-bootstrap";
import { ActivityFormContext } from "../core/contexts/ActivityFormContext";
import { GeneralDetail } from "../partials/activity-form-steps/GeneralDetail";
import { GameDetail } from "../partials/activity-form-steps/GameDetail";
import { ScheduleDetail } from "../partials/activity-form-steps/ScheduleDetail";
import { TeamDetail } from "../partials/activity-form-steps/TeamDetail";
import { EntryFeeDetail } from "../partials/activity-form-steps/EntryFeeDetail";
import { LocationDetail } from "../partials/activity-form-steps/LocationDetail";

const ActivitySettings = () => {
  const { activity, setActivity } = useActivity();
  const [activityForm, setActivityForm] = useState<ActivityForm>(
    initialActivityFormByActivity(activity)
  );
  const [communities, setCommunities] = useState<Community[]>();
  const [games, setGames] = useState<Game[]>();
  const [gameModes, setGameModes] = useState<GameMode[]>();
  const [platforms, setPlatforms] = useState<Platform[]>();
  const [timeZones, setTimeZones] = useState<TimeZone[]>();
  const [registrationValue, setRegistrationValue] = useState<DateRange | null>([
    new Date(),
    new Date()
  ]);
  const [matchPlayValue, setMatchPlayValue] = useState<DateRange | null>([new Date(), new Date()]);
  const [timeValue, setTimeValue] = useState<Date | null>(new Date());
  const [matchPlayDisabledDate, setMatchPlayDisabledDate] = useState<Date>(new Date());
  const selectGameModeRef = useRef<any>();
  const selectPlatformsRef = useRef<any>();
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    getAllCommunities().then((response) => {
      setCommunities(response.data);
    });

    getAllGames().then((response) => {
      setGames(response.data);
    });

    getTimeZones().then((response) => {
      setTimeZones(response.data);
    });
  }, []);

  useEffect(() => {
    setActivityForm(initialActivityFormByActivity(activity));

    if (activity?.game?.id) {
      updateModes(activity.game.id);
    }

    if (activity?.registration_dates) {
      setMatchPlayDisabledDate(new Date(activity?.registration_dates?.end_date * 1000));
      setRegistrationValue([
        dayjs(new Date(activity?.registration_dates?.start_date * 1000))
          .utc(false)
          .tz(activity?.settings?.timezone?.value, true)
          .toDate(),
        dayjs(new Date(activity?.registration_dates?.end_date * 1000))
          .utc(false)
          .tz(activity?.settings?.timezone?.value, true)
          .toDate()
      ]);
    }
    if (activity?.matchplay_dates) {
      setMatchPlayValue([
        dayjs(new Date(activity?.matchplay_dates?.start_date * 1000))
          .utc(false)
          .tz(activity?.settings?.timezone?.value, true)
          .toDate(),
        dayjs(new Date(activity?.matchplay_dates?.end_date * 1000))
          .utc(false)
          .tz(activity?.settings?.timezone?.value, true)
          .toDate()
      ]);
    }

    if (activity?.settings?.time) {
      setTimeValue(
        getDateConvertedToLocal(
          activity?.settings?.time,
          activity?.settings?.timezone?.value
        ).toDate()
      );
    }
  }, [activity]);

  const updateModes = (gameId?: ID) => {
    getAllGameModes(gameId).then((response) => {
      setGameModes(response.data);
    });

    getAllGamePlatforms(gameId).then((response) => {
      setPlatforms(response.data);
    });
  };

  const settingsNav = [
    {
      title: "Details",
      description: "Basic Details",
      icon: "fa-duotone fa-file"
    },
    {
      title: "Game",
      description: "What game",
      icon: "fa-duotone fa-gamepad"
    },
    {
      title: "Schedule",
      description: "When?",
      icon: "fa-duotone fa-calendar-range"
    },
    {
      title: "Team",
      description: "Who with who",
      icon: "fa-duotone fa-people-group"
    },
    {
      title: "Entry",
      description: "Can anyone join?",
      icon: "fa-duotone fa-ticket"
    },
    {
      title: "Location",
      description: "Where to be played",
      icon: "fa-duotone fa-location-dot"
    }
  ];

  return (
    <React.StrictMode>
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
                <ActivityFormContext.Provider
                  value={{
                    activityForm,
                    setActivityForm,
                    gameModes,
                    setGameModes
                  }}
                >
                  <Tab.Content>
                    <Tab.Pane eventKey="settingsNav-0">
                      <GeneralDetail />
                    </Tab.Pane>
                    <Tab.Pane eventKey="settingsNav-1">
                      <GameDetail />
                    </Tab.Pane>
                    <Tab.Pane eventKey="settingsNav-2">
                      <ScheduleDetail />
                    </Tab.Pane>
                    <Tab.Pane eventKey="settingsNav-3">
                      <TeamDetail />
                    </Tab.Pane>
                    <Tab.Pane eventKey="settingsNav-4">
                      <EntryFeeDetail />
                    </Tab.Pane>
                    <Tab.Pane eventKey="settingsNav-5">
                      <LocationDetail />
                    </Tab.Pane>
                  </Tab.Content>
                </ActivityFormContext.Provider>
              </div>
            </div>
          </Tab.Container>
        </KTCardBody>
      </KTCard>
    </React.StrictMode>
  );
};

export { ActivitySettings };
