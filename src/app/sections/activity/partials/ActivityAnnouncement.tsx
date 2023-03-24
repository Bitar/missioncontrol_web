import React, { useEffect, useMemo, useState } from "react";
import { KTCard, KTCardBody, KTCardHeader } from "../../../helpers/components";
import { Announcement, announcementSchema, defaultAnnouncement } from "../../../models/announcement/Announcements";
import {
  createActivityAnnouncement,
  EXPORT_ENDPOINT,
  getActivityAnnouncements,
  getSingleActivityAnnouncements,
  updateActivityAnnouncement
} from "../core/requests/ActivityRequests";
import { jsonToFormData, updateData } from "../../../helpers/form/FormHelper";
import { useActivity } from "../core/contexts/ActivityContext";
import toast from "react-hot-toast";
import {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponseLoading
} from "../../../modules/table/QueryResponseProvider";
import { McTable } from "../../../components/McTable";
import { ActivityAnnouncementsColumns } from "../core/columns/ActivityAnnouncementsColumns";
import { QUERIES } from "../../../helpers/crud-helper/consts";
import { ListViewProvider } from "../../../modules/table/ListViewProvider";
import { ExportCardAction } from "../../../components/misc/CardAction";
import { QueryRequestProvider } from "../../../modules/table/QueryRequestProvider";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormAction } from "../../../helpers/form/FormAction";
import AutoResizableTextarea from "../../../components/form/AutoResizableTextarea";
import { useNavigate, useParams } from "react-router-dom";

const ActivityAnnouncementsTable = () => {
  const activityAnnouncements = useQueryResponseData();
  const isLoading = useQueryResponseLoading();
  const data = useMemo(() => activityAnnouncements, [activityAnnouncements]);
  const columns = useMemo(() => ActivityAnnouncementsColumns, []);

  return (
    <McTable
      data={data}
      columns={columns}
      model={activityAnnouncements.length > 0 ? activityAnnouncements[0] : null}
      isLoading={isLoading}
    />
  );
};

const ActivityAnnouncement = () => {
  const { activity } = useActivity();

  const EXPORT_ANNOUNCEMENT_ENDPOINT = EXPORT_ENDPOINT + "/" + activity?.id + "/announcements";

  return activity ? (
    <QueryRequestProvider>
      <QueryResponseProvider
        id={QUERIES.ACTIVITIES_ANNOUNCEMENT_LIST}
        requestFunction={getActivityAnnouncements}
        requestId={activity?.id}
      >
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text="Activity Announcement"
              icon="fa-regular fa-list"
              icon_style="fs-3 text-primary"
              actions={[
                new ExportCardAction("", EXPORT_ANNOUNCEMENT_ENDPOINT)
              ]}
            />
            <KTCardBody>
              <AnnouncementFormSection />
              <div className="separator separator-dotted mb-6"></div>
              <ActivityAnnouncementsTable />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  ) : (
    <div></div>
  );
};

const AnnouncementFormSection = () => {
  const { activity } = useActivity();
  const [announcement, setAnnouncement] = useState<Announcement>(defaultAnnouncement);
  const { refetch } = useQueryResponse();
  const handleSubmit = async () => {
    let data = jsonToFormData(announcement);
    await createActivityAnnouncement(activity?.id, data).then(() => {
      setAnnouncement(defaultAnnouncement);
      toast.success("Announcement Sent");
      refetch();
    });
  };

  const handleOnChange = (e: any) => {
    updateData(
      {
        [e.target.name]: e.target.value
      },
      setAnnouncement,
      announcement
    );
  };

  return (
    <Formik
      validationSchema={announcementSchema}
      initialValues={announcement}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form onChange={handleOnChange} className="form mt-6">
          <div className="row mb-6">
            <label className="col-lg-2 col-form-label required fw-bold fs-6">Title</label>
            <div className="col-lg-10 fv-row">
              <Field
                type="text"
                name="title"
                placeholder="Title"
                className="form-control mb-3 mb-lg-0"
                autoComplete="off"
              />
              <div className="text-danger mt-2">
                <ErrorMessage name="title" />
              </div>
            </div>
          </div>

          <div className="row mb-6">
            <label className="col-lg-2 col-form-label required fw-bold fs-6">Body</label>
            <div className="col-lg-10 fv-row">
              <AutoResizableTextarea name="body" value={announcement.body} />
              <div className="text-danger mt-2">
                <ErrorMessage name="body" />
              </div>
            </div>
          </div>

          <div className="row">
            <FormAction text={"Submit"} isSubmitting={isSubmitting} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { ActivityAnnouncement };

export const ActivityAnnouncementEdit = () => {
  const { activity } = useActivity();
  const navigate = useNavigate();
  const { announcementId } = useParams();
  const [announcement, setAnnouncement] = useState<Announcement>(defaultAnnouncement);

  useEffect(() => {
    if (activity?.id) {
      getSingleActivityAnnouncements(activity?.id, announcementId).then((response) => {
        if (response) {
          setAnnouncement(response);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  const handleSubmit = async () => {
    delete announcement.user;
    let data = jsonToFormData(announcement);
    data.append("_method", "PUT");

    if (activity?.id) {
      await updateActivityAnnouncement(activity?.id, announcementId, data).then(() => {
        setAnnouncement(defaultAnnouncement);
        toast.success("Announcement Updated");
        navigate("/activities/" + activity?.id + "/announcements");
      });
    }
  };

  const handleOnChange = (e: any) => {
    updateData(
      {
        [e.target.name]: e.target.value
      },
      setAnnouncement,
      announcement
    );
  };

  return (
    <KTCard>
      <KTCardHeader text="Edit Announcement" icon="fa-regular fa-pencil" icon_style="fs-3 text-warning" />

      <Formik
        initialValues={announcement}
        onSubmit={handleSubmit}
        validationSchema={announcementSchema}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form onChange={handleOnChange} className="form mt-6">
            <KTCardBody className="py-4">
              <div className="row mb-6">
                <label className="col-lg-2 col-form-label required fw-bold fs-6">Title</label>
                <div className="col-lg-10 fv-row">
                  <Field
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="form-control mb-3 mb-lg-0"
                    autoComplete="off"
                  />
                  <div className="text-danger mt-2">
                    <ErrorMessage name="title" />
                  </div>
                </div>
              </div>

              <div className="row mb-6">
                <label className="col-lg-2 col-form-label required fw-bold fs-6">Body</label>
                <div className="col-lg-10 fv-row">
                  <AutoResizableTextarea name="body" value={announcement.body} />
                  <div className="text-danger mt-2">
                    <ErrorMessage name="body" />
                  </div>
                </div>
              </div>

              <div className="row">
                <FormAction text={"Submit"} isSubmitting={isSubmitting} />
              </div>
            </KTCardBody>
          </Form>
        )}
      </Formik>
    </KTCard>
  );
};
