import React, {Dispatch, FC, SetStateAction, useState} from 'react'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import TextField from '@mui/material/TextField'
import {Activity} from '../models/Activity'
import dayjs from 'dayjs'
import {Announcement, initialAnnouncement} from '../../../models/announcement/Announcements'
import {useParams} from 'react-router-dom'
import {createActivityAnnouncement} from '../core/ActivityRequests'
import {Form, Formik} from 'formik'
import {jsonToFormData, updateData} from '../../../helpers/form/FormHelper'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity | undefined>>
}
const ActivityAnnouncement: FC<Props> = ({activity, setActivity}) => {
  const params = useParams()
  const [announcement, setAnnouncement] = useState<Announcement>(initialAnnouncement())

  const handleSubmit = async () => {
    let data = jsonToFormData(announcement)
    await createActivityAnnouncement(params.id, data).then((response) => {
      setAnnouncement(initialAnnouncement())

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
    <>
      <KTCard className=''>
        <div
          className='card-header collapsible cursor-pointer rotate border-0 bg-primary'
          id='activity_announcement_card_header'
          data-bs-toggle='collapse'
          data-bs-target='#activity_announcement_card_collapsible'
        >
          <h3 className='card-title'>
            <span className='card-label fw-bold fs-3 mb-1 text-white'>Announcements</span>
          </h3>
          <div className='card-toolbar rotate-180'>
            <span className='svg-icon svg-icon-1'>
              <i className='fa fa-arrow-down fs-3 text-mc-secondary'></i>
            </span>
          </div>
        </div>
        <div id='activity_announcement_card_collapsible' className='collapse show'>
          <KTCardBody className='pt-0' id='activity_announcement_card_body'>
            {activity?.announcements && activity?.announcements?.length > 0 && (
              <>
                <div className='row'>
                  <div className='col-12'>
                    <div
                      className='mb-7 scroll-y pt-5'
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

                <div className='separator separator-dashed mt-6'></div>
              </>
            )}

            <Formik
              initialValues={initialAnnouncement()}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({isSubmitting, isValid, touched, errors}) => (
                <Form onChange={handleOnChange} className='form mt-6'>
                  <div className='row'>
                    <div className='col-12 mb-6'>
                      <TextField
                        id='title'
                        size='small'
                        name='title'
                        label='Title'
                        className='w-100'
                        variant='standard'
                        value={announcement?.title}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                      />
                    </div>
                    <div className='col-12 mb-6'>
                      <TextField
                        multiline
                        id='body'
                        size='small'
                        name='body'
                        label='Body'
                        className='w-100'
                        variant='standard'
                        value={announcement?.body}
                        error={touched.body && Boolean(errors.body)}
                        helperText={touched.body && errors.body}
                      />
                    </div>
                    <div className='d-flex justify-content-end py-6'>
                      <button
                        type='submit'
                        className='btn btn-mc-secondary btn-active-mc-secondary btn-sm'
                        data-kt-users-modal-action='submit'
                        disabled={isSubmitting || !isValid || !touched}
                      >
                        <span className='indicator-label'>Send</span>
                        {isSubmitting && (
                          <span className='indicator-progress'>
                            Please wait...
                            <span className='spinner-border spinner-border-sm align-middle ms-2' />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </KTCardBody>
        </div>
      </KTCard>
    </>
  )
}

export { ActivityAnnouncement };
