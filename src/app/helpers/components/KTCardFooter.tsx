import clsx from "clsx";
import { FC } from "react";
import { WithChildren } from "../../../_metronic/helpers";

type Props = {
  className?: string
  scroll?: boolean
  height?: number
  id?: string
}

export const KTCardFooter: FC<Props & WithChildren> = (props) => {
  const { className, scroll, height, id, children } = props;
  return (
    <div
      id={id}
      className={clsx(
        "card-footer",
        className && className,
        {
          "card-scroll": scroll
        },
        height && `h-${height}px`
      )}
    >
      {children}
    </div>
  );
};