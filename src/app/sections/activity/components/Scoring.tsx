import React, { FC } from "react";
import { ScoringSetting } from "./ScoringSetting";
import { GameMode } from "../../../models/game/GameMode";

type Props = {
  gameMode: GameMode | undefined
}

const Scoring: FC<Props> = ({ gameMode }) => {
  console.log(gameMode);
  const players = () => {
    let minPlayers = gameMode?.min_players;
    let maxPlayers = gameMode?.max_players;

    if (minPlayers === maxPlayers) {
      return minPlayers;
    }

    return minPlayers + " - " + maxPlayers;
  };

  return (
    <div className="row mb-6 justify-content-center">
      <div className="col-lg-8">
        <div className={`card card-xl-stretch mb-xl-8`}>
          {/* begin::Body */}
          <div className="card-body p-0">
            <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-mc-secondary`}>
              <div className="d-flex flex-stack">
                <h3 className="m-0 text-white fw-bold fs-3">Scoring Settings</h3>
              </div>
              <div className="d-flex text-center flex-column text-white pt-8">
                <span className="fw-semibold fs-7">{gameMode?.scoring_type?.name}</span>
                <span className="fw-bold fs-2x pt-1">{gameMode?.name}</span>
              </div>
            </div>

            <div
              className="shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-body"
              style={{ marginTop: "-100px" }}
            >
              <div className="d-flex align-items-center mb-6">
                <div className="symbol symbol-45px w-40px me-5">
                  <span className="symbol-label bg-lighten">
                    <i className="fa fa-users fs-2"></i>
                  </span>
                </div>

                <div className="d-flex align-items-center flex-wrap w-100">
                  <div className="mb-1 pe-3 flex-grow-1">
                    <span className="fs-5 text-gray-800 fw-bold">Players</span>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Number of players allowed per team
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <div className="fw-bold fs-5 text-gray-800 pe-1">{players()}</div>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center mb-6">
                <div className="symbol symbol-45px w-40px me-5">
                  <span className="symbol-label bg-lighten">
                    <i className="fa fa-clock fs-2"></i>
                  </span>
                </div>
                <div className="d-flex align-items-center flex-wrap w-100">
                  <div className="mb-1 pe-3 flex-grow-1">
                    <span className="fs-5 text-gray-800 fw-bold">Game Time</span>
                    <div className="text-gray-400 fw-semibold fs-7">Average time per game</div>
                  </div>

                  <div className="d-flex align-items-center">
                    <div className="fw-bold fs-5 text-gray-800 pe-1">{gameMode?.game_time} min</div>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center mb-3">
                <div className="symbol symbol-45px w-40px me-5">
                  <span className="symbol-label bg-lighten">
                    <i className="fa-solid fa-otter fs-2"></i>
                  </span>
                </div>
                <div className="d-flex align-items-center flex-wrap w-100">
                  <div className="mb-1 pe-3 flex-grow-1">
                    <span className="fs-5 text-gray-800 fw-bold">Scoring</span>
                    <div className="text-gray-400 fw-semibold fs-7"></div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="fs-5 text-gray-800 pe-1">
                  {gameMode?.scoring_settings.map((value) => (
                    <ScoringSetting key={value.id} settings={value} />
                  ))}
                </div>
              </div>

              {/*<div className="d-flex align-items-center mb-3">*/}
              {/*  <div className="symbol symbol-45px w-40px me-5">*/}
              {/*    <span className="symbol-label bg-lighten">*/}
              {/*      <i className="fa-solid fa-person-chalkboard fs-2"></i>*/}
              {/*    </span>*/}
              {/*  </div>*/}
              {/*  <div className="d-flex align-items-center flex-wrap w-100">*/}
              {/*    <div className="mb-1 pe-3 flex-grow-1">*/}
              {/*      <span className="fs-5 text-gray-800 fw-bold">Instructions</span>*/}
              {/*      <div className="text-gray-400 fw-semibold fs-7">What to do </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="d-flex align-items-center mb-6">*/}
              {/*  <div className="text-gray-800 pe-1">{gameMode?.instructions}</div>*/}
              {/*</div>*/}

              <div className="d-flex align-items-center mb-6">
                <div className="symbol symbol-45px w-40px me-5">
                  <span className="symbol-label bg-lighten">
                    <i className="fa fa-cogs fs-2"></i>
                  </span>
                </div>
                <div className="d-flex align-items-center flex-wrap w-100">
                  <div className="mb-1 pe-3 flex-grow-1">
                    <span className="fs-5 text-gray-800 fw-bold">Settings</span>
                    <div className="text-gray-400 fw-semibold fs-7">Settings/Rules?</div>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="text-gray-800 pe-1">
                  <ul>
                    {gameMode?.settings.map((value, index) => (
                      <li key={`random-key-${index}`}>{value.setting}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Scoring };
