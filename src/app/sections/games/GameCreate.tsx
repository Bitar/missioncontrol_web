import React, { useEffect, useState} from 'react'
import useDebounce from './hooks/useDebounce';
import * as Yup from 'yup'
//import { isNotEmpty, KTCard,KTCardBody } from '../../../_metronic/helpers';
import {useNavigate} from 'react-router-dom';
import { Formik } from "formik";
import {  KTCard, KTCardBody } from '../../../_metronic/helpers';
import { TableListLoading } from '../../modules/table/TableListLoading';
import { useQueryResponseLoading } from '../../modules/table/QueryResponseProvider';
import { Igdb } from '../../models/game/Igdb';
import { getIgdb } from './core/_requests';
import { createGame } from './core/_requests';
import { PageTitle } from '../../../_metronic/layout/core';

//Validate Schema verify 
const createGameSearchSchema = Yup.object().shape({
    query: Yup.string()
})


const GameCreate = () => {
  const isLoading = useQueryResponseLoading()
    //when search parameter changes we want to search api and we use useEffect
    const [data,setData] = useState<Igdb[] | undefined>([])
    const [isSending, setIsSending] = useState(false)
    const [search, setSearch] = useState<string |null>(null)
    // const [loading,setLoading] = useState(false)
    const debouncedSearch = useDebounce(search, 150) 
    
    useEffect(() => {
      //call api
      //filter[name]        //when function returns
      getIgdb(debouncedSearch).then(response => { 
        setData(response.data)
        console.log(response.data)
        
      })
      }, [debouncedSearch]) 

      
      function sendRequest (igdb_id:any) {
        if(isSending)return
        setIsSending(true)
        createGame(igdb_id)
        console.log(createGame)
        setIsSending(false)
      }
      
    const navigate = useNavigate();
   
    const cancel = () => {
        navigate('/games')
    }
    
    
  

    return (
      <>
      <PageTitle breadcrumbs={[]}>{'Add Game'}</PageTitle>
      <KTCard>
          <div className="card-header">
                    <div className="card-title">
                        <span className="card-icon">
                            <i className="las la-plus fs-2"/>
                        </span>
                        <h3 className="card-label">
                            Add Game
                        </h3>
                    </div>
                </div>
        <Formik
          initialValues={{ createGameSearchSchema }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
        {(formikProps) => (
          <KTCardBody className='py-4'>
            <div className="form-group has-feedback has-clear">
            <div
              className='d-flex flex-column scroll-y me-n7 pe-7 pt-5'
              id='kt_modal_add_user_scroll'
              data-kt-scroll='true'
              data-kt-scroll-activate='{default: false, lg: true}'
              data-kt-scroll-max-height='auto'
              data-kt-scroll-dependencies='#kt_modal_add_user_header'
              data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
              data-kt-scroll-offset='300px'
              >
                {/* begin::Input group */}
                <div className='fv-row mb-7'>
                  {/* begin::Label */}
                <label className='required fw-bold fs-6 mb-2'>Search</label>
                  {/* end::Label */}
              <input
                className='form-control form-control-solid mb-3 mb-lg-0'
                name="query"
                placeholder="Search . . . . ."
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>
            <div className="py-5">
                <button
                 type='reset'
                 onClick={() => cancel()}
                 className='btn btn-light me-3'
                 disabled={!formikProps.values.createGameSearchSchema}
                >
                Cancel
                </button>

                 <div className='container py-5'>
                  <div className='row'>
                  {!data ?<div>Search Again</div> : data.map((d) => { 
                  return <div className='col-md-6 col-xxl-4' key={d.id}>
                    <div className='mb-6'>
                    <button className='symbol symbol-100px symbol-lg-200px symbol-fixed position-relative'>
                    <img 
                        onClick={() => sendRequest(d.id)}
                        className= 'w-100 h-100' 
                        src={d.cover}
                        />
                         </button>
                        </div>
                        </div>
                })} 
                </div>
                </div>
                </div>
             </div>
             </div>
             
          </KTCardBody>
          )}
        </Formik>
        {isLoading && <TableListLoading/>}
        </KTCard>
        </>
    );
};

export {GameCreate}