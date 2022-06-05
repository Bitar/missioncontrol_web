import React, {useEffect, useState} from 'react'
import useDebounce from './hooks/useDebounce';
import * as Yup from 'yup'
import {useNavigate} from 'react-router-dom';
import {Formik} from "formik";
import {KTCard, KTCardBody} from '../../../_metronic/helpers';
import {Igdb} from '../../models/game/Igdb';
import {getIgdb} from './core/_requests';
import {createGame} from './core/_requests';
import {PageTitle} from '../../../_metronic/layout/core';
import Swal from 'sweetalert2';
// import ReactPaginate from 'react-paginate';

const createGameSearchSchema = Yup.object().shape({
    query: Yup.string()
})


const GameCreate = () => {
    //const isLoading = useQueryResponseLoading()
    const [games, setGame] = useState<Igdb[] | undefined>([])
    const [isSending, setIsSending] = useState(false)
    const [search, setSearch] = useState<string | ''>('')
    //const [loading,setLoading] = useState(false)
    const [currentPage,setCurrentPage] = useState(0)
    const debouncedSearch = useDebounce(search, 150)


    useEffect(() => {
        getIgdb(debouncedSearch).then(response => {
            setGame(response.data)
        })
    }, [debouncedSearch])



    const sendRequest = (igdb_id: any) => {
        if (isSending) return
        setIsSending(true)
        createGame(igdb_id)
        setIsSending(false)
        Swal.fire({
            icon: 'success',
            title: 'Game Added',
            showConfirmButton: false,
            timer: 1500
          })
        postLink()
    }

    const navigate = useNavigate();

    const cancel = () => {
        navigate('/games')
    }

    const postLink = () => {
      navigate('/games')
  }
  interface NoteCardProps {
    
    selectedPage: any
    selected :any
  
}

  const PER_PAGE = 10;

  const handlePageClick = ({selected : selectedPage }: NoteCardProps) => {
      console.log("selectedPage",selectedPage);
      setCurrentPage(selectedPage)
  }

  const offset = currentPage * PER_PAGE

  const currentPageData = !games? '' : games.slice(offset,offset + PER_PAGE).map
  ((game) => (<div className="col-md-6 col-lg-4 col-xl-3" key={game.id}> 
     <div className=' text-center fs-9 fw-bold text-gray-400 mt-auto'>{game.name}                                  
    <img onClick={() => sendRequest(game.id)} className=" w-100 h-300px rounded" src={game.cover}/>
     </div>
     </div>
 ))
 console.log(currentPageData)

 const pageCount = games? Math.ceil(games.length / PER_PAGE):0;
  

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
                initialValues={{createGameSearchSchema}}
                onSubmit={(values, {setSubmitting}) => {
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
                        </div>
                    </div>
                </div>
                    
                    <KTCardBody className='py-8'>
                    <KTCard>
                    <div className="row g-6 g-xl-9 mb-6 mb-xl-9">
                        {currentPageData}
                        {/* <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        //renderOnZeroPageCount={null}
                    /> */}

                        </div>
                    </KTCard>
                    </KTCardBody>
        </KTCardBody>
        )}
        </Formik>
        </KTCard>                                           
        </>
    );
};

export {GameCreate}