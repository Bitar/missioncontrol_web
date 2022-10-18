import { Field } from "formik";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { getRoles } from "../role/core/RoleRequests";
import { updateData } from "../../../helpers/form/FormHelper";
import Select from "react-select";
import { Role } from "../role/models/Role";
import { getAllCommunities } from "../../community/core/CommunityRequests";
import { Community } from "../../community/models/Community";
import { UserForm } from "./models/UserForm";
import { DatePicker } from "rsuite";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

type Props = {
  method: string
  user: UserForm
  setUser: Dispatch<SetStateAction<UserForm>>
}

dayjs.extend(utc);

const UserFormPage: FC<Props> = ({ user, setUser }) => {
  const [roles, setRoles] = useState<Role[]>();
  const [communities, setCommunities] = useState<Community[]>();
  const [dateOfBirthValue, setDateOfBirthValue] = useState<Date | null>(new Date());
  const hasCommunityAdminRole = user.roles.find((role) => role?.id === 3);

  useEffect(() => {
    if (hasCommunityAdminRole) {
      fetchCommunities();
    }
  }, [hasCommunityAdminRole]);

  useEffect(() => {
    getRoles().then((response) => {
      setRoles(response.data);
    });
  }, []);

  useEffect(() => {
    if (user?.meta?.date_of_birth) {
      const utcDate = new Date(user?.meta?.date_of_birth * 1000);
      const actualDate = new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());

      setDateOfBirthValue(actualDate);
    }

  }, [user?.meta?.date_of_birth]);


  const fetchCommunities = () => {
    if (!communities) {
      getAllCommunities().then((response) => {
        setCommunities(response.data);
      });
    }
  };

  return (
    <>
      <div className="row mb-6">
        <label className="col-lg-4 col-form-label required fw-bold fs-6">Full Name</label>

        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-6 fv-row">
              <Field
                type="text"
                name="first_name"
                placeholder="First Name"
                className={"form-control mb-3 mb-lg-0"}
                autoComplete="off"
              />
            </div>

            <div className="col-lg-6 fv-row">
              <Field
                type="text"
                name="last_name"
                placeholder="Last Name"
                className={"form-control mb-3 mb-lg-0"}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-6">
        <label className="col-lg-4 col-form-label required fw-bold fs-6">Email</label>
        <div className="col-lg-8 fv-row">
          <Field
            type="text"
            name="email"
            placeholder="Email"
            className={"form-control mb-3 mb-lg-0"}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="row mb-6">
        <label className="col-lg-4 col-form-label required fw-bold fs-6">Roles</label>
        <div className="col-lg-8 fv-row">
          <Select
            name="role_id"
            placeholder={"Choose a Role"}
            value={user?.roles}
            options={roles}
            getOptionLabel={(role) => role?.name}
            isMulti
            getOptionValue={(role) => role?.id?.toString() || ""}
            onChange={(e) => {
              let communityAdmin = e.find((e: any) => e?.id === 3);

              if (communityAdmin) {
                updateData({ roles: e || [] }, setUser, user);
                fetchCommunities();
              } else {
                updateData({ roles: e || [], community_admin: [] }, setUser, user);
              }
            }}
          />
        </div>
      </div>

      {hasCommunityAdminRole &&
        <div className="row mb-6">
          <label className="col-lg-4 col-form-label required fw-bold fs-6">Community</label>
          <div className="col-lg-8 fv-row">
            <Select
              name="community_id"
              placeholder={"Choose a Community"}
              value={user?.community_admin}
              options={communities}
              getOptionLabel={(community) => community?.name}
              isMulti
              getOptionValue={(community) => community?.id?.toString() || ""}
              onChange={(e) => {
                updateData({ community_admin: e || [] }, setUser, user);
              }}
            />
          </div>
        </div>
      }

      <div className="separator separator-dashed my-6"></div>

      <div className="row mb-6">
        <div className="col-12">
          <h4 className="text-dark">Update Password:</h4>
        </div>
      </div>

      <div className="row mb-6">
        <label className="col-lg-4 col-form-label fw-bold fs-6">Password</label>
        <div className="col-lg-8 fv-row">
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className={"form-control mb-3 mb-lg-0"}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="row mb-6">
        <label className="col-lg-4 col-form-label fw-bold fs-6">Password Confirmation</label>
        <div className="col-lg-8 fv-row">
          <Field
            type="password"
            name="password_confirmation"
            placeholder="Password"
            className={"form-control mb-3 mb-lg-0"}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="separator separator-dashed my-6"></div>

      <div className="row mb-6">
        <div className="col-12">
          <h4 className="text-dark">Profile Details</h4>
        </div>
      </div>

      <div className="row mb-6">
        <label className="col-lg-4 col-form-label fw-bold fs-6">Username</label>
        <div className="col-lg-8 fv-row">
          <div className="input-group mb-3">
            <Field
              type="text"
              name="meta.username"
              placeholder="Username"
              className={"form-control mb-3 mb-lg-0"}
              autoComplete="off"
            />
            <span className="input-group-text">#{user?.meta?.rng}</span>
          </div>
        </div>
      </div>

      <div className="row mb-6">
        <label className="col-lg-4 col-form-label fw-bold fs-6">Date of Birth</label>
        <div className="col-lg-8 fv-row">
          <DatePicker
            value={dateOfBirthValue}
            ranges={[]}
            placement="topStart"
            className="w-100"
            placeholder="Select Time"
            showMeridian={true}
            onChange={(value) => {
              if (value) {
                let dateOfBirth = new Date(value).getTime() / 1000;

                updateData({
                  meta: {
                    ...user?.meta,
                    ...{
                      date_of_birth: dateOfBirth
                    }
                  }
                }, setUser, user);
              }
            }}
          />
        </div>
      </div>

      <div className="row mb-6">
        <label className="col-lg-4 col-form-label fw-bold fs-6">City</label>
        <div className="col-lg-8 fv-row">
          <Field
            type="text"
            name="meta.city"
            placeholder="City"
            className={"form-control mb-3 mb-lg-0"}
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
};

export { UserFormPage };