import React, { FC } from "react";
import clsx from "clsx";
import { Actions } from "../variables";
import CreateButton from "../../components/buttons/Create";
import FilterButton from "../../components/buttons/Filter";

type Props = {
  className?: string
  text: string
  id?: string
  bg?: string
  text_color?: string
  collapse?: boolean
  target_id?: string
  actions?: CardAction[]
  icon?: string
  icon_style?: string
}

type CardAction = {
  type: Actions
  url?: string
  target?: string
  showFilter?: boolean
  setShowFilter?: React.Dispatch<React.SetStateAction<boolean>>
}

const KTCardHeader: FC<Props> = ({
                                   className,
                                   text,
                                   id,
                                   bg,
                                   text_color,
                                   collapse = false,
                                   target_id,
                                   actions,
                                   icon,
                                   icon_style
                                 }) => {
  let opts: any = {};
  if (collapse) {
    opts["role"] = "button";
    opts["data-bs-toggle"] = "collapse";
    opts["data-bs-target"] = `#${target_id}`;
    opts["aria-expanded"] = "true";
    opts["aria-controls"] = `${target_id}`;
  }

  return (
    <div
      id={id}
      className={clsx(`card-header`, className && className, bg && `bg-${bg}`)}
      {...opts}
    >
      <div className="card-title d-flex align-items">
        {icon && icon_style && (
          <span className="me-2">
            <i className={clsx(icon, icon_style)}></i>
          </span>
        )}
        <h3 className={`card-label text-${text_color || "dark"}`}>{text}</h3>
      </div>
      {actions && actions.length > 0 ? (
        <div className="card-toolbar">
          {actions.map((cardAction, index) => {
            if (cardAction.type === Actions.CREATE) {
              return <CreateButton url={cardAction.url} key={index} />;
            } else if (cardAction.type === Actions.FILTER) {
              return (
                <FilterButton
                  key={index}
                  target={cardAction.target}
                  showFilter={cardAction.showFilter}
                  setShowFilter={cardAction.setShowFilter}
                  className="mx-2"
                />
              );
            } else {
              return <></>;
            }
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export { KTCardHeader };
