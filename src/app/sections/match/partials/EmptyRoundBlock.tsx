import React, { FC } from "react";
import { Match } from "../../activity/models/matches/Match";
import { useActivity } from "../../activity/core/contexts/ActivityContext";
import { EmptyScoresBlock } from "./EmptyScoresBlock";

export const EmptyRoundBlock: FC<{ roundIndex: number; match: Match }> = ({ roundIndex, match }) => {
  const { activity } = useActivity();

  return (
    <div key={`round-block-inner-${roundIndex}`}>
      <div className="round-scores empty-round-scores rounded border-warning border border-dashed p-6">
        <h4 className="text-center">Round {roundIndex + 1}</h4>

        <div className="mt-6 d-flex justify-content-around">
          {match?.teams?.map((team, teamScoreIndex) => {
            return <EmptyScoresBlock roundIndex={roundIndex} team={team}
                                     key={`round-empty-score-per-team-${teamScoreIndex}`} />;
          })}
        </div>
      </div>

      <div className="my-5"></div>
    </div>
  );
};
