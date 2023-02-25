import { KTCard, KTCardBody, KTCardHeader } from "../../../../helpers/components";
import { activityDetailsSchema } from "../../../../models/activity/Activity";
import React, { useEffect, useState } from "react";
import { useActivity } from "../../core/contexts/ActivityContext";
import { useActivityForm } from "../../core/contexts/ActivityFormContext";
import { jsonToFormData, updateData } from "../../../../helpers/form/FormHelper";
import toast from "react-hot-toast";
import { ErrorMessage, Form, Formik } from "formik";
import { DatePicker, DateRangePicker } from "rsuite";
import Select from "react-select";
import { ACTIVITY_DAY_OF_WEEK, ACTIVITY_MATCH_FREQUENCY } from "../../core/_consts";
import { FormAction } from "../../../../helpers/form/FormAction";
import { DateRange } from "rsuite/esm/DateRangePicker/types";
import { defaultTime } from "../../../../models/activity/ActivityForm";
import { TimeZone } from "../../../../models/misc/TimeZone";
import { getTimeZones } from "../../../misc/core/_requests";
import {
  activityMatchPlayOnChange,
  activityRegistrationOnChange,
  createDateFrom,
  isValidTournament
} from "../../../../helpers/ActivityHelper";
import { updateSchedule } from "../../core/requests/ActivitySettingsRequests";
import moment from "moment";
import { PlayoffDetail } from "./PlayoffDetail";
import { Badge } from "react-bootstrap";
import { handleDayChange, handleFrequencyChange } from "../../../../helpers/PlayoffHelper";

const { before } = DateRangePicker;

