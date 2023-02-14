import {useQueryRequest} from '../../../modules/table/QueryRequestProvider'
import React, {useState} from 'react'
import {initialQueryState} from '../../../helpers/crud-helper/models'
import {updateData} from '../../../helpers/form/FormHelper'
import {Field, Form, Formik} from 'formik'
import {Button} from 'react-bootstrap'

const initGameFilterObj = {
  title: '',
}

type GameFilterObj = {
  title: string
}

export const GameFilters = () => {
  const {updateState} = useQueryRequest()
  const [gameFilters, setGameFilters] = useState<GameFilterObj>(initGameFilterObj)

  const filterData = () => {
    updateState({
      filter: gameFilters,
      ...initialQueryState,
    })
  }

  const handleOnChange = (e: any) => {
    if (e.target.name) {
      updateData({[e.target.name]: e.target.value}, setGameFilters, gameFilters)
    }
  }

  return (
    <div className='bg-primary bg-opacity-5 p-10 mb-15 card-rounded'>
      <Formik initialValues={gameFilters} onSubmit={filterData} enableReinitialize>
        <Form onChange={handleOnChange} className='form'>
          <div className='row'>
            <div className='col-lg-4 mb-5'>
              <Field
                type='text'
                name='title'
                placeholder='Title'
                className={'form-control mb-3 mb-lg-0'}
                autoComplete='off'
              />
            </div>
          </div>
          <Button variant='primary' type='submit'>
            Filter
          </Button>
        </Form>
      </Formik>
    </div>
  )
}
