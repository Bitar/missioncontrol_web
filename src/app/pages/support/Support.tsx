import React from "react";

import { KTSVG } from "../../../_metronic/helpers";
import { PageTitle } from "../../../_metronic/layout/core";
import { Card4 } from "../../../_metronic/partials/content/cards/Card4";
import { Card7 } from "../../../_metronic/partials/content/cards/Card7";



const Support = () => {

    return (
        <>
        <PageTitle breadcrumbs={[]}>{'Support'}</PageTitle>
        <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
        <div className='col-12 col-sm-12 col-xl'>
          <Card4
            icon='/media/support/rocket-icon.svg'
            title='Knowledge Base'
            description='Explore articles and guides created just for our admins in our Private Knowledge Base to master the Mission Control Platform.'
            link='https://knowledgebase.missioncontrol.gg/'
          />
        </div>
        <div className='col-12 col-sm-12 col-xl'>
          <Card4
            icon='/media/support/astroicon1.svg'
            title='Admin Forum'
            description='Join the Mission Control discord to have access to admin-only channels where you can meet other admins, share ideas, and learn more about esports.'
            link="https://discord.com/invite/2Fbtq5U"
          />
        </div>
        <div className='col-12 col-sm-12 col-xl'>
          <Card4
            icon='/media/support/rocket-icon.svg'
            title='Learn More'
            description='Discover blogs, webinars, and guides on our public page that will help you build and launch your programs to new heights.'
            link="https://www.missioncontrol.gg/learn"
          />
        </div>
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
              <h1>Town Hall w/ CEO Austin Smith</h1>
              <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
              We want to ensure you have a chance to hear from and ask questions related to the platform, upcoming product focuses, and anything else directly with Mission Control's CEO, Austin Smith!
              </p> 
              <div className="mt-2">
                <a href="https://us06web.zoom.us/j/86411098294#success" target="_blank">
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
                <a href="mailto:support@missioncontrol.gg" target="_blank">
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