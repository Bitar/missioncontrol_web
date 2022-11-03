import { useQueryRequest } from "../../../modules/table/QueryRequestProvider";
import React, { useState } from "react";
import { initialQueryState } from "../../../helpers/crud-helper/models";
import { updateData } from "../../../helpers/form/FormHelper";
import { KTCardHeader } from "../../../helpers/components/KTCardHeader";
import { Field, Form, Formik } from "formik";
import { KTCardBody } from "../../../helpers/components/KTCardBody";
import { KTCard } from "../../../helpers/components/KTCard";

const initGameFilterObj = {
  title: ""
}

type GameFilterObj = {
  title: string
}

export const GameFilters = () => {
  const { updateState } = useQueryRequest();
  const [gameFilters, setGameFilters] = useState<GameFilterObj>(initGameFilterObj)

  const filterData = () => {
    updateState({
      filter: gameFilters,
      ...initialQueryState
    });
  };

  const handleOnChange = (e: any) => {
    if (e.target.name) {
      updateData({ [e.target.name]: e.target.value }, setGameFilters, gameFilters);
    }
  };

  return (
    <KTCard id="filter-container" className="bg-transparent mb-10" shadow={false} border={true}>
      <KTCardHeader text={"Filters"} bg={"info"} text_color={"white"} />
      <Formik initialValues={gameFilters} onSubmit={filterData} enableReinitialize>
        <Form onChange={handleOnChange} className="form" autoComplete='off'>
          <KTCardBody>
            <div className="row">
              <div className="col-lg-4">
                <Field
                  type="text"
                  name="title"
                  placeholder="Title"
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
  )
}