export const ScheduleDetail = () => {
  const { activity, setActivity } = useActivity();
  const { activityForm, setActivityForm } = useActivityForm();
  const [registrationValue, setRegistrationValue] = useState<DateRange | null>();
  const [matchPlayValue, setMatchPlayValue] = useState<DateRange | null>();
  const [matchPlayDisabledDate, setMatchPlayDisabledDate] = useState<Date>(new Date());
  const [playoffDisabledDate, setPlayoffDisabledDate] = useState<Date>(new Date());
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [timeValue, setTimeValue] = useState<Date | null>(defaultTime(new Date()));
  const [timeZones, setTimeZones] = useState<TimeZone[]>();

  useEffect(() => {
    getTimeZones().then((response) => {
      setTimeZones(response.data);
    });
  }, []);

  useEffect(() => {
    if (activityForm?.schedule && activity?.settings) {
      let regStartDate = createDateFrom(
        activityForm?.schedule?.registration_dates?.start_date
      ).toDate();
      let regEndDate = createDateFrom(activityForm?.schedule?.registration_dates?.end_date).toDate();
      setRegistrationValue([regStartDate, regEndDate]);

      let matchStartDate = createDateFrom(
        activityForm?.schedule?.matchplay_dates?.start_date
      ).toDate();
      let matchEndDate = createDateFrom(activityForm?.schedule?.matchplay_dates?.end_date).toDate();
      setMatchPlayValue([matchStartDate, matchEndDate]);
      createDateFrom(activity?.settings?.time).format("hh:mm a");
      let time = createDateFrom(activity?.settings?.time).toDate();

      setTimeValue(time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity?.registration_dates, activity?.matchplay_dates, activity?.settings]);

  useEffect(() => {
    if (activityForm?.schedule?.matchplay_dates?.end_date) {
      let disabledEndDate = new Date(activityForm?.schedule?.matchplay_dates?.end_date * 1000);
      disabledEndDate.setDate(disabledEndDate.getDate() + 1);

      setPlayoffDisabledDate(disabledEndDate);
    }
  }, [activityForm?.schedule?.matchplay_dates?.end_date]);

  const handleSubmit = async () => {
    let data = jsonToFormData(activityForm);

    await updateSchedule(activity?.id, data)
      .then((response) => {
        toast.success("Activity updated Successfully!");
        setActivity(response);
      })
      .catch(function(e) {
        if (e.response) {
          let status = e.response.status;

          if (status === 403) {
            toast.error("You are not allowed to do this update!");
          }
        }
      });
  };

  const handleOnChange = (e: any) => {
  };

  const handleRegistrationChange = (e: any) => {
    activityRegistrationOnChange(
      e,
      activityForm,
      setActivityForm,
      setRegistrationValue,
      setMatchPlayValue,
      setMatchPlayDisabledDate
    );
  };

  const handleMatchPlayChange = (e: any) => {
    isValidTournament(e, activityForm, setShowErrors);
    activityMatchPlayOnChange(e, activityForm, setActivityForm, setMatchPlayValue);
  };

  const onFrequencyChange = (e: any) => {
    handleFrequencyChange(e, activityForm, setActivityForm);
    if(activityForm?.type_id === 2) {
      setMatchPlayValue(null)
    }
  };

  const onDayChange = (e: any) => {
    handleDayChange(e, activityForm, setActivityForm);
    if(activityForm?.type_id === 2) {
      setMatchPlayValue(null)
    }
  };

  return (
    <>
      <KTCard border={true}>
        <KTCardHeader text={"Schedule"} bg="mc-primary" text_color="white" />

        <Formik
          validationSchema={activityDetailsSchema}
          initialValues={activityForm!}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form onChange={handleOnChange} className="form" autoComplete="off">
              <KTCardBody className="py-4">
                <div className="d-flex flex-column pt-5 w-100">
                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label fw-bold fs-6">
                      Registration Dates
                    </label>
                    <div className="col-lg-8 fv-row">
                      <DateRangePicker
                        cleanable={false}
                        value={registrationValue}
                        id="registration_dates"
                        appearance="default"
                        placeholder="Registration Dates"
                        className="w-100"
                        character={" - "}
                        ranges={[]}
                        onChange={handleRegistrationChange}
                      />
                      <div className="text-danger mt-2">
                        <ErrorMessage name="schedule.registration_dates" />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label fw-bold fs-6">MatchPlay Dates</label>
                    <div className="col-lg-8 fv-row">
                      <DateRangePicker
                        cleanable={false}
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
                      <div className="text-danger mt-2">
                        {showErrors && "Invalid Playoff dates"}
                      </div>
                      {activityForm?.type_id === 2 && (
                        <div className="form-text">
                          {activityForm?.team?.max ? (
                            <>
                              <Badge bg="warning" text="dark">
                                {" "}
                                You need at least {Math.ceil(
                                Math.log2(activityForm?.team?.max)
                              )}{" "}
                                days of playoffs{" "}
                              </Badge>{" "}
                              Number of teams needs to be between "Min" & "Max" teams set in the
                              previous section.
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                      <div className="text-danger mt-2">
                        <ErrorMessage name="schedule.matchplay_dates.start_date" />
                      </div>
                      <div className="text-danger mt-2">
                        <ErrorMessage name="schedule.matchplay_dates.end_date" />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label fw-bold fs-6">Time</label>
                    <div className="col-lg-8 fv-row">
                      <DatePicker
                        cleanable={false}
                        value={timeValue}
                        format="hh:mm aa"
                        ranges={[]}
                        hideMinutes={(minute) => minute % 5 !== 0}
                        className="w-100"
                        placeholder="Select Time"
                        showMeridian={true}
                        onChange={(value) => {
                          if (value?.getTime()) {
                            let time = moment(value.getTime()).utc(true).unix();

                            updateData(
                              {
                                schedule: {
                                  ...activityForm?.schedule,
                                  ...{
                                    settings: {
                                      ...activityForm?.schedule.settings,
                                      ...{ time: time }
                                    }
                                  }
                                }
                              },
                              setActivityForm,
                              activityForm
                            );
                            setTimeValue(value);
                          }
                        }}
                      />
                      <div className="text-danger mt-2">
                        <ErrorMessage name="schedule.settings.time" />
                      </div>
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
                        onChange={onFrequencyChange}
                      />
                      <div className="text-danger mt-2">
                        <ErrorMessage name="schedule.settings.frequency" />
                      </div>
                    </div>
                  </div>

                  {activityForm?.schedule?.settings?.frequency === 2 && (
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-bold fs-6">Day Of Week</label>
                      <div className="col-lg-8 fv-row">
                        <Select
                          placeholder={"Choose Day of Week"}
                          value={
                            ACTIVITY_DAY_OF_WEEK.filter(
                              (dayOfWeek) =>
                                dayOfWeek.value ===
                                (Number.isInteger(activityForm?.schedule?.settings?.day)
                                  ? activityForm?.schedule?.settings?.day
                                  : parseInt(activityForm?.schedule?.settings?.day + ""))
                            )[0]
                          }
                          options={ACTIVITY_DAY_OF_WEEK}
                          onChange={onDayChange}
                        />
                        <div className="text-danger mt-2">
                          <ErrorMessage name="schedule.settings.day" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label fw-bold fs-6">Timezones</label>
                    <div className="col-lg-8 fv-row">
                      {/*{activity?.game && (*/}
                      <Select
                        name="timezone_id"
                        placeholder={"Choose a Timezone"}
                        value={
                          timeZones?.filter(
                            (timezone) => timezone.id === activityForm?.schedule?.settings?.timezone
                          )[0]
                        }
                        options={timeZones}
                        getOptionLabel={(timeZone) => timeZone?.name}
                        getOptionValue={(timeZone) => timeZone?.id?.toString() || ""}
                        onChange={(e) => {
                          updateData(
                            {
                              schedule: {
                                ...activityForm?.schedule,
                                ...{
                                  settings: {
                                    ...activityForm?.schedule.settings,
                                    ...{ timezone: e?.id }
                                  }
                                }
                              }
                            },
                            setActivityForm,
                            activityForm
                          );
                        }}
                      />
                      <div className="text-danger mt-2">
                        <ErrorMessage name="schedule.settings.timezone" />
                      </div>
                    </div>
                  </div>
                </div>
              </KTCardBody>
              <FormAction text={"Update"} isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
      </KTCard>

      {activityForm?.type_id === 1 && <PlayoffDetail playoffDisabledDate={playoffDisabledDate} />}
    </>
  );
};
