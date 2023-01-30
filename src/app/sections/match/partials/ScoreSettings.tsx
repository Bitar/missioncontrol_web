import { KTCard, KTCardBody, KTCardHeader } from "../../../helpers/components";
import React, { FC, useEffect, useState } from "react";
import { RoundBlock } from "./RoundBlock";
import { EmptyRoundBlock } from "./EmptyRoundBlock";
import { Form, Formik } from "formik";
import { FormAction } from "../../../helpers/form/FormAction";
import * as Yup from "yup";
import { useActivity } from "../../activity/core/contexts/ActivityContext";
import { defaultRound, roundScoreObject } from "../../activity/models/matches/Score";

export const ScoreSettings: FC = () => {
  const { match, activity } = useActivity();

  const [rounds, setRounds] = useState<roundScoreObject[]>([]);

  // console.log(match?.rounds);

  useEffect(() => {
    if (activity?.settings?.rounds) {
      // let finalObject: any[] = [];
      let finalObject = rounds;

      let i = 1;

      for(let i = 1; i <= activity?.settings?.rounds; i++) {
        let matchRound = match?.rounds?.filter((round) => round?.round === i)[0];

        if (matchRound?.scores) {
          // updateState(i, defaultRound(i, matchRound))
          finalObject = [...finalObject, defaultRound(i, matchRound)];
        } else {
          finalObject = [...finalObject, defaultRound(i)];
        }
      }

      setRounds(finalObject);
    }

  }, [activity?.settings?.rounds, match]);

  const updateState = (index: any, object: any) => {
    const newArray = rounds.map((item, i) => {
      if (index === i) {
        return { ...item, object };
      } else {
        return item;
      }
    });
    setRounds(newArray);
  };

  const handleSubmit = (e: any) => {
    console.log("submit");
  };

  const handleOnChange = (e: any) => {
    console.log(e.target.name);
    console.log(e.target.value);
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
          <Form onChange={handleOnChange} className="form collapse show" autoComplete="off" id="update-scores-wrapper">
            <KTCardBody className="pb-0 pt-5">
              {match?.rounds?.map((round, index) =>
                round?.scores.length > 0 ? (
                  // <div key={`round-block-${index}`}></div>
                  <RoundBlock match={match} round={round} roundIndex={index} key={`round-block-${index}`} />
                ) : (
                  // <div key={`round-empty-block-${index}`}></div>
                  <EmptyRoundBlock match={match} roundIndex={index} key={`round-empty-block-${index}`} />
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
