import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../modules/auth";
import { isSuperAdmin } from "../../../sections/iam/user/core/User";

const CurrentCommunity = () => {
  const { currentUser, communityAdmin } = useAuth();

  return (
    <div className="d-flex align-items-center">
      {communityAdmin && (
        currentUser && isSuperAdmin(currentUser) ? (
          <Link to={`/communities/${communityAdmin?.id}`}>
            <div className="symbol symbol-circle symbol-40px me-3">
              <img src={communityAdmin?.logo} alt={communityAdmin?.name + " community image"} />
            </div>
            <span className="text-gray-800">{communityAdmin?.name}</span>
          </Link>
        ) : (
          <Link to={`/dashboard`}>
            <div className="symbol symbol-circle symbol-40px me-3">
              <img src={communityAdmin?.logo} alt={communityAdmin?.name + " community image"} />
            </div>
            <span className="text-gray-800">{communityAdmin?.name}</span>
          </Link>
        )
      )}
    </div>
  );
};

export { CurrentCommunity };
