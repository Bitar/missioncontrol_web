/* eslint-disable react/jsx-no-target-blank */
import { Link } from "react-router-dom";
import { KTSVG, toAbsoluteUrl } from "../../../../_metronic/helpers";

const SidebarFooter = () => {
  return (
    <div className="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6" id="kt_app_sidebar_footer">
      <Link
        to={"/marketing-support"}
        className="btn btn-flex flex-center btn-custom btn-mc-secondary overflow-hidden text-nowrap px-0 h-40px w-100"
        data-bs-toggle="tooltip"
        data-bs-trigger="hover"
        data-bs-dismiss-="click"
      >
        <KTSVG path={toAbsoluteUrl("/media/icons/duotune/gen005.svg")} className="svg-icon-2" />
        <span className="btn-label">Marketing & Support</span>
      </Link>
    </div>
  );
};

export { SidebarFooter };
