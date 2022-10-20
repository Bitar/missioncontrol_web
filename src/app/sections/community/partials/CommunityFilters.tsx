import { useQueryRequest } from "../../../modules/table/QueryRequestProvider";
import { KTCardHeader } from "../../../helpers/components/KTCardHeader";
import { Field, Form, Formik } from "formik";
import { KTCardBody } from "../../../helpers/components/KTCardBody";
import { updateData } from "../../../helpers/form/FormHelper";
import { KTCard } from "../../../helpers/components/KTCard";
import React, { useState } from "react";
import { initialQueryState } from "../../../helpers/crud-helper/models";


const initCommunityFilterObj = {
  name: ""
};

type CommunityFilterObj = {
  name: string
}


const CommunityFilters = () => {
  const { updateState } = useQueryRequest();
  const [communityFilters, setCommunityFilters] = useState<CommunityFilterObj>(initCommunityFilterObj);

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
    <KTCard id="filter-container" className="bg-transparent mb-10" shadow={false} border={true}>
      <KTCardHeader text={"Filters"} bg={"info"} text_color={"white"} />
      <Formik initialValues={communityFilters} onSubmit={filterData} enableReinitialize>
        <Form onChange={handleOnChange} className="form" autoComplete='off'>
          <KTCardBody>
            <div className="row">
              <div className="col-lg-4">
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={"form-control mb-3 mb-lg-0"}
                  autoComplete="off"
                />
              </div>
            </div>
          </KTCardBody>
          <div className="card-footer d-flex justify-content-end py-6 px-9">
            <button type="submit" className="btn btn-mc-secondary btn-active-mc-secondary btn-sm">
              <span className="indicator-label">Filter</span>
            </button>
          </div>
        </Form>
      </Formik>
    </KTCard>
  );
};

export { CommunityFilters };