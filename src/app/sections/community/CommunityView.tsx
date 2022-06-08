import  { useEffect, useState } from "react"
import {  KTSVG, } from "../../../_metronic/helpers"
import { PageTitle } from "../../../_metronic/layout/core"
import { getCommunityById } from "./core/_requests"
import { Community } from "../../models/community/Community"
import { Link, useNavigate, useParams } from "react-router-dom"


const CommunityView = () => {
    const[community,setCommunity] = useState<Community | undefined>();
    const params = useParams()
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/communities')
    }

    const initialValues = {
        name: community?.name || '',
        logo: community?.logo || '',
        is_featured: community?.is_featured,
        description: community?.description || '',
        address: community?.address,
        contact: community?.contact,
        access: community?.access,
        games: community?.games,
        is_follow: community?.is_follow,

    }

    useEffect(() => {
        getCommunityById(params.id).then(response => {
            setCommunity(response)
            console.log(response)
        })
    }, [params.id]);

    
    return (
        <>
            <PageTitle breadcrumbs={[]}>{'Community Details'}</PageTitle>
            
        <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img src={!community? '' :community.logo} alt='Metronic' />
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                  {!community? '' :community.name}
                  </a>
                  <a href='#'>
                    <KTSVG
                      path='/media/icons/duotune/general/gen026.svg'
                      className='svg-icon-1 svg-icon-primary'
                    />
                  </a>
                  <a
                    href='#'
                    className='btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_upgrade_plan'
                  >
                     Upgrade to Pro
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com006.svg'
                      className='svg-icon-4 me-1'
                    />
                    {!community? 'no contact' :community.contact?.name}
                  </a>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/general/gen018.svg'
                      className='svg-icon-4 me-1'
                    />
                     {!community? '' :community.address?.city}
            
                  </a>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com011.svg'
                      className='svg-icon-4 me-1'
                    />
                    {!community? 'no contact' :community.contact?.email}
                  </a>
                </div>
                
              </div>

              <div className='d-flex my-4'>
                <a href='#' className='btn btn-sm btn-light me-2' id='kt_user_follow_button'>
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr012.svg'
                    className='svg-icon-3 d-none'
                  />

                  <span onClick={() => goBack()} className='indicator-label'>Go Back</span>
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                </a>
                {/* <a
                  href='#'
                  className='btn btn-sm btn-primary me-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_offer_a_deal'
                >
                  Hire Me
                </a> */}
                {/* <div className='me-0'>
                  <button
                    className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='top-end'
                  >
                    <i className='bi bi-three-dots fs-3'></i>
                  </button>
                  <Dropdown1 />
                </div> */}
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                <div className='d-flex text-gray-600 text-hover-primary mb-1'>{!community? 'no contact' :community.description}</div>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      
                    {/* <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr066.svg'
                        className='svg-icon-3 svg-icon-success me-2'
                      />
                      <div className='fs-2 fw-bolder'>4500$</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Earnings</div> */}
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    {/* <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr065.svg'
                        className='svg-icon-3 svg-icon-danger me-2'
                      />
                      <div className='fs-2 fw-bolder'>75</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Projects</div> */}
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    {/* <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr066.svg'
                        className='svg-icon-3 svg-icon-success me-2'
                      />
                      <div className='fs-2 fw-bolder'>60%</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Success Rate</div> */}
                  </div>
                </div>
              </div>

              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  {/* <span className='fw-bold fs-6 text-gray-400'>Profile Compleation</span>
                  <span className='fw-bolder fs-6'>50%</span> */}
                </div>
                {/* <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-success rounded h-5px'
                    role='progressbar'
                    style={{width: '50%'}}
                  ></div>
                </div> */}
              </div>
            </div>
           
          </div>
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
          
               <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  ('active')
                }
                to='/crafted/account/overview'
              >
                Overview
              </Link> 
            </li>
            <li className='nav-item'>
               <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  ('active')
                }
                to='/crafted/account/settings'
              >
                Settings
              </Link> 
            </li>
          </ul>
        </div>
      </div>
    </div>

           
                
                
                


                
            
                                         
        </>
    )
}

export {CommunityView}