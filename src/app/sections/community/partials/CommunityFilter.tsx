import { useQueryRequest } from "../../../modules/table/QueryRequestProvider";
import { Field, Form, Formik } from "formik";
import React, { FC, useState } from "react";
import { initialQueryState } from "../../../helpers/crud-helper/models";
import { Col, Collapse, Row } from "react-bootstrap";
import { createFilterQueryParam } from "../../../helpers/requests";
import { genericOnChangeHandler } from "../../../helpers/form";
import FilterFormFooter from "../../../components/form/FilterFormFooter";
import { CommunityFilterForm, defaultCommunityFilterForm } from "../core/CommunityFilterForm";

interface Props {
  showFilter: boolean;
  setExportQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CommunityFilter: FC<Props> = ({ showFilter, setExportQuery }) => {
  const { updateState } = useQueryRequest();
  const [communityFilters, setCommunityFilters] =
    useState<CommunityFilterForm>(defaultCommunityFilterForm);
  const [reset, setReset] = useState<boolean>(false);

  const handleFilter = () => {
    setExportQuery(createFilterQueryParam(communityFilters));

    updateState({
      filter: reset ? undefined : communityFilters,
      ...initialQueryState
    });
  };

  const handleOnChange = (e: any) => genericOnChangeHandler(e, communityFilters, setCommunityFilters);

  const resetFilter = () => {
    setCommunityFilters(defaultCommunityFilterForm);
    setReset(true);
  };

  return (
    <Collapse in={showFilter}>
      <Row id="#communities-list-filter">
        <Col>
          <div className="card-rounded bg-primary bg-opacity-5 p-10 mb-15">
            <Formik initialValues={communityFilters} onSubmit={handleFilter} enableReinitialize>
              <Form onChange={handleOnChange} className="form">
                <div className="row">
                  <div className="col-lg-4 mb-5">
                    <Field
                      type="text"
                      name="name"
                      placeholder="Name"
                      className={"form-control mb-3 mb-lg-0"}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <FilterFormFooter resetFilter={resetFilter} />
              </Form>
            </Formik>
          </div>
        </Col>
      </Row>
    </Collapse>

  );
};

export { CommunityFilter };
