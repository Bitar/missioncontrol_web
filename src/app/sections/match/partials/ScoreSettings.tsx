import { KTCard, KTCardBody, KTCardHeader } from "../../../helpers/components";
import React, { FC, useEffect, useState } from "react";
import { RoundBlock } from "./RoundBlock";
import { EmptyRoundBlock } from "./EmptyRoundBlock";
import { Form, Formik } from "formik";
import { FormAction } from "../../../helpers/form/FormAction";
import * as Yup from "yup";
import { useActivity } from "../../activity/core/contexts/ActivityContext";
import { defaultRound, roundScoreObject } from "../../activity/models/matches/Score";
import { jsonToFormData } from "../../../helpers/form/FormHelper";
import { updateScores } from "../core/ScoreRequests";

export const ScoreSettings: FC = () => {
  const { match, activity } = useActivity();

  const [rounds, setRounds] = useState<roundScoreObject[]>([]);

  useEffect(() => {
    if (activity?.settings?.rounds) {
      let tempRounds = [...rounds];

      for (let i = 1; i <= activity?.settings?.rounds; i++) {
        let matchRound = match?.rounds?.filter((round) => round?.round === i)[0];

        let roundExist = { ...rounds[i - 1] };

        if (roundExist.round) {
          if (matchRound?.scores && matchRound?.scores.length > 0) {
            roundExist = defaultRound(i, activity, match?.teams, matchRound);
          } else {
            roundExist = defaultRound(i, activity, match?.teams);
          }
        } else {
          if (matchRound?.scores && matchRound?.scores.length > 0) {
            roundExist = defaultRound(i, activity, match?.teams, matchRound);
          } else {
            roundExist = defaultRound(i, activity, match?.teams);
          }
        }

        tempRounds[i - 1] = roundExist;
      }

      setRounds(tempRounds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity, match?.teams]);

  const handleSubmit = () => {
    let dataObj = {
      "rounds": rounds
    };
    let data = jsonToFormData(dataObj);

    updateScores(match?.id, data).then((response) => {
      console.log(response);
    });
  };

  const handleOnChange = (e: any) => {
    let targetName = e.target.name;
    let targetValue = e.target.value;

    let tempRounds = [...rounds];
    let fieldName = targetName.split(".");

    let existingValue = { ...tempRounds[fieldName[1]].scores[fieldName[3]].keys[fieldName[5]] };
    existingValue.value = targetValue;

    tempRounds[fieldName[1]].scores[fieldName[3]].keys[fieldName[5]] = existingValue;

    setRounds(tempRounds);
  };

  const scoreUpdateValidation = Yup.object().shape({});

  return (
    <KTCard className="mb-5 mb-xl-10 overflow-hidden">
      <KTCardHeader
        text={"Update Scores"}
        bg={"warning"}
        text_color={"white"}
        collapse={true}
        target_id="update-scores-wrapper"
      />

      <Formik
        initialValues={{ rounds: rounds }}
        validationSchema={scoreUpdateValidation}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form
            onChange={handleOnChange}
            className="form collapse show"
            autoComplete="off"
            id="update-scores-wrapper"
          >
            <KTCardBody className="pb-0 pt-5">
              {match?.rounds?.map((round, index) =>
                round?.scores.length > 0 ? (
                  // <div key={`round-block-${index}`}></div>
                  <RoundBlock
                    match={match}
                    round={round}
                    roundIndex={index}
                    key={`round-block-${index}`}
                  />
                ) : (
                  // <div key={`round-empty-block-${index}`}></div>
                  <EmptyRoundBlock
                    match={match}
                    roundIndex={index}
                    key={`round-empty-block-${index}`}
                  />
                )
              )}
            </KTCardBody>
            <FormAction text={"Update Scores"} isSubmitting={false} />
          </Form>
        )}
      </Formik>
    </KTCard>
  );
};
