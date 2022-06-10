import React, { useEffect } from "react";
import { KTSVG, toAbsoluteUrl } from "../../../_metronic/helpers";
import { PageTitle } from "../../../_metronic/layout/core";
import { Card7 } from "../../../_metronic/partials/content/cards/Card7";
import { support } from "./data/SupportData";


const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
    return (
        <>
        <PageTitle breadcrumbs={[]}>{'Support'}</PageTitle>
        <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
        {support.map((supportData , index) =>(
           <div className='col-12 col-sm-12 col-xl' key={index}>
          <div className='card h-100'>
          <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
            <a href={supportData.link} className='text-gray-800 text-hover-primary d-flex flex-column' rel="noreferrer" target="_blank">
              <div className='symbol symbol-75px mb-6'>
                <img src={toAbsoluteUrl(supportData.icon)} alt='' />
              </div>
              <div className='fs-5 fw-bolder mb-2'>{supportData.title}</div>
            </a>
            <div className='fs-7 fw-bold text-gray-400 h-100'>{supportData.description}</div>
          </div>
        </div>
        </div>
          ))}
    </div>

        <div className='d-flex flex-wrap flex-stack mb-6'>
          <h3 className='fw-bolder my-2'>
          Support Events
          </h3>
          </div>
          <div className='card mb-10'>
            <div className='card-body d-flex align-items-center py-8 '>
              {/* begin::Icon */}
              <div className='d-flex h-80px w-80px flex-shrink-0 flex-center position-relative'>
                 <KTSVG
                  path='/media/icons/duotune/abstract/abs051.svg'
                  className='svg-icon-primary position-absolute opacity-15'
                  svgClassName='h-80px w-80px'
                />
                <KTSVG
                  path='/media/icons/duotune/general/gen002.svg'
                  className='svg-icon-3x svg-icon-primary position-absolute'
                /> 
              </div>
              {/* end::Icon */}
              {/* begin::Description */}
              <div className='ms-6'>
              <h1>Town Hall with CEO Austin Smith</h1>
              <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
              Join us every quarter to hear from and ask questions of Mission Control CEO Austin Smith on the state of the platform, upcoming product focuses, and more!
              </p> 
              <div className="mt-2">
                <a href="https://us06web.zoom.us/j/86411098294#success" target="_blank" rel="noreferrer">
             <button type="submit"
              className='btn btn-primary'>Register
              </button>
              </a>
            </div>
              </div>
              {/* end::Description */}
            </div>
            </div>
            <div className='d-flex flex-wrap flex-stack mb-6'>
          <h3 className='fw-bolder my-2'>
          Contact Support
          </h3>
          </div>
            
         
          <div className='card mb-10'>
            <div className='card-body d-flex align-items-center py-8 '>
              {/* begin::Icon */}
              <div className='d-flex h-80px w-80px flex-shrink-0 flex-center position-relative'>
                 <KTSVG
                  path='/media/icons/duotune/abstract/abs051.svg'
                  className='svg-icon-primary position-absolute opacity-15'
                  svgClassName='h-80px w-80px'
                />
                <KTSVG
                  path='/media/icons/duotune/communication/com011.svg'
                  className='svg-icon-3x svg-icon-primary position-absolute'
                /> 
              </div>
              {/* end::Icon */}
              {/* begin::Description */}
              <div className='ms-6'>

              <h1>Email Admin Support</h1>
              {/* <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
              support@missioncontrol.gg
              </p>  */}
              <div className="mt-2">
                <a href="mailto:support@missioncontrol.gg" target="_blank" rel="noreferrer">
              <button type="submit"
                className='btn btn-primary'
                >Email</button></a>
            </div>
              </div>
              {/* end::Description */}
            </div>
          </div>
          

          <div className='d-flex flex-wrap flex-stack mb-6'>
          <h3 className='fw-bolder my-2'>
            Quick Links
          </h3>
          </div>

      <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
        <div className='col-12 col-sm-12 col-xl'>
          <Card7 icon='/media/support/OrgAnnouncement.png'
          link='/#' 
          title='Org Announcements'  />
        </div>
        <div className='col-12 col-sm-12 col-xl'>
          <Card7 icon='/media/support/CreateLeague.png'      
          link='/#' 
          title='Create League' 
          />
        </div>
        <div className='col-12 col-sm-12 col-xl'>
          <Card7
            icon='/media/support/AdminIcon.png'
            link='/#'
            title='Admin Preferences'
           
          />
          
        </div>
        <div className='col-12 col-sm-12 col-xl'>
          <Card7 icon='/media/support/AccountBilling.png' 
          link='/#'
          title='Account and Billing' 
         />
        </div>
      </div>
    </>
    )
}

export{Support}