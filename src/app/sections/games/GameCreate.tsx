import React, {useEffect, useState} from 'react'
import useDebounce from './hooks/useDebounce';
import * as Yup from 'yup'
import {useNavigate} from 'react-router-dom';
import {Formik} from "formik";
import {KTCard, KTCardBody, toAbsoluteUrl} from '../../../_metronic/helpers';
import {Igdb} from '../../models/game/Igdb';
import {getIgdb} from './core/_requests';
import {createGame} from './core/_requests';
import {PageTitle} from '../../../_metronic/layout/core';
import Swal from 'sweetalert2';
import Pagination from '../../components/pagination/Pagination';

const createGameSearchSchema = Yup.object().shape({
    query: Yup.string()
})


const GameCreate = () => {
    const [games, setGames] = useState<Igdb[] | undefined>([])
    const [isSending, setIsSending] = useState(false)
    const [search, setSearch] = useState<string | ''>('') 
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const debouncedSearch = useDebounce(search, 150)

    
    
    const handlePrevPage = (prevPage: number) => {
        setPage((prevPage) => prevPage - 1);
        console.log(prevPage , prevPage-1)
        // window.scrollTo(0,0)
        
      };    
      const handleNextPage = (nextPage: number) => {
        setPage((nextPage) => nextPage + 1);
        console.log(nextPage , nextPage + 1)
        // window.scrollTo(0,0)
      };
    
    useEffect(() => {
        getIgdb(debouncedSearch,page).then(response => {
            setGames(response.data)
            setTotalPages(totalPages)
            
        })
    }, [page,debouncedSearch,totalPages])
    
    const sendRequest = (igdb_id: any) => {
        if (isSending) return
        Swal.fire({
            title: 'Are you sure you want to add this Game?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#009ef7',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Add it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Added!',
                'Your game has been added.',
                'success', 
              )
            setIsSending(true)
            createGame(igdb_id)
            setIsSending(false)
            postLink()
            }
          })
        
    }
    const navigate = useNavigate();

    const cancel = () => {
        navigate('/games')
    }

    const postLink = () => {
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
<<<<<<< HEAD
                        <KTCard>
                        <div className="row g-6 g-xl-9 mb-6 mb-xl-9">
                        {!games? '' : games.map((game) => (
                            <div className="col-md-6 col-lg-4 col-xl-3" key={game.id}> 
                            {!game.cover ? <img  className=" w-100 h-300px rounded border border-2" src={toAbsoluteUrl('/media/svg/avatars/AstroLearn.svg')} /> :<img
                                onClick={() => sendRequest(game.id)}
                                className=" w-100 h-300px rounded border border-2"
                                src={game.cover}
                            />}
                            <div className=' text-center fs-2 fw-bold text-black mt-auto'>{game.name}                                   </div>
                        </div>                             
                    ))} 
                    <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    setPage={setPage} 
                />
                </div>
                </KTCard>
                </KTCardBody>  
            </KTCardBody>
                    )}
                </Formik>
                </KTCard>                       
=======
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
>>>>>>> signin-tab
        </>
    );
};

export {GameCreate}