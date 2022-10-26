import { KTCardBody } from "../../../helpers/components/KTCardBody";
import { KTCard } from "../../../helpers/components/KTCard";
import React, { FC } from "react";
import { GameMode } from "../../../models/game/GameMode";
import { KTCardHeader } from "../../../helpers/components/KTCardHeader";

type Props = {
  gameMode: GameMode
}

const GameModeWrapper: FC<Props> = ({ gameMode }) => {
  return (
    <KTCard>
      <KTCardHeader text={gameMode?.name} bg="mc-primary" text_color="white" />
      <KTCardBody>
        Name: {gameMode?.name} <br/>
        Description: {gameMode?.description} <br/>

      </KTCardBody>
    </KTCard>
  );
};

export { GameModeWrapper };