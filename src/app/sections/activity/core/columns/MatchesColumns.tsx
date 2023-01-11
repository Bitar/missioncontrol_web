import { Column } from "react-table";
import { CustomHeader } from "../../../../modules/table/columns/CustomHeader";
import React from "react";
import { Match } from "../../models/matches/Match";
import { isWinner } from "../../../../helpers/MatchHelper";
import { TeamImage } from "../../components/TeamImage";
import { calculateTeamScore, getDateFromTimestamp } from "../../../../helpers/MCHelper";
import { formatMatchStatus, getDateConvertedToLocal } from "../../../../helpers/ActivityHelper";
import clsx from "clsx";
import { Link } from "react-router-dom";

const MatchesColumns: ReadonlyArray<Column<Match>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title="" className="mw-200px" />,
    id: "teamA",
    Cell: ({ ...props }) => (
      <div
        className={clsx("bg-light-secondary", {
          "bg-light-success":
            props.data[props.row.index]?.result &&
            isWinner(props.data[props.row.index], props.data[props.row.index]?.teams[0]?.id),
          "bg-light-danger":
            props.data[props.row.index]?.result &&
            !isWinner(props.data[props.row.index], props.data[props.row.index]?.teams[0]?.id)
        })}
      >
        <div className="d-flex flex-stack text-start pt-8 pb-3">
          <div className="flex-grow-1 flex-stack">
            <TeamImage
              team={props.data[props.row.index]?.teams[0]}
              size="50px"
              isWinner={isWinner(
                props.data[props.row.index],
                props.data[props.row.index]?.teams[0]?.id
              )}
            />
          </div>
        </div>
      </div>
    )
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title="" className="mw-150px" />,
    id: "teamAScore",
    Cell: ({ ...props }) => (
      <div className="text-center">
        <span className="display-6">
          {calculateTeamScore(props.data[props.row.index], props.data[props.row.index]?.teams[0])}
        </span>
      </div>
    )
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title="" className="mw-150px" />,
    id: "details",
    Cell: ({ ...props }) => {
      console.log(props.data[props.row.index]?.start_date);
      return (
        <div className="text-center">
          <div className="fw-semibold text-gray-600 px-5" style={{ fontSize: "12px" }}>
            <p className="m-0">
              {getDateConvertedToLocal(props.data[props.row.index]?.start_date).format("hh:mm a")}
            </p>
            <p className="m-0">{getDateFromTimestamp(props.data[props.row.index]?.start_date)}</p>
            <p className="m-0 text-center">
              <span
                className={
                  "badge badge-" + formatMatchStatus(props.data[props.row.index]?.status)["color"]
                }
              >
                {formatMatchStatus(props.data[props.row.index]?.status)["status"]}
              </span>
            </p>
            <p>
              {/*<Link to={'/'} className={}>*/}
              {/*  View Match*/}
              {/*</Link>*/}
              <Link
                to={
                  "/activities/" +
                  props.data[props.row.index]?.activity_id +
                  "/matches/" +
                  props.data[props.row.index]?.id
                }
                replace
                className="bg-info p-2 d-inline-block rounded mt-1"
              >
                <i className="fas fa-eye text-white"></i>
              </Link>
            </p>
          </div>
        </div>
      );
    }
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title="" className="mw-150px" />,
    id: "teamBScore",
    Cell: ({ ...props }) => (
      <div className="text-center">
        <span className="display-6">
          {calculateTeamScore(props.data[props.row.index], props.data[props.row.index]?.teams[1])}
        </span>
      </div>
    )
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title="" className="mw-300px" />,
    id: "teamB",
    Cell: ({ ...props }) => (
      <div
        className={clsx("bg-light-secondary", {
          "bg-light-success":
            props.data[props.row.index]?.result &&
            isWinner(props.data[props.row.index], props.data[props.row.index]?.teams[1]?.id),
          "bg-light-danger":
            props.data[props.row.index]?.result &&
            !isWinner(props.data[props.row.index], props.data[props.row.index]?.teams[1]?.id)
        })}
      >
        <div className="d-flex flex-stack text-start pt-8 pb-3">
          <div className="flex-grow-1 flex-stack">
            <TeamImage
              team={props.data[props.row.index]?.teams[1]}
              size="50px"
              isWinner={isWinner(
                props.data[props.row.index],
                props.data[props.row.index]?.teams[1]?.id
              )}
            />
          </div>
        </div>
      </div>
    )
  }
];

export { MatchesColumns };
