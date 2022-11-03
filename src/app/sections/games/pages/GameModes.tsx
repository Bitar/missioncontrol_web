import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllGameModes } from "../core/GameRequests";
import { ID, KTCardBody } from "../../../../_metronic/helpers";
import { updateData } from "../../../helpers/form/FormHelper";
import { useGame } from "../core/GameContext";
import { GameMode } from "../../../models/game/GameMode";
import { GameModeWrapper } from "./GameModeWrapper";
import { NewGameModeWrapper } from "./NewGameModeWrapper";
import { deleteObject } from "../../../requests";

const GameModes: FC = () => {
  const { game, setGame, updateGame } = useGame();
  const params = useParams();
  const [gameMode, setGameMode] = useState<GameMode>();
  const [newGameMode, setNewGameMode] = useState<boolean>(false);
  // const GAMES_URL = `${API_URL}/games`;

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

  const addGameMode = () => {
    setNewGameMode(true);
    if (gameMode) {
      setGameMode(undefined);
    }
  };

  const deleteGameMode = async (id: ID) => {
    let url = `games/${params.id}/modes/${id}`;
    await deleteObject(url).then(() => {
      if (gameMode?.id === id) {
        setGameMode(undefined);
      }
      updateGame();
    });
  };

  return (
    <>
      <div className="row g-6 g-xl-9 mb-6 mb-xl-9">
        {game?.game_modes?.map((gameMode) => (
          <div key={gameMode?.id} className="col-12 col-xl">
            <div className="card h-100">
              <div className="card-body cursor-pointer d-flex justify-content-center flex-column p-8"
                   onClick={() => {
                     setNewGameMode(false);
                     setGameMode(gameMode);
                   }}>
                <span className="text-gray-800 d-flex flex-column">
                  <div className="fs-5 fw-bolder mb-2">{gameMode?.name}</div>
                </span>
                <div className="fs-7 fw-bold text-gray-400 mt-auto mb-2">
                  {gameMode?.description.length > 150 ? gameMode?.description.substring(0, 150) + "..." : gameMode?.description}
                </div>
                <div className="fs-7 fw-bold text-gray-400 mt-auto">
                  Players:{" "}
                  {gameMode?.min_players === gameMode?.max_players
                    ? gameMode?.min_players
                    : gameMode?.min_players + "-" + gameMode?.max_players}
                </div>
              </div>
              <div className="text-center py-5">
                <i className="fas fa-trash text-danger cursor-pointer" onClick={() => deleteGameMode(gameMode?.id)}></i>
              </div>
            </div>
          </div>
        ))}
        <div className="col-12 col-xl">
          <div className="card h-100 cursor-pointer text-center bg-success" onClick={() => addGameMode()}>
            <KTCardBody className="d-flex justify-content-center flex-column p-8">
                <span className="text-light-success d-flex flex-column">
                  <div className="mb-5">
                    <i className="fa fa-plus-circle text-light-success fs-3x"></i>
                  </div>
                  <div className="fs-5 fw-bolder mb-2"> Add a new Game Mode</div>
                </span>
            </KTCardBody>
          </div>
        </div>
      </div>

      {gameMode &&
        <div className="row">
          <div className="col-12">
            <GameModeWrapper gameMode={gameMode} setGameMode={setGameMode} />
          </div>
        </div>
      }

      {newGameMode &&
        <div className="row">
          <div className="col-12">
            <NewGameModeWrapper setNewGameMode={setNewGameMode} setGameMode={setGameMode} />
          </div>
        </div>
      }

    </>
  );
};

export { GameModes };
