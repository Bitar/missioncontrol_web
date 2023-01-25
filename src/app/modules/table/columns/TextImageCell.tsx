import React, { FC } from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";

type Props = {
  link?: string
  dText?: string
  dImage?: string
  dExtraText?: string
  size?: string
}

const TextImageCell: FC<React.PropsWithChildren<Props>> = ({ dImage, dText, dExtraText, link, size = "50" }) => {
  return (
    <div className="d-flex align-items-center">
      <div className={`symbol symbol-circle symbol-${size}px overflow-hidden me-3`}>
        {dImage && (
          <>
            {link ? (
              <Link to={`${link}`}>
                <div className="symbol-label">
                  <img src={toAbsoluteUrl(dImage)} alt="Emma Smith" className="w-100" />
                </div>
              </Link>
            ) : (
              <div className="symbol-label">
                <img src={toAbsoluteUrl(dImage)} alt="Emma Smith" className="w-100" />
              </div>
            )}
          </>
        )}
      </div>
      <div className="d-flex flex-column">
        {link ? (
          <Link to={`${link}`} className="text-gray-800 text-hover-mc-secondary mb-1">
            {dText}
          </Link>
        ) : (
          <span className="text-gray-800 mb-1">{dText}</span>
        )}

        {dExtraText && <span style={{fontSize: '11px'}}>{dExtraText}</span>}
      </div>
    </div>
  );
};

export { TextImageCell };
