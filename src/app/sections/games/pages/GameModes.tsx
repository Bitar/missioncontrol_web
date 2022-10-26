import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllGameModes } from "../core/GameRequests";
import { KTCard, KTCardBody } from "../../../../_metronic/helpers";
import { updateData } from "../../../helpers/form/FormHelper";
import { useGame } from "../core/GameContext";
import { GameMode } from "../../../models/game/GameMode";

const GameModes: FC = () => {
  const { game, setGame } = useGame();
  const params = useParams();
  const [gameMode, setGameMode] = useState<GameMode>();

  useEffect(() => {
    if (game?.game_modes?.length === 0) {
      getAllGameModes(params.id).then((response) => {
        updateData(
          {
            game_modes: response.data
          },
          setGame,
          game
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    console.log("yo");
    console.log(gameMode);
  }, [gameMode]);

  return (
    <>
      <div className="row g-6 g-xl-9 mb-6 mb-xl-9">
        {game?.game_modes?.map((gameMode) => (
          <div key={gameMode?.id} className="col-12 col-xl cursor-pointer"
               onClick={() => setGameMode(gameMode)}>
            <KTCard className="h-100">
              <KTCardBody className="d-flex justify-content-center flex-column p-8">
                {/*<Link to={"/games/" + params.id + "/modes/" + gameMode?.id}>*/}
                <span className="text-gray-800 d-flex flex-column">
                  <div className="fs-5 fw-bolder mb-2">{gameMode?.name}</div>
                </span>
                <div className="fs-7 fw-bold text-gray-400 mt-auto mb-2">
                  {gameMode?.description}
                </div>
                <div className="fs-7 fw-bold text-gray-400 mt-auto">
                  Players:{" "}
                  {gameMode?.min_players === gameMode?.max_players
                    ? gameMode?.min_players
                    : gameMode?.min_players + "-" + gameMode?.max_players}
                </div>
                {/*</Link>*/}
              </KTCardBody>
            </KTCard>
          </div>
        ))}
      </div>

      {gameMode &&
        <div className="row g-6 g-xl-9 mb-6 mb-xl-9">
          <KTCard>
            <KTCardBody>

            </KTCardBody>
          </KTCard>
        </div>
      }

    </>
  );
};

export { GameModes };
