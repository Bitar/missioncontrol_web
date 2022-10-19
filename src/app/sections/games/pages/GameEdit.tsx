import React, { FC } from "react";
import { Form, Formik } from "formik";
import { formOnChange, gameSchema, initialGame } from "../../../models/game/Game";
import { KTCard, KTCardBody } from "../../../../_metronic/helpers";
import { updateGame } from "../core/GameRequests";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useGame } from "../core/GameContext";

const GameEdit: FC = () => {
  const { game, setGame } = useGame();
  const params = useParams();

  const handleSubmit = async () => {
    if (game && game.description) {
      let data = new FormData();
      data.append("_method", "PUT");
      data.append("title", game.title);
      data.append("description", game.description);

      await updateGame(params.id, data).then((response) => {
        setGame(response);
      });
    }
  };

  const handleOnChange = (e: any) => formOnChange(e, game, setGame);

  return (
    <>
      <KTCard>
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label">Update Game</h3>
          </div>
        </div>

        <Formik
          initialValues={initialGame(game)}
          onSubmit={handleSubmit}
          validationSchema={gameSchema}
          enableReinitialize
        >
          {({ isSubmitting, isValid, touched, errors, values }) => (
            <Form onChange={handleOnChange} className="form">
              <KTCardBody className="py-4">
                <div className="d-flex flex-column pt-5">
                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label required fw-bold fs-6">Name</label>
                    <div className="col-lg-8 fv-row">
                      <TextField
                        id="title"
                        size="small"
                        name="title"
                        label="Title"
                        className="w-100"
                        variant="outlined"
                        value={values.title}
                        onChange={handleOnChange}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                      />
                    </div>
                  </div>

                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label fw-bold fs-6">Description</label>
                    <div className="col-lg-8 fv-row">
                      <TextField
                        multiline
                        id="description"
                        size="small"
                        name="description"
                        label="Description"
                        className="w-100"
                        variant="outlined"
                        value={values.description}
                        onChange={handleOnChange}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                      />
                    </div>
                  </div>
                </div>
              </KTCardBody>
              <div className="card-footer d-flex justify-content-end py-6 px-9">
                <button
                  type="submit"
                  className="btn btn-light-mc-secondary btn-active-mc-secondary btn-sm"
                  data-kt-users-modal-action="submit"
                  disabled={isSubmitting || !isValid || !touched}
                >
                  <span className="indicator-label">Save Changes</span>
                  {isSubmitting && (
                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2" />
                    </span>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </KTCard>
    </>
  );
};

export { GameEdit };
