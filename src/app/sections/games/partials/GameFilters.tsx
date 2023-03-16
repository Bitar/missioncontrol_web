import {useQueryRequest} from '../../../modules/table/QueryRequestProvider'
import React, {FC, useEffect, useState} from 'react'
import {initialQueryState} from '../../../helpers/crud-helper/models'
import {Field, Form, Formik} from 'formik'
import {Col, Collapse, Row} from 'react-bootstrap'
import {defaultGameFilterForm, GameFilterForm} from '../core/GameFilterForm'
import {createFilterQueryParam} from '../../../helpers/requests'
import {genericOnChangeHandler} from '../../../helpers/form'
import FilterFormFooter from '../../../components/form/FilterFormFooter'

const initGameFilterObj = {
  title: '',
}

interface Props {
  showFilter: boolean
  setExportQuery: React.Dispatch<React.SetStateAction<string>>
}

export const GameFilters: FC<Props> = ({showFilter, setExportQuery}) => {
  const {updateState} = useQueryRequest()
  const [gameFilters, setGameFilters] = useState<GameFilterForm>(defaultGameFilterForm)
  const [reset, setReset] = useState<boolean>(false)

  const resetFilter = () => {
    setGameFilters(defaultGameFilterForm)
    setReset(true)
  }

  const handleFilter = () => {
    setExportQuery(createFilterQueryParam(gameFilters))

    updateState({
      filter: reset ? undefined : gameFilters,
      ...initialQueryState,
    })
  }

  useEffect(() => {
    handleFilter()
    setReset(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset])

  const handleOnChange = (e: any) => {
    genericOnChangeHandler(e, gameFilters, setGameFilters)
  }

  return (
    <Collapse in={showFilter}>
      <Row id='#users-list-filter'>
        <Col>
          <div className='card-rounded bg-primary bg-opacity-5 p-10 mb-15'>
            <Formik initialValues={gameFilters} onSubmit={handleFilter} enableReinitialize>
              <Form onChange={handleOnChange} className='form'>
                <Row>
                  <Col lg={4}>
                    <Field
                      type='text'
                      name='title'
                      placeholder='Title'
                      className={'form-control mb-3 mb-lg-0'}
                      autoComplete='off'
                    />
                  </Col>
                </Row>
                {/*TODO: Add Platform Filter*/}
                <FilterFormFooter resetFilter={resetFilter} />
              </Form>
            </Formik>
          </div>
        </Col>
      </Row>
    </Collapse>
  )
}
