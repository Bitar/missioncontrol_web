/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";

type Props = {
  dObject: any,
  showImage?: boolean
}

const TextCell: FC<Props> = ({ dObject, showImage = false }) => (
  <>
    <div className="d-flex align-items-center">
      {showImage &&
        <>
          <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
            <a href="../../demo1/dist/apps/user-management/users/view.html">
              <div className="symbol-label">
                <img src={toAbsoluteUrl("media/avatars/300-6.jpg")} alt="Emma Smith" className="w-100" />
              </div>
            </a>
          </div>
          <div className="d-flex flex-column">
          <a href="../../demo1/dist/apps/user-management/users/view.html" className="text-gray-800 text-hover-primary mb-1">{dObject}</a>
          <span>smith@kpmg.com</span>
          </div>
        </>
      }
    </div>
  </>
);

export { TextCell };
