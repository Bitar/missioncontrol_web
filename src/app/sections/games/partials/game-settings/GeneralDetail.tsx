import {ErrorMessage, Field, Form, Formik} from 'formik'
import {KTCard, KTCardHeader, KTCardBody} from '../../../../helpers/components'
import {GameFormType} from '../../../../models/game/GameFormType'
import {Dispatch, FC, SetStateAction} from 'react'
import {jsonToFormData, updateData} from '../../../../helpers/form/FormHelper'
import {updateGame} from '../../core/GameRequests'
import {useGame} from '../../core/GameContext'
import {useParams} from 'react-router-dom'
import {gameSchema} from '../../../../models/game/Game'
import {FormAction} from '../../../../helpers/form/FormAction'

type Props = {
  gameForm: GameFormType
  setGameForm: Dispatch<SetStateAction<GameFormType>>
}

const GeneralDetail: FC<Props> = ({gameForm, setGameForm}) => {
  const {setGame} = useGame()
  const params = useParams()

  const handleSubmit = async () => {
    if (gameForm && gameForm.description) {
      let data = jsonToFormData(gameForm)
      data.append('_method', 'PUT')

      await updateGame(params.id, data).then((response) => {
        setGame(response)
      })
    }
  }

  const handleOnChange = (e: any) =>
    updateData({[e.target.name]: e.target.value}, setGameForm, gameForm)

  return (
    <>
      <KTCard border={true}>
        <KTCardHeader text={'General Details'} className='bg-mc-primary' text_color='white' />
        <Formik
          initialValues={gameForm}
          onSubmit={handleSubmit}
          validationSchema={gameSchema}
          enableReinitialize>
          {({isSubmitting}) => (
            <Form onChange={handleOnChange} className='form' autoComplete='off'>
              <KTCardBody className='py-4'>
                <div className='d-flex flex-column pt-5'>
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>Title</label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        type='text'
                        name='title'
                        placeholder='Title'
                        className='form-control mb-3 mb-lg-0'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='title' />
                      </div>
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label fw-bold fs-6'>Description</label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        as='textarea'
                        name='description'
                        placeholder='Game Description'
                        className='form-control mb-3 mb-lg-0'
                        rows={8}
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='description' />
                      </div>
                    </div>
                  </div>
                </div>
              </KTCardBody>
              <FormAction text={'Update Game'} isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
      </KTCard>
    </>
  )
}

export {GeneralDetail}
