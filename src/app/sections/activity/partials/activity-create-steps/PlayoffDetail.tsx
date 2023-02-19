import { ErrorMessage } from "formik";
import React, { FC, useEffect, useState } from "react";
import { SwitchInput } from "../../../../components/SwitchInput/SwitchInput";
import { DateRangePicker } from "rsuite";
import { DateRange } from "rsuite/esm/DateRangePicker/types";
import dayjs from "dayjs";
import { useActivityForm } from "../../core/contexts/ActivityFormContext";
import { updateData } from "../../../../helpers/form/FormHelper";
import InputMask from "react-input-mask";
import { Badge } from "react-bootstrap";

const { before } = DateRangePicker;

type Props = {
  playoffDisabledDate: Date
}

export const PlayoffDetail: FC<Props> = ({ playoffDisabledDate }) => {
  const { activityForm, setActivityForm } = useActivityForm();
  const [enablePlayoffs, setEnablePlayoffs] = useState<boolean>(false);
  const [playoffsRange, setPlayoffsRange] = useState<DateRange | null>();
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const resetPlayoffDates = () => {
    updateData(
      {
        playoffs: {
          ...activityForm?.playoffs,
          ...{
            playoffs_dates: {
              ...activityForm?.playoffs?.playoffs_dates,
              ...{ start_date: 0, end_date: 0 }
            }
          },
        is_valid: false
        },
      },
      setActivityForm,
      activityForm
    );
  };

  const handlePlayoffsChange = (e: any) => {
    if (e) {
      let startDate = dayjs(new Date(e[0]).setHours(0, 0)).utc(true).tz("utc");
      let endDate = dayjs(new Date(e[1]).setHours(23, 59)).utc(true).tz("utc");

      if (activityForm?.playoffs?.teams) {
        let daysOfRange = Math.ceil(endDate.diff(startDate, "days", true));
        let daysNeeded = Math.ceil(Math.log2(activityForm?.playoffs?.teams));

        if (daysNeeded <= daysOfRange) {
          updateData(
            {
              playoffs: {
                ...activityForm?.playoffs,
                ...{
                  playoffs_dates: {
                    ...activityForm?.playoffs?.playoffs_dates,
                    ...{ start_date: startDate.unix(), end_date: endDate.unix() }
                  }
                },
              is_valid: true
              },
            },
            setActivityForm,
            activityForm
          );
          setShowErrors(false);
          setPlayoffsRange(e);
        } else {
          resetPlayoffDates();
          setShowErrors(true);
          setPlayoffsRange(null);
        }
      }
    }
  };

  useEffect(() => {
    resetPlayoffDates();
    setPlayoffsRange(null);
  }, [activityForm?.schedule?.matchplay_dates])

  const beforeMaskedStateChange = ({ nextState }: any) => {
    let { value } = nextState;

    if (activityForm?.team?.max && parseInt(value) > activityForm?.team?.max) {
      value = activityForm?.team?.max;
    }

    return {
      ...nextState,
      value
    };
  };

  return (
    <>
      <div className="d-flex flex-column pt-5 w-100">
        <div className="row mb-6">
          <label className="col-lg-4 col-form-label fw-bold fs-6">Enable Playoffs</label>
          <div className="col-lg-8 fv-row">
            <SwitchInput
              id={"enable_playoff_switch"}
              name="playoffs.is_enabled"
              isOn={enablePlayoffs}
              handleToggle={(e: any) => {
                setEnablePlayoffs(!enablePlayoffs);
                updateData(
                  {
                    playoffs: {
                      ...activityForm?.playoffs,
                      ...{
                        is_enabled: !enablePlayoffs,
                        teams: e.target.checked ? 2 : undefined
                      }
                    }
                  },
                  setActivityForm,
                  activityForm
                );
              }}
            />
            <div className="text-danger mt-2">
              <ErrorMessage name="playoffs.is_enabled" />
            </div>
          </div>
        </div>

        {enablePlayoffs && (
          <>
            <div className="row mb-6">
              <label className="col-lg-4 col-form-label fw-bold fs-6">Playoff Dates</label>
              <div className="col-lg-8 fv-row">
                <DateRangePicker
                  name={"playoffs.playoffs_dates"}
                  cleanable={false}
                  value={playoffsRange}
                  id="playoff_dates"
                  appearance="default"
                  placeholder="Playoff Dates"
                  className="w-100"
                  character={" - "}
                  ranges={[]}
                  onChange={handlePlayoffsChange}
                  disabledDate={before && before(playoffDisabledDate)}
                />
                <div className="text-danger mt-2">
                  {showErrors && "Invalid Playoff dates"}
                </div>
                <div className="form-text">
                  {activityForm?.playoffs?.teams ? (
                    <>
                      <Badge bg="warning" text="dark">
                        {" "}
                        You need at least {Math.ceil(Math.log2(activityForm?.playoffs?.teams))} days
                        of playoffs{" "}
                      </Badge>{" "}
                      The playoffs dates highly depends on the number of teams. <br />
                      Make sure the number of teams is enough for the dates to generate enough matches
                      for the whole tournament.
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="text-danger mt-2">
                  <ErrorMessage name="playoffs.playoffs_dates.start_date" />
                </div>
                <div className="text-danger mt-2">
                  <ErrorMessage name="playoffs.playoffs_dates.end_date" />
                </div>
              </div>
            </div>

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label fw-bold fs-6"># of Teams</label>
              <div className="col-lg-8 fv-row">
                <InputMask
                  mask="999"
                  defaultValue={activityForm?.playoffs?.teams || 2}
                  className="form-control mb-3 mb-lg-0"
                  placeholder="Teams count"
                  maskPlaceholder={null}
                  name="playoffs.teams"
                  beforeMaskedStateChange={beforeMaskedStateChange}
                  onChange={() => {
                    setPlayoffsRange(null);
                    resetPlayoffDates();
                  }}
                />
                <div className="text-danger mt-2">
                  <ErrorMessage name="playoffs.teams" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
