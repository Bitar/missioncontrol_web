import React, {FC, useState} from 'react'
import {KTCard, KTCardBody, KTCardHeader} from '../../../helpers/components'
import dayjs from 'dayjs'
import {
  Announcement,
  announcementSchema,
  initialAnnouncement,
} from '../../../models/announcement/Announcements'
import {useParams} from 'react-router-dom'
import {createActivityAnnouncement} from '../core/requests/ActivityRequests'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {jsonToFormData, updateData} from '../../../helpers/form/FormHelper'
import {useActivity} from '../core/contexts/ActivityContext'
import toast from 'react-hot-toast'
import {FormAction} from '../../../helpers/form/FormAction'
import AutoResizableTextarea from '../../../components/form/AutoResizableTextarea'

const ActivityAnnouncement: FC = () => {
  const {activity, setActivity} = useActivity()
  const params = useParams()
  const [announcement, setAnnouncement] = useState<Announcement>(initialAnnouncement())

  const handleSubmit = async () => {
    let data = jsonToFormData(announcement)
    await createActivityAnnouncement(params.id, data).then((response) => {
      setAnnouncement(initialAnnouncement())
      toast.success('Announcement Sent')

      if (response && activity?.announcements) {
        updateData(
          {
            announcements: [response, ...activity?.announcements],
          },
          setActivity,
          activity
        )
      }
    })
  }

  const handleOnChange = (e: any) => {
    updateData(
      {
        [e.target.name]: e.target.value,
      },
      setAnnouncement,
      announcement
    )
  }

  return (
    <KTCard>
      <KTCardHeader
        text={'Announcements'}
        bg='primary'
        text_color={'white'}
        collapse={true}
        target_id='activity_announcement_card_collapsible'
      />

      <div id='activity_announcement_card_collapsible' className='collapse show'>
        <KTCardBody className='pt-0' id='activity_announcement_card_body'>
          {activity?.announcements && activity?.announcements?.length > 0 && (
            <>
              <div className='row'>
                <div className='col-12'>
                  <div
                    className='scroll-y pt-5'
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: false, lg: true}'
                    data-kt-scroll-max-height='300px'
                    data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #activity_announcement_card_header'
                    data-kt-scroll-wrappers='#kt_content, #activity_announcement_card_body'
                    data-kt-scroll-offset='0px'
                  >
                    {activity?.announcements?.map((announcement) => (
                      <div key={announcement?.id} className='d-flex mb-5'>
                        <div className='d-flex flex-column flex-row-fluid'>
                          <div className='d-flex align-items-center flex-wrap mb-1'>
                            <span className='text-gray-800 fw-bold me-2'>
                              {announcement?.title}
                            </span>

                            {announcement?.created_at && (
                              <span className='text-gray-400 fw-semibold fs-7'>
                                {dayjs(new Date(announcement?.created_at * 1000)).format('LL')}
                              </span>
                            )}
                          </div>
                          <span className='text-gray-800 fs-7 fw-normal pt-1'>
                            {announcement?.body}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className='separator separator-dashed mt-5 mb-10'></div>
            </>
          )}

          <Formik
            initialValues={announcement}
            onSubmit={handleSubmit}
            validationSchema={announcementSchema}
            enableReinitialize
          >
            {({isSubmitting, isValid, touched, errors}) => (
              <Form onChange={handleOnChange} className='form mt-6'>
                <div className='row mb-6'>
                  <label className='col-lg-2 col-form-label required fw-bold fs-6'>Title</label>
                  <div className='col-lg-10 fv-row'>
                    <Field
                      type='text'
                      name='title'
                      placeholder='Title'
                      className='form-control mb-3 mb-lg-0'
                      autoComplete='off'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='title' />
                    </div>
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-2 col-form-label required fw-bold fs-6'>Body</label>
                  <div className='col-lg-10 fv-row'>
                    <AutoResizableTextarea name='body' value={announcement.body} />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='body' />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <FormAction text={'Submit'} isSubmitting={isSubmitting} />
                </div>
              </Form>
            )}
          </Formik>
        </KTCardBody>
      </div>
    </KTCard>
  )
}

export {ActivityAnnouncement}
