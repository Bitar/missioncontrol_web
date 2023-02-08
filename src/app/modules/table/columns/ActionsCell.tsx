/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from "react";
import { ID, stringifyRequestQuery } from "../../../../_metronic/helpers";
import { MenuComponent } from "../../../../_metronic/assets/ts/components";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import { deleteObject } from "../../../requests";
import { useQueryRequest } from "../QueryRequestProvider";
import clsx from "clsx";
import { useAuth } from "../../auth";
import { isCommunityAdmin, isSuperAdmin } from "../../../models/iam/User";
import Swal from "sweetalert2";
import { extractErrors } from "../../../requests/helpers";
import axios from "axios";

type Props = {
  id: ID
  path: string
  queryKey: string
  showEdit?: boolean
  showDelete?: boolean
  showView?: boolean
  canAdminDelete?: boolean
  callBackFn?: any
  title?: string,
  text?: string
}

const ActionsCell: FC<React.PropsWithChildren<Props>> = ({
                                                           id,
                                                           path,
                                                           queryKey,
                                                           showEdit,
                                                           showDelete = true,
                                                           showView,
                                                           canAdminDelete,
                                                           callBackFn,
                                                           title,
                                                           text
                                                         }) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const { state } = useQueryRequest();
  const [query] = useState<string>(stringifyRequestQuery(state));


  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const deleteItem = async () => {
    const { isConfirmed } = await Swal.fire({
      title: title && "Delete",
      text: text && "Are you sure you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm Delete",
      confirmButtonColor: "#DB4437",
      cancelButtonText: "Dismiss",
      reverseButtons: true
    });

    if (isConfirmed) {
      deleteObject(path + "/" + id)
        .then(() => {
          queryClient.invalidateQueries(`${queryKey}-${query}`);
        }).catch((error) => {
        if (axios.isAxiosError(error)) {
          const errorMessages = extractErrors(error).map((errorMessage) => `<li>${errorMessage}</li>`);

          // we need to show the error
          Swal.fire(
            "Something Wrong Happened",
            "<p>" + errorMessages.join() + "</p>",
            "error"
          );
        } else if (error === undefined) {
          // we need to show a generic error
          Swal.fire(
            "Something Wrong Happened",
            "<p>Could not complete your request. Please try again later.</p>",
            "error"
          );
        }
      }).finally(() => {
        if (callBackFn) {
          callBackFn();
        }
      });
    }
  };

  return (
    <>
      {showView && (
        <Link to={"/" + path + "/" + id} className="btn btn-icon btn-active-light-info">
          <i className={clsx("fa-duotone fs-3 text-info", "fa-circle-info")}></i>
        </Link>
      )}

      {showEdit && (
        <Link
          to={"/" + path + "/" + id + "/edit"}
          className="btn btn-icon btn-sm btn-active-light-warning"
        >
          <i className={clsx("fa-duotone fs-3 text-warning", "fa-pencil")}></i>
        </Link>
      )}

      {showDelete &&
        currentUser &&
        ((canAdminDelete && isCommunityAdmin(currentUser)) || isSuperAdmin(currentUser)) && (
          <a
            className="btn btn-icon btn-sm btn-active-light-danger"
            onClick={async () => deleteItem()}
          >
            <i className={clsx("fa-duotone fs-3 text-danger", "fa-trash")}></i>
          </a>
        )}
    </>
  );
};

export { ActionsCell };
