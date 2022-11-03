import { Prizes } from "./Prizes";
import React, { Dispatch, FC, SetStateAction } from "react";
import { ActivityPrize } from "../../models/ActivityPrize";

type Props = {
  activityPrizes: ActivityPrize[]
  setActivityPrizes: Dispatch<SetStateAction<ActivityPrize[]>>
}

const PrizeSingleWrapper: FC<Props> = ({ activityPrizes, setActivityPrizes }) => {
  return (
    <Prizes activityPrizes={activityPrizes} setActivityPrizes={setActivityPrizes} />
  );
};

export { PrizeSingleWrapper };
