import { Community } from "../models/Community";
import { FC, useEffect } from "react";

type Props = {
  community: Community
}

let communityAcitivities: any[] = [];

const CommunityActivities: FC<Props> = ({ community }) => {

  useEffect(() => {
    if (communityAcitivities.length === 0) {

    }
  }, []);

  return (
    <>
    </>
  );
};

export { CommunityActivities };