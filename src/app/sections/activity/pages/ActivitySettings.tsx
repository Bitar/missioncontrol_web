import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { activityDetailsSchema, ActivityForm, initialActivityFormByActivity } from "../models/Activity";
import { KTCardBody } from "../../../helpers/components/KTCardBody";
import { FormAction } from "../../../helpers/form/FormAction";
import { KTCard } from "../../../helpers/components/KTCard";
import { useActivity } from "../core/ActivityContext";
import { jsonToFormData, updateData } from "../../../helpers/form/FormHelper";
import Select from "react-select";
import { Community } from "../../community/models/Community";
import { getAllCommunities } from "../../community/core/CommunityRequests";
import { isCommunityAdmin } from "../../identity/user/models/User";
import { useAuth } from "../../../modules/auth";
import { Game } from "../../../models/game/Game";
import { getAllGameModes, getAllGamePlatforms, getAllGames } from "../../games/core/GameRequests";
import { GameMode } from "../../../models/game/GameMode";
import { Platform } from "../../../models/game/Platform";
import { SwitchInput } from "../../../components/SwitchInput/SwitchInput";
import { ID } from "../../../helpers/crud-helper/models";
import { EntryFee, Location, Scoring, TeamDetails } from "../components";
import CurrencyInput from "react-currency-input-field";
import { DatePicker, DateRangePicker } from "rsuite";
import { DateRange } from "rsuite/esm/DateRangePicker/types";
import { getDateConvertedToLocal } from "../../../helpers/ActivityHelper";
import { ACTIVITY_DAY_OF_WEEK, ACTIVITY_MATCH_FREQUENCY } from "../core/_consts";
import { TimeZone } from "../../../models/misc/TimeZone";
import { getTimeZones } from "../../misc/core/_requests";
import { useParams } from "react-router-dom";
import { updateActivity } from "../core/ActivityRequests";
import toast from "react-hot-toast";
import { FormErrorAlert } from "../../../modules/errors/partials/FormErrorAlert";
import dayjs from "dayjs";

const { before } = DateRangePicker;

