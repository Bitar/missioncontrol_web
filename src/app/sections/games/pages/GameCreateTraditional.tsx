import {communitySchema} from '../../../models/community/Community'
import React, {useState} from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import AutoResizableTextarea from '../../../components/form/AutoResizableTextarea'
import {jsonToFormData, updateData} from '../../../helpers/form/FormHelper'
import gameCreateIgdb from './GameCreateIgdb'
import {ImageCrop} from '../../community/components/ImageCrop'
import {FormAction} from '../../../helpers/form/FormAction'
import {createGame, createGameIgdb} from '../core/GameRequests'
import {useNavigate} from 'react-router-dom'
import {SwitchInput} from '../../../components/SwitchInput/SwitchInput'

export interface GameFormFields {
  title: string
  description: string
  image: string
  is_virtual?: boolean
}

const GameFormFieldsDefaults = {
  title: '',
  description: '',
  image: '',
  is_virtual: false,
}

const GameCreateTraditional = () => {
  const [gameForm, setGameForm] = useState<GameFormFields>(GameFormFieldsDefaults)
  const navigate = useNavigate()
  const handleSubmit = () => {
    let data = jsonToFormData(gameForm)

    createGame(data).then((response) => navigate('/games/' + response?.id))
    // createGame(data).then((response) => {})
  }

  const handleOnChange = (e: any) => {
    let targetName = e.target.name
    let targetValue = e.target.value

    if (targetName && targetName !== 'is_virtual') {
      updateData({[targetName]: targetValue}, setGameForm, gameForm)
    }
  }

  return (
    <>
      <Formik
        // validationSchema={communitySchema}
        initialValues={gameForm}
        onSubmit={handleSubmit}
        enableReinitialize>
        <Form onChange={handleOnChange} className='form' autoComplete='off'>
          <div className='py-4'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Name</label>
              <div className='col-lg-8 fv-row'>
                <Field
                  type='text'
                  name='title'
                  placeholder='Game Title'
                  className='form-control mb-3 mb-lg-0'
                  autoComplete='off'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='title' />
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Description</label>
              <div className='col-lg-8 fv-row'>
                <AutoResizableTextarea name='description' value={gameForm.description} />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='description' />
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Image</label>
              <div className='col-lg-3 col-md-4'>
                <ImageCrop
                  aspectRatioClass={'ratio ratio-528x704'}
                  model={gameForm}
                  setModel={setGameForm}
                  ratio={0.75}
                  name='image'
                  defaultImage={gameForm?.image}
                />
                {/*528x704*/}

                <div className='text-muted fw-semibold'>Recommended Image Size: 528 x 704</div>
                <div className='text-danger mt-2'>
                  <ErrorMessage name='logo' />
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Is Virtual</label>
              <div className='col-lg-8 fv-row'>
                <SwitchInput
                  id={'game_is_virtual'}
                  name='is_virtual'
                  isOn={gameForm.is_virtual}
                  handleToggle={(e: any) => {
                    const {checked} = e.target

                    updateData(
                      {
                        is_virtual: checked,
                      },
                      setGameForm,
                      gameForm
                    )
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='is_virtual' />
                </div>
              </div>
            </div>

            <FormAction text={'Create Game'} />
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default GameCreateTraditional
