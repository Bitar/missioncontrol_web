import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { KTCard } from "../../helpers/components/KTCard";
import { KTCardBody } from "../../helpers/components/KTCardBody";
import { useGame } from "./core/GameContext";
import clsx from "clsx";

const GameInfo: FC = () => {
  const { game } = useGame();
  const location = useLocation();

  const links = [
    {
      text: "Overview",
      link: "/games/" + game?.id + "/overview"
    },
    {
      text: "Game Modes",
      link: "/games/" + game?.id + "/modes"
    },
    {
      text: "Settings",
      link: "/games/" + game?.id + "/settings"
    }
  ];

  return (
    <>
      <KTCard className="mb-5 mb-xl-10 overflow-hidden">
        <KTCardBody>
          <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
            <div className="me-7 mb-4">
              <div className='w-150px'>
                <img src={game?.image} alt={game?.title} className='w-100'/>
              </div>
            </div>

            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <div className="text-gray-800 fs-2 fw-bolder me-1">{game?.title}</div>
                  </div>

                  <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                    {/*{community?.contact && (*/}
                    {/*  <>*/}
                    {/*    <div className='d-flex align-items-center text-gray-400 me-5 mb-2'>*/}
                    {/*      <KTSVG*/}
                    {/*        path='/media/icons/duotune/com006.svg'*/}
                    {/*        className='svg-icon-4 me-1'*/}
                    {/*      />*/}
                    {/*      {community?.contact?.name}*/}
                    {/*    </div>*/}

                    {/*    <a*/}
                    {/*      href='mailto:`{community.contact?.email}`'*/}
                    {/*      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'*/}
                    {/*    >*/}
                    {/*      <KTSVG*/}
                    {/*        path='/media/icons/duotune/com011.svg'*/}
                    {/*        className='svg-icon-4 me-1'*/}
                    {/*      />*/}
                    {/*      {community?.contact?.email}*/}
                    {/*    </a>*/}
                    {/*  </>*/}
                    {/*)}*/}

                    {/*{community?.address && (*/}
                    {/*  <div className='d-flex align-items-center text-gray-400 mb-2'>*/}
                    {/*    <KTSVG path='/media/icons/duotune/gen018.svg' className='svg-icon-4 me-1' />*/}
                    {/*    {community?.address?.city}*/}
                    {/*  </div>*/}
                    {/*)}*/}
                  </div>
                </div>
                {/*<div className='card-toolbar'>*/}
                {/*  <Link className='btn btn-sm btn-primary' to='/activity/create'>*/}
                {/*    <KTSVG path='/media/icons/duotune/arr075.svg' className='svg-icon-2' />*/}
                {/*    New Activity*/}
                {/*  </Link>*/}
                {/*</div>*/}
              </div>

              <div className="d-flex flex-wrap flex-stack">
                <div className="d-flex flex-column flex-grow-1 pe-8">
                  <div className="d-flex flex-wrap">
                    <div className="d-flex text-gray-600  mb-1">{game?.description}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </KTCardBody>
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

export { GameInfo };