const ActivitySettings = () => {
  const { currentUser } = useAuth();
  const params = useParams();
  const { activity, setActivity } = useActivity();
  const [activityForm, setActivityForm] = useState<ActivityForm>(
    initialActivityFormByActivity(activity)
  );
  const [communities, setCommunities] = useState<Community[]>();
  const [games, setGames] = useState<Game[]>();
  const [modes, setModes] = useState<GameMode[]>();
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

  const handleSubmit = async () => {
    let data = jsonToFormData(activityForm);
    data.append("_method", "PUT");

    let time = dayjs(new Date(activityForm?.schedule?.settings?.time)).format("HH:mm:ss");

    data.append("schedule[settings][time]", time);

    await updateActivity(params.id, data).then((response) => {
      toast.success("Activity updated Successfully!");
      setActivity(response);
      setAlertMessage(undefined);
      setHasErrors(false);
    }).catch(function(e) {
      if (e.response) {
        // let obj = error.response.data.error.validation;
        // console.log((error.response.data.error.validation))
        // console.log(obj.stringify())
        setAlertMessage(e.response.data.message);
        setHasErrors(true);
      }
    });
  };

  const handleOnChange = (e: any) => {
    if (e.target.name) {
      updateData({ [e.target.name]: e.target.value }, setActivityForm, activityForm);
    }
  };

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
        dayjs(new Date(activity?.registration_dates?.start_date * 1000)).utc(false)
          .tz(activity?.settings?.timezone?.value, true).toDate(),
        dayjs(new Date(activity?.registration_dates?.end_date * 1000)).utc(false)
          .tz(activity?.settings?.timezone?.value, true).toDate()
      ]);
    }
    if (activity?.matchplay_dates) {
      setMatchPlayValue([
        dayjs(new Date(activity?.matchplay_dates?.start_date * 1000)).utc(false)
          .tz(activity?.settings?.timezone?.value, true).toDate(),
        dayjs(new Date(activity?.matchplay_dates?.end_date * 1000)).utc(false)
          .tz(activity?.settings?.timezone?.value, true).toDate()
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
      setModes(response.data);
    });

    getAllGamePlatforms(gameId).then((response) => {
      setPlatforms(response.data);
    });
  };

  const handleRegistrationChange = (e: any) => {
    if (e) {
      let startDate = new Date(e[0]).getTime() / 1000;
      let endDate = new Date(e[1]).getTime() / 1000;

      updateData(
        {
          schedule: {
            ...activityForm?.schedule,
            ...{
              registration_dates: {
                ...activityForm?.schedule.registration_dates,
                ...{ start_date: startDate, end_date: endDate }
              },
              matchplay_dates: {
                start_date: 0,
                end_date: 0
              }
            }
          }
        },
        setActivityForm,
        activityForm
      );

      let endDateDate = new Date(e[1]);
      let disabledEndDate = new Date(endDateDate);
      disabledEndDate.setDate(endDateDate.getDate() + 1);

      setRegistrationValue(e);
      setMatchPlayValue(null);
      setMatchPlayDisabledDate(disabledEndDate);
    }
  };

  const handleMatchPlayChange = (e: any) => {
    if (e) {
      let startDate = new Date(e[0]).getTime() / 1000;
      let endDate = new Date(e[1]).getTime() / 1000;

      updateData(
        {
          schedule: {
            ...activityForm?.schedule,
            ...{
              matchplay_dates: {
                ...activityForm?.schedule.matchplay_dates,
                ...{ start_date: startDate, end_date: endDate }
              }
            }
          }
        },
        setActivityForm,
        activityForm
      );

      setMatchPlayValue(e);
    }
  };

  return (
    <React.StrictMode>
      <KTCard className="mb-5">
        <div className="card-header bg-mc-secondary">
          <div className="card-title">
            <h3 className="card-label text-white fw-bold">Settings</h3>
          </div>
        </div>
        <Formik
          initialValues={activityForm}
          onSubmit={handleSubmit}
          validationSchema={activityDetailsSchema}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form onChange={handleOnChange} className="form" encType="multipart/form-data">
              <KTCardBody className="py-10">
                <FormErrorAlert hasErrors={hasErrors} message={alertMessage} />
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">Title</label>
                  <div className="col-lg-8 fv-row">
                    <Field
                      type="text"
                      name="title"
                      placeholder="Title"
                      className="form-control mb-3 mb-lg-0"
                      autoComplete="off"
                    />
                    <div className="text-danger mt-2">
                      <ErrorMessage name="title" />
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">Description</label>
                  <div className="col-lg-8 fv-row">
                    <Field
                      as="textarea"
                      name="description"
                      className="form-control mb-3 mb-lg-0"
                      placeholder="Activity Description"
                      rows={3}
                    />
                    <div className="text-danger mt-2">
                      <ErrorMessage name="description" />
                    </div>
                  </div>
                </div>

                {currentUser && !isCommunityAdmin(currentUser) && (
                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label fw-bold fs-6">Community</label>
                    <div className="col-lg-8 fv-row">
                      {activity?.community && (
                        <Select
                          name="community_id"
                          placeholder={"Choose a Community"}
                          value={activity?.community}
                          options={communities}
                          getOptionLabel={(community) => community?.name}
                          getOptionValue={(community) => community?.id?.toString() || ""}
                          onChange={(e) => {
                            updateData({ community_id: e?.id || "" }, setActivityForm, activityForm);
                          }}
                        />
                      )}
                      <div className="text-danger mt-2">
                        <ErrorMessage name="community_id" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="separator separator-dashed my-6"></div>

                <div className="row mb-6">
                  <div className="col-12">
                    <h4 className="text-dark">Game Details</h4>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">Games</label>
                  <div className="col-lg-8 fv-row">
                    {activity?.game && (
                      <Select
                        name="game_id"
                        placeholder={"Choose a Game"}
                        defaultValue={activity?.game}
                        options={games}
                        getOptionLabel={(game) => game?.title}
                        getOptionValue={(game) => game?.id?.toString() || ""}
                        onChange={(e) => {
                          updateData({ game_id: e?.id || "" }, setActivityForm, activityForm);
                          e?.id && updateModes(e.id);
                          selectGameModeRef.current.clearValue();
                        }}
                      />
                    )}
                    <div className="text-danger mt-2">
                      <ErrorMessage name="game_id" />
                    </div>
                  </div>
                </div>

                {activityForm?.game_id && (
                  <>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-bold fs-6">Game Mode</label>
                      <div className="col-lg-8 fv-row">
                        {activity?.game_mode && (
                          <Select
                            name="game_mode_id"
                            ref={selectGameModeRef}
                            placeholder={"Choose a Game Mode"}
                            defaultValue={activity?.game_mode}
                            options={modes}
                            getOptionLabel={(mode) => mode?.name}
                            getOptionValue={(mode) => mode?.id?.toString() || ""}
                            onChange={(e) => {
                              updateData({ game_mode_id: e?.id || "" }, setActivityForm, activityForm);
                            }}
                          />
                        )}
                        <div className="text-danger mt-2">
                          <ErrorMessage name="game_mode_id" />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-bold fs-6">Rounds</label>
                      <div className="col-lg-8 fv-row">
                        {activity?.game_mode && (
                          <Select
                            name="rounds"
                            placeholder={"How many rounds?"}
                            defaultValue={{
                              value: activityForm?.rounds,
                              label: activityForm?.rounds
                            }}
                            options={[
                              { value: 1, label: "1" },
                              { value: 3, label: "3" },
                              { value: 5, label: "5" },
                              { value: 7, label: "7" }
                            ]}
                            onChange={(e) => {
                              updateData({ rounds: e?.value || "" }, setActivityForm, activityForm);
                            }}
                          />
                        )}
                        <div className="text-danger mt-2">
                          <ErrorMessage name="game_mode_id" />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-bold fs-6">Crossplay</label>
                      <div className="col-lg-8 fv-row">
                        <SwitchInput
                          isOn={activityForm?.is_cross_play}
                          handleToggle={() => {
                            selectPlatformsRef.current.clearValue();
                            updateData(
                              { is_cross_play: !activityForm?.is_cross_play },
                              setActivityForm,
                              activityForm
                            );
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-bold fs-6">Platforms</label>
                      <div className="col-lg-8 fv-row">
                        {activity?.platforms && (
                          <Select
                            name="community_id"
                            placeholder={"Which Platform(s)"}
                            ref={selectPlatformsRef}
                            defaultValue={activity?.platforms}
                            isMulti={activityForm?.is_cross_play}
                            options={platforms}
                            getOptionLabel={(platform) => platform?.name}
                            getOptionValue={(platform) => platform?.id?.toString() || ""}
                            onChange={(e) => {
                              updateData({ platforms: e || [] }, setActivityForm, activityForm);
                            }}
                          />
                        )}
                        <div className="text-danger mt-2">
                          <ErrorMessage name="community_id" />
                        </div>
                      </div>
                    </div>

                    {activityForm?.game_mode_id && (
                      <Scoring
                        gameMode={
                          modes?.filter((mode) => mode.id === activityForm?.game_mode_id)[0]
                        }
                      />
                    )}
                  </>
                )}

                <div className="separator separator-dashed my-6"></div>

                <div className="row mb-6">
                  <div className="col-12">
                    <h4 className="text-dark">Schedule</h4>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">Registration Dates</label>
                  <div className="col-lg-8 fv-row">
                    <DateRangePicker
                      value={registrationValue}
                      id="registration_dates"
                      appearance="default"
                      placeholder="Registration Dates"
                      className="w-100"
                      character={" - "}
                      ranges={[]}
                      onChange={handleRegistrationChange}
                    />
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">MatchPlay Dates</label>
                  <div className="col-lg-8 fv-row">
                    <DateRangePicker
                      value={matchPlayValue}
                      id="match_play_dates"
                      appearance="default"
                      placeholder="MatchPlay Dates"
                      className="w-100"
                      character={" - "}
                      ranges={[]}
                      onChange={handleMatchPlayChange}
                      disabledDate={before && before(matchPlayDisabledDate)}
                    />
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">Time</label>
                  <div className="col-lg-8 fv-row">
                    <DatePicker
                      value={timeValue}
                      format="hh:mm aa"
                      ranges={[]}
                      className="w-100"
                      placeholder="Select Time"
                      showMeridian={true}
                      onChange={(value, event) => {
                        updateData({
                            schedule: { ...activityForm?.schedule, ...{ settings: { ...activityForm?.schedule.settings, ...{ time: value?.valueOf() } } } }
                          },
                          setActivityForm,
                          activityForm
                        );
                        setTimeValue(value);
                      }}
                    />
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">Match Frequency</label>
                  <div className="col-lg-8 fv-row">
                    <Select
                      placeholder={"Choose a Match frequency"}
                      value={
                        ACTIVITY_MATCH_FREQUENCY.filter(
                          (frequency) =>
                            frequency.value === activityForm?.schedule?.settings?.frequency
                        )[0]
                      }
                      options={ACTIVITY_MATCH_FREQUENCY}
                      onChange={(e) => {
                        updateData({ schedule: { ...activityForm?.schedule, ...{ settings: { ...activityForm?.schedule.settings, ...{ frequency: e?.value } } } } },
                          setActivityForm,
                          activityForm
                        );
                      }}
                    />
                  </div>
                </div>

                {activityForm?.schedule?.settings?.frequency === 2 &&
                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label fw-bold fs-6">Day Of Week</label>
                    <div className="col-lg-8 fv-row">
                      <Select
                        placeholder={"Choose Day of Week"}
                        value={
                          ACTIVITY_DAY_OF_WEEK.filter(
                            (dayOfWeek) =>
                              dayOfWeek.value === (Number.isInteger(activityForm?.schedule?.settings?.day) ? activityForm?.schedule?.settings?.day : parseInt(activityForm?.schedule?.settings?.day + ""))
                          )[0]
                        }
                        options={ACTIVITY_DAY_OF_WEEK}
                        onChange={(e) => {
                          updateData(
                            {
                              schedule: {
                                ...activityForm?.schedule,
                                ...{
                                  settings: {
                                    ...activityForm?.schedule.settings,
                                    ...{ day: e?.value }
                                  }
                                }
                              }
                            },
                            setActivityForm,
                            activityForm
                          );
                        }}
                      />
                    </div>
                  </div>
                }

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">Timezones</label>
                  <div className="col-lg-8 fv-row">
                    {/*{activity?.game && (*/}
                    <Select
                      name="timezone_id"
                      placeholder={"Choose a Timezone"}
                      value={timeZones?.filter((timezone) => timezone.id === activityForm?.schedule?.settings?.timezone)[0]}
                      options={timeZones}
                      getOptionLabel={(timeZone) => timeZone?.name}
                      getOptionValue={(timeZone) => timeZone?.id?.toString() || ""}
                      onChange={(e) => {
                        updateData({ schedule: { ...activityForm?.schedule, ...{ settings: { ...activityForm?.schedule.settings, ...{ timezone: e?.id } } } } },
                          setActivityForm,
                          activityForm
                        );
                      }}
                    />
                    {/*)}*/}
                    <div className="text-danger mt-2">
                      <ErrorMessage name="game_id" />
                    </div>
                  </div>
                </div>

                <div className="separator separator-dashed my-6"></div>

                <TeamDetails
                  activity={activityForm}
                  setActivity={setActivityForm}
                  gameMode={modes?.filter((mode) => mode.id === activityForm?.game_mode_id)[0]}
                />

                <div className="separator separator-dashed my-6"></div>

                <div className="row">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">Entry Fee</label>
                  <div className="col-lg-8 fv-row">
                    <EntryFee activity={activityForm} setActivity={setActivityForm} />
                  </div>
                </div>

                {activityForm?.entry_fee?.type === 2 && (
                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label fw-bold fs-6">Amount</label>
                    <div className="col-lg-8 fv-row">
                      <CurrencyInput
                        id="entry_fee_amount_input"
                        placeholder="Entry Fee"
                        className="form-control mb-3 mb-lg-0"
                        defaultValue={0}
                        decimalsLimit={2}
                        prefix={"$"}
                        onValueChange={(value) =>
                          updateData(
                            {
                              entry_fee: {
                                ...activityForm?.entry_fee,
                                ...{
                                  amount: value
                                }
                              }
                            },
                            setActivityForm,
                            activityForm
                          )
                        }
                      />
                      <div className="text-danger mt-2">
                        <ErrorMessage name="entry_fee.amount" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="row">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">Location</label>
                  <div className="col-lg-8 fv-row">
                    <Location activity={activityForm} setActivity={setActivityForm} />
                  </div>
                </div>

                {activityForm?.location?.type === 2 && (
                  <div className="row">
                    <label className="col-lg-4 col-form-label fw-bold fs-6">Where?</label>
                    <div className="col-lg-8 fv-row">
                      <Field
                        type="text"
                        id="location_input"
                        value={activityForm?.location?.locate}
                        placeholder="Where?"
                        className="form-control mb-3 mb-lg-0"
                        autoComplete="off"
                        onChange={(e: any) => {
                          updateData(
                            {
                              location: {
                                ...activityForm?.location,
                                ...{
                                  locate: e.target.value
                                }
                              }
                            },
                            setActivityForm,
                            activityForm
                          );
                        }}
                      />
                      <div className="text-danger mt-2">
                        <ErrorMessage name="location.locate" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="separator separator-dashed my-6"></div>
              </KTCardBody>
              <FormAction text={"Update Details"} isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
      </KTCard>
      {/*<ActivityScheduleForm />*/}
    </React.StrictMode>
  );
};

export { ActivitySettings };
