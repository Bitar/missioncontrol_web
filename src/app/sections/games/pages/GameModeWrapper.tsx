import { KTCardBody } from "../../../helpers/components/KTCardBody";
import { KTCard } from "../../../helpers/components/KTCard";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { GameMode } from "../../../models/game/GameMode";
import { KTCardHeader } from "../../../helpers/components/KTCardHeader";
import { GameModeFormType, initGameModeFormType } from "../models/GameModeFormType";
import { Form, Formik } from "formik";
import { FormErrorAlert } from "../../../modules/errors/partials/FormErrorAlert";
import { jsonToFormData, updateData } from "../../../helpers/form/FormHelper";
import * as Yup from "yup";
import { FormAction } from "../../../helpers/form/FormAction";
import { updateGameMode } from "../core/GameModeRequests";
import { useGame } from "../core/GameContext";
import toast from "react-hot-toast";
import { GameModeFormWrapper } from "../partials/game-modes/GameModeFormWrapper";

type Props = {
  gameMode: GameMode
  setGameMode: Dispatch<SetStateAction<GameMode | undefined>>
}

export const gameModeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  scoring_type_id: Yup.string().required("Scoring Type is required"),
  min_players: Yup.string().required("Min Players is required"),
  max_players: Yup.string().required("Max Players is required"),
  game_time: Yup.string().required("Game Time is required")
});

const GameModeWrapper: FC<Props> = ({ gameMode, setGameMode }) => {
  const { game, updateGame } = useGame();
  const [gameModeForm, setGameModeForm] = useState<GameModeFormType>(initGameModeFormType(gameMode));
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    setGameModeForm(initGameModeFormType(gameMode));
  }, [gameMode]);

  const handleSubmit = async () => {
    let data = jsonToFormData(gameModeForm);
    data.append("_method", "PUT");

    await updateGameMode(game?.id, gameMode?.id, data).then((response) => {
      toast.success("Game Mode updated Successfully!");
      setGameMode(response);
      updateGame();
      setAlertMessage(undefined);
      setHasErrors(false);
    }).catch(function(e) {
      if (e.response) {
        let status = e.response.status;

        if (status === 422) {
          setAlertMessage("Please make sure you fill all the fields.");
        } else {
          setAlertMessage(e.response.data.message);
        }

        setHasErrors(true);
      }
    });
  };

  const handleOnChange = (e: any) => {
    let targetName = e.target.name;
    let targetValue = e.target.value;

    if (targetName) {
      if (targetName.includes("game.mode.settings.")) {
        let gameModeSettingsIndex = targetName.split("game.mode.settings.")[1];

        let items = gameModeForm?.settings;
        let item = { ...items[gameModeSettingsIndex] };
        item.setting = targetValue;
        items[gameModeSettingsIndex] = item;

        updateData({ settings: items }, setGameModeForm, gameModeForm);
      } else if (targetName !== "min_players" && targetName !== "max_players" && targetName !== "game_time") {
        updateData({ [targetName]: targetValue }, setGameModeForm, gameModeForm);
      }
    }
  };

  return (
    <KTCard>
      <KTCardHeader text={gameMode?.name} bg="mc-primary" text_color="white" />
      <Formik
        initialValues={gameModeForm}
        onSubmit={handleSubmit}
        validationSchema={gameModeSchema}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form onChange={handleOnChange} className="form" encType="multipart/form-data">
            <KTCardBody>
              <FormErrorAlert hasErrors={hasErrors} message={alertMessage} />

              <GameModeFormWrapper gameModeForm={gameModeForm} setGameModeForm={setGameModeForm} />
            </KTCardBody>
            <FormAction text={"Update"} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  );
};

export { GameModeWrapper };