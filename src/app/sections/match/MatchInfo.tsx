import React, { Dispatch, FC, SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatMatchStatus } from "../../helpers/ActivityHelper";
import { Match } from "../activity/models/matches/Match";
import { calculateTeamScore, getDateFromTimestamp, getTimeFromTimestamp } from "../../helpers/MCHelper";
import { KTCard, KTCardBody, KTSVG } from "../../../_metronic/helpers";
import clsx from "clsx";
import { TeamImage } from "../activity/components/TeamImage";
import { isWinner } from "../../helpers/MatchHelper";
import { BadgeCell } from "../../modules/table/columns/BadgeCell";
import { updateMatchResult } from "./core/MatchRequests";

type Props = {
  match: Match | undefined
  setMatch: Dispatch<SetStateAction<Match | undefined>>
}

const MatchInfo: FC<Props> = ({ match, setMatch }) => {
  const location = useLocation();

  const getStatus = (matchStatus: any) => {
    return formatMatchStatus(matchStatus);
  };

  const links = [
    {
      text: "Overview",
      link: "/activities/" + match?.activity?.id + "/matches/" + match?.id + "/overview"
    },
    {
      text: "Chat",
      link: "/activities/" + match?.activity?.id + "/matches/" + match?.id + "/chat"
    }
    // {
    //   text: 'Settings',
    //   link: '/activities/' + match?.activity?.id + '/matches/' + match?.id + '/settings',
    // },
  ];

  const makeWinner = (match: Match, teamId: any) => {
    console.log(teamId);
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("team_winner", teamId);

    updateMatchResult(match?.id, formData).then((response) => {
      setMatch(response);
    });
  };

  return (
    <>
      <KTCard className="mb-5 mb-xl-10 overflow-hidden">
        <KTCardBody className="pb-0 pt-20">
          <div className="d-flex flex-stack text-center mb-3">
            {match?.teams && match?.teams[0] ? (
              <div className="flex-grow-1">
                <div className="d-inline-block">
                  <TeamImage
                    team={match?.teams[0]}
                    size="100px"
                    className="mb-3"
                    iconTop={"-21px"}
                    isWinner={isWinner(match, match?.teams[0]?.id)}
                  />
                  {match?.status === 3 &&
                    (isWinner(match, match?.teams[0]?.id) ? (
                      <BadgeCell status={"Winner"} color={"success"} />
                    ) : (
                      <button
                        type={"button"}
                        className="btn btn-sm fw-bold btn-warning text-dark"
                        onClick={() => {
                          if (match?.teams && match?.teams[0]) {
                            makeWinner(match, match?.teams[0]?.id);
                          }
                        }}
                      >
                        Make Winner
                      </button>
                    ))}
                </div>
              </div>
            ) : (
              <div className="flex-grow-1">
                <div className="d-inline-block">
                  <TeamImage size="100px" className="mb-3" />
                </div>
              </div>
            )}

            {match?.teams && match?.teams[0] && match?.teams[1] && (
              <div className="flex-grow-1">
                <div className="d-flex flex-stack">
                  <div className="display-1 text-mc-primary">
                    {calculateTeamScore(match, match?.teams[0])}
                  </div>
                  <div className="fs-6 fw-semibold text-gray-600 px-5">
                    <p className="m-0">{getTimeFromTimestamp(match?.start_date)}</p>
                    <p className="mb-1">{getDateFromTimestamp(match?.start_date)}</p>
                    <p className="m-0">
                      <span className={"badge badge-" + getStatus(match?.status)["color"]}>
                        {getStatus(match?.status)["status"]}
                      </span>
                    </p>
                  </div>
                  <div className="display-1 text-mc-primary">
                    {calculateTeamScore(match, match?.teams[1])}
                  </div>
                </div>
              </div>
            )}
            {match?.teams && match?.teams[1] ? (
              <div className="flex-grow-1">
                <div className="d-inline-block">
                  <TeamImage
                    team={match?.teams[1]}
                    size="100px"
                    className="mb-3"
                    iconTop={"-21px"}
                    isWinner={isWinner(match, match?.teams[1]?.id)}
                  />
                  {match?.status === 3 &&
                    (isWinner(match, match?.teams[1]?.id) ? (
                      <BadgeCell status={"Winner"} color={"success"} />
                    ) : (
                      <button
                        type={"button"}
                        className="btn btn-sm fw-bold btn-warning text-dark"
                        onClick={() => {
                          if (match?.teams && match?.teams[1]) {
                            makeWinner(match, match?.teams[1]?.id);
                          }
                        }}
                      >
                        Make Winner
                      </button>
                    ))}
                </div>
              </div>
            ) : (
              <div className="flex-grow-1">
                <div className="d-inline-block">
                  <TeamImage size="100px" className="mb-3" />
                </div>
              </div>
            )}
          </div>

          <div className="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6">
            <KTSVG
              path="icons/duotune/general/gen044.svg"
              className="svg-icon-2tx svg-icon-warning me-4"
            />
            <div className="d-flex flex-stack flex-grow-1">
              <div className="fw-bold">
                <h4 className="text-gray-800 fw-bolder"><i
                  className={"fas fa-warning text-warning fs-2 me-3"}></i> {match?.dispute?.user?.name + " has disputed!"}
                </h4>
                <div className="fs-6 text-gray-600">
                  Reason: {match?.dispute?.message}
                </div>
              </div>
            </div>
          </div>
        </KTCardBody>
        <div className="separator mt-10"></div>
        <KTCardBody className="p-0 rounded-3 rounded-bottom">
          <ul
            className="nav nav-fill nav-line-tabs nav-line-tabs-2x fs-5 fw-bolder flex-nowrap text-center border-transparent">
            {links.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className={clsx(
                    `m-0 nav-link bg-active-mc-secondary text-active-white border-active-mc-secondary border-hover-mc-secondary py-5 `,
                    {
                      active: location.pathname === link.link
                    }
                  )}
                  to={link.link}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </KTCardBody>
      </KTCard>
    </>
  );
};

export { MatchInfo };
