import { Field, Form, Formik } from "formik";
import { updateData } from "../../../helpers/form/FormHelper";
import React, { useState } from "react";
import { initialQueryState } from "../../../helpers/crud-helper/models";
import { useQueryRequest } from "../../../modules/table/QueryRequestProvider";
import { Button } from "react-bootstrap";

const initCommunityFilterObj = {
  first_name: "",
  last_name: "",
  email: ""
};

type CommunityFilterObj = {
  first_name: string
  last_name: string
  email: string
}

const CommunityUserFilters = () => {
  const [communityFilters, setCommunityFilters] =
    useState<CommunityFilterObj>(initCommunityFilterObj);
  const { updateState } = useQueryRequest();

  const filterData = () => {
    updateState({
      filter: communityFilters,
      ...initialQueryState
    });
  };

  const handleOnChange = (e: any) => {
    if (e.target.name) {
      updateData({ [e.target.name]: e.target.value }, setCommunityFilters, communityFilters);
    }
  };

  return (
    <div className="bg-primary bg-opacity-5 p-10 mb-15 card-rounded">
      <Formik initialValues={communityFilters} onSubmit={filterData} enableReinitialize>
        <Form onChange={handleOnChange} className="form">
          <div className="row">
            <div className="col-lg-4 mb-5">
              <Field
                type="text"
                name="first_name"
                placeholder="First Name"
                className={"form-control mb-3 mb-lg-0"}
                autoComplete="off"
              />
            </div>

            <div className="col-lg-4 mb-5">
              <Field
                type="text"
                name="last_name"
                placeholder="Last Name"
                className={"form-control mb-3 mb-lg-0"}
                autoComplete="off"
              />
            </div>

            <div className="col-lg-4 mb-5">
              <Field
                type="text"
                name="email"
                placeholder="Email"
                className={"form-control mb-3 mb-lg-0"}
                autoComplete="off"
              />
            </div>
          </div>
          <Button variant="primary" type="submit">Filter</Button>
        </Form>
      </Formik>
    </div>
  );
};

export { CommunityUserFilters };
