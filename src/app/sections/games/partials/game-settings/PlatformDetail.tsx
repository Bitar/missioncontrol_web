import {useGame} from '../../core/GameContext'
import React, {useEffect, useRef, useState} from 'react'
import {Platform} from '../../../../models/game/Platform'
import {getPlatforms} from '../../../misc/core/_requests'
import {jsonToFormData, updateData} from '../../../../helpers/form/FormHelper'
import {PlatformDetailTable} from './platform/PlatformDetailTable'
import {ErrorMessage, Form, Formik} from 'formik'
import {FormErrorAlert} from '../../../../modules/errors/partials/FormErrorAlert'
import {FormAction} from '../../../../helpers/form/FormAction'
import {KTCard, KTCardHeader, KTCardBody} from '../../../../helpers/components'
import * as Yup from 'yup'
import Select from 'react-select'
import {addGamePlatform} from '../../core/GamePlatformRequests'
import toast from 'react-hot-toast'

export const platformSchema = Yup.object().shape({
  platform_id: Yup.string().required('Platform is required'),
})

type PlatformForm = {
  platform_id: string
}

export const PlatformDetail = () => {
  const {game, updateGame} = useGame()

  const platformSelectRef = useRef<any>()
  const [platforms, setPlatforms] = useState<Platform[]>()
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined)
  const [platformForm, setPlatformForm] = useState<PlatformForm>({
    platform_id: '',
  })

  useEffect(() => {
    getPlatforms().then((response) => {
      let responsePlatforms = response.data

      responsePlatforms = responsePlatforms?.filter(
        (platform) => !game?.platforms.some((elem) => elem.id === platform.id)
      )

      setPlatforms(responsePlatforms)
    })
  }, [game?.platforms])

  const handleOnChange = (e: any) => {
    let targetName = e.target.name
    let targetValue = e.target.value

    updateData({[targetName]: targetValue}, setPlatformForm, platformForm)
  }

  const handleSubmit = async () => {
    let data = jsonToFormData(platformForm)

    await addGamePlatform(game?.id, data)
      .then(() => {
        updateGame()
        let updatePlatforms = platforms?.filter(
          (platform) => platformForm?.platform_id.toString() !== platform.id?.toString()
        )
        setPlatforms(updatePlatforms)

        platformSelectRef.current.clearValue()

        toast.success('Platform added Successfully!')

        setPlatformForm({
          platform_id: '',
        })
        setAlertMessage('')
        setHasErrors(false)
      })
      .catch(function (e) {
        if (e.response) {
          let status = e.response.status

          if (status === 422) {
            setAlertMessage('Please make sure you fill all the fields.')
          } else if (status === 400) {
            setAlertMessage(e.response.data.errors)
          } else {
            setAlertMessage(e.response.data.message)
          }

          setHasErrors(true)
        }
      })
  }

  return (
    <>
      <PlatformDetailTable />
      <KTCard border={true}>
        <KTCardHeader text={'Add Platforms'} bg='mc-primary' text_color='white' />

        <Formik
          validationSchema={platformSchema}
          initialValues={platformForm}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({isSubmitting}) => (
            <Form onChange={handleOnChange} className='form' autoComplete='off'>
              <KTCardBody className='py-4'>
                <FormErrorAlert hasErrors={hasErrors} message={alertMessage} />
                <div className='d-flex flex-column pt-5'>
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      Platform
                    </label>
                    <div className='col-lg-8 fv-row'>
                      <Select
                        ref={platformSelectRef}
                        name='platform_id'
                        placeholder={'Choose a platform'}
                        menuPlacement={'top'}
                        options={platforms?.filter(
                          (platform) => !game?.platforms.includes(platform)
                        )}
                        getOptionLabel={(platform) => platform?.name}
                        getOptionValue={(platform) => platform?.id?.toString() || ''}
                        onChange={(e) => {
                          updateData(
                            {
                              platform_id: e?.id,
                            },
                            setPlatformForm,
                            platformForm
                          )
                        }}
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='platform_id' />
                      </div>
                    </div>
                  </div>
                </div>
              </KTCardBody>
              <FormAction text={'Add Platform'} isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
      </KTCard>
    </>
  )
}
