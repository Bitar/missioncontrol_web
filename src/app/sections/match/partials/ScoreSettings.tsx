import { KTCard, KTCardBody, KTCardHeader } from "../../../helpers/components";
import React, { FC, useEffect, useState } from "react";
import { Match } from "../../activity/models/matches/Match";
import { RoundBlock } from "./RoundBlock";
import { EmptyRoundBlock } from "./EmptyRoundBlock";
import { Form, Formik } from "formik";
import { FormAction } from "../../../helpers/form/FormAction";
import * as Yup from "yup";
import { useActivity } from "../../activity/core/contexts/ActivityContext";

type Props = {
  match: Match | undefined
}
export const ScoreSettings: FC<Props> = ({ match }) => {
  const {activity} = useActivity()
  const [isSubmitButton, setSubmitButton] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState(undefined);


  const handleSubmit = (e: any) => {
    console.log("submit");
  };

  const handleOnChange = (e: any) => {
    console.log(e.target.name);
    console.log(e.target.value);

  };

  const scoreUpdateValidation = Yup.object().shape({});

  useEffect(() => {
    // console.log(activity?.game_mode?.scoring_settings)
    // let scoreObject: any[] = [];
    // match?.rounds.forEach((rounds) => {
    //   let roundObject = {
    //     round: rounds?.round,
    //
    //   }
    //
    //   let scoresObject: any[] = [];
    //   rounds.scores.map((scores) => {
    //     console.log(scores)
    //
    //     let potatoObj = {
    //       team_id: scores?.team_id
    //     }
    //
    //       let keys: any[] = []
    //     scores?.score_sheet?.forEach((ss) => {
    //
    //       let scoreSheetObject = {
    //         scoring_value_id: ss?.scoring_value_id
    //       }
    //
    //     })
    //
    //   })
    //
    //   // console.log(scoreObject);
    // });
  }, [match]);

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
        initialValues={{}}
        validationSchema={scoreUpdateValidation}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form onChange={handleOnChange} className="form collapse show" autoComplete="off" id="update-scores-wrapper">
            <KTCardBody className="pb-0 pt-5">
              {match?.rounds?.map((round, index) =>
                round?.scores.length > 0 ? (
                  <RoundBlock match={match} round={round} roundIndex={index} key={`round-block-${index}`} />
                ) : (
                  <EmptyRoundBlock match={match} roundIndex={index} key={`round-empty-block-${index}`} />
                )
              )}
            </KTCardBody>
            <FormAction text={"Update Scores"} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </KTCard>
  );
};
