import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import { SwitchInput } from "../../../../components/SwitchInput/SwitchInput";
import { DateRangePicker } from "rsuite";
import { DateRange } from "rsuite/esm/DateRangePicker/types";
import { useActivityForm } from "../../core/contexts/ActivityFormContext";
import { updateData } from "../../../../helpers/form/FormHelper";
import {
  handlePlayoffsChange,
  handleTeamChange,
  resetPlayoffDates,
  updatePlayoffDates
} from "../../../../helpers/PlayoffHelper";
import { TournamentTeamCountText } from "../TournamentTeamCountText";

const { before } = DateRangePicker;

export const PlayoffDetail = () => {
  const { activityForm, setActivityForm } = useActivityForm();
  const [playoffDisabledDate, setPlayoffDisabledDate] = useState<Date>(new Date());
  const [playoffsRange, setPlayoffsRange] = useState<DateRange | null>();
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [teams, setTeams] = useState("");

  useEffect(() => {
    if (activityForm?.playoff?.teams) {
      setTeams(activityForm?.playoff?.teams?.toString());
    }
  }, [activityForm?.playoff?.teams]);

  useEffect(() => {
    updatePlayoffDates(activityForm, setPlayoffsRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityForm?.playoff?.playoff_dates]);

  useEffect(() => {
    if (activityForm?.schedule?.matchplay_dates?.end_date) {
      let disabledEndDate = new Date(activityForm?.schedule?.matchplay_dates?.end_date * 1000);
      disabledEndDate.setDate(disabledEndDate.getDate() + 1);

      setPlayoffDisabledDate(disabledEndDate);
    }

    resetPlayoffDates(activityForm, setActivityForm, setPlayoffsRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityForm?.schedule?.matchplay_dates]);

  const onPlayoffsChange = (e: any) => {
    handlePlayoffsChange(e, activityForm, setActivityForm, setShowErrors, setPlayoffsRange);
  };

  return (
    <div className="d-flex flex-column pt-5 w-100">
      <div className="row mb-6">
        <label className="col-lg-4 col-form-label fw-bold fs-6">Enable Playoffs</label>
        <div className="col-lg-8 fv-row">
          <SwitchInput
            id={"enable_playoff_switch"}
            name="playoff.is_enabled"
            isOn={activityForm?.playoff?.is_enabled}
            handleToggle={(e: any) => {
              const { checked } = e.target;
              updateData(
                {
                  playoff: {
                    ...activityForm?.playoff,
                    ...{
                      is_enabled: checked
                    }
                  }
                },
                setActivityForm,
                activityForm
              );
            }}
          />
          <div className="text-danger mt-2">
            <ErrorMessage name="playoff.is_enabled" />
          </div>
        </div>
      </div>

      {activityForm?.playoff?.is_enabled && (
        <>
          <div className="row mb-6">
            <label className="col-lg-4 col-form-label fw-bold fs-6"># of Teams</label>
            <div className="col-lg-8 fv-row">
              <Field
                id={"playoff_teams"}
                value={teams}
                type="text"
                placeholder="Teams count"
                className="form-control mb-3 mb-lg-0"
                autoComplete="off"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleTeamChange(e, activityForm, setActivityForm, setTeams);
                }}
              />
              <div className="text-danger mt-2">
                <ErrorMessage name="playoff.teams" />
              </div>
            </div>
          </div>

          <div className="row mb-6">
            <label className="col-lg-4 col-form-label fw-bold fs-6">Playoff Dates</label>
            <div className="col-lg-8 fv-row">
              <DateRangePicker
                name={"playoff.playoff_dates"}
                cleanable={false}
                value={playoffsRange}
                id="playoff_dates"
                appearance="default"
                placeholder="Playoff Dates"
                placement={"topStart"}
                className="w-100"
                character={" - "}
                ranges={[]}
                onChange={onPlayoffsChange}
                disabledDate={before && before(playoffDisabledDate)}
              />
              <div className="text-danger mt-2">{showErrors && "Invalid Playoff dates"}</div>
              <div className="form-text">
                <TournamentTeamCountText teamCount={activityForm?.playoff?.teams!} />
              </div>
              <div className="text-danger mt-2">
                <ErrorMessage name="playoff.playoff_dates.start_date" />
              </div>
              <div className="text-danger mt-2">
                <ErrorMessage name="playoff.playoff_dates.end_date" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
