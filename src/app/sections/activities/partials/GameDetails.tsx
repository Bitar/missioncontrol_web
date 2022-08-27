import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { SelectMC } from "../../../helpers/form/SelectMC";
import { getAllGameModes, getAllGamePlatforms, getAllGames } from "../../games/core/GameRequests";
import { updateData } from "../../../helpers/form/FormHelper";
import { ErrorMessage } from "formik";
import { Activity } from "../models/Activity";
import FormControl from "@mui/material/FormControl";
import { MenuItem, Select, InputLabel, Switch } from "@mui/material";
import Box from "@mui/material/Box";
import { Platform } from "../../../models/game/Platform";

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity>>
}

const GameDetails: FC<Props> = ({ activity, setActivity }) => {
  const [rounds, setRounds] = useState("");
  const platformsObj = useRef<Platform[] | undefined>([]);

  const [platforms, setPlatforms] = useState<Platform[]>([]);

  const populatePlatforms = (gameId: number) => {
    getAllGamePlatforms(gameId).then((response) => {
      platformsObj.current = response?.data;
    });
  };

  useEffect(() => {
    if (activity?.game?.id) {
      populatePlatforms(activity?.game?.id);
      setPlatforms([]);
    }
  }, [activity?.game?.id]);

  const handleGameChange = (object: any) => {
    updateData({ game: object }, setActivity, activity);
  };

  const handleGameModeChange = (object: any) => {
    updateData({ game_mode: object }, setActivity, activity);
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    setPlatforms(value);
  };

  return (
    <>
      <div className="row mb-6">
        <div className="col-12">
          <h4 className="text-dark">Game Details</h4>
        </div>
      </div>

      <div className="row mb-6">
        <SelectMC label={"Game"} api={getAllGames} onChangeData={handleGameChange} />
      </div>

      {activity?.game && (
        <>
          <div className="row mb-6">
            <SelectMC
              key={activity?.game?.id}
              label="Game Mode"
              api={() => getAllGameModes(activity?.game?.id)}
              onChangeData={() => handleGameModeChange}
            />
          </div>

          <div className="row mb-6">
            <label className="col-lg-4 col-form-label required fw-bold fs-6">Rounds</label>
            <div className="col-lg-8 fv-row">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="timezone-select-label">Rounds</InputLabel>
                  <Select
                    labelId="timezone-select-label"
                    id="timezone-select"
                    value={rounds}
                    label="Rounds"
                    onChange={(e) => {
                      setRounds(e.target.value as string);

                      updateData({
                        settings: {
                          ...activity?.settings,
                          ...{
                            rounds: e.target.value
                          }
                        }
                      }, setActivity, activity);
                    }}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    {/*<MenuItem value="3">Custom</MenuItem>*/}
                  </Select>
                </FormControl>
              </Box>
              <div className="text-danger mt-2">
                <ErrorMessage name="rounds" />
              </div>
            </div>
          </div>

          <div className="row mb-6">
            <label className="col-lg-4 col-form-label required fw-bold fs-6">Cross Play</label>
            <div className="col-lg-8 fv-row">
              <div className="form-check form-check-custom form-check-solid form-switch">
                <Switch name="is_cross_play" />
              </div>
              <div className="text-danger mt-2">
                <ErrorMessage name="is_cross_play" />
              </div>
            </div>
          </div>
          {activity?.settings?.is_cross_play && (
            <div className="row mb-6">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">Platforms</label>
              <div className="col-lg-8 fv-row">

                {/* Check issue with select open. */}
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="platforms-select-label">Platforms</InputLabel>
                    <Select
                      labelId="platforms-select-label"
                      label="platforms"
                      multiple
                      value={platforms}
                      onChange={handleChange}
                    >
                      {platformsObj.current && platformsObj.current.length > 0 && (
                        platformsObj.current.map((row: any) => (
                          <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export { GameDetails };
