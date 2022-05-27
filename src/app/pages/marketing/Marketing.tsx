import Swal from "sweetalert2";
import { KTSVG } from "../../../_metronic/helpers";
import { PageTitle } from "../../../_metronic/layout/core";
import marketing from "./data/MarketingData";

const Marketing = () => {

  const copy = async (text:string) => {
    await navigator.clipboard.writeText(text);
    Swal.fire('Copied , now invite players directly to your community!')
  }
    return (
        <>
        <PageTitle breadcrumbs={[]}>{'Marketing'}</PageTitle>
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
                  path='/media/icons/duotune/communication/com013.svg'
                  className='svg-icon-3x svg-icon-primary position-absolute'
                /> 
              </div>
              {/* end::Icon */}
    
              {/* begin::Description */}
              <div className='ms-6 '>
                  <h1>Community Invite Link</h1>
                <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
                Share the link below to invite players directly to your community! If they do not have the Mission Control app, it will have them download the app then immediately join your community. If they do have the app, it will bring them straight to your community. If accessed via desktop, it will ask for a mobile number to direct the app download to. 
                </p>
                <button
                type="submit"
                className='btn btn-primary'
                    onClick={() => copy("https://missioncontrol.test-app.link/?organization=46efece0-e7dc-4506-b343-44b0cc0dcbd0&action=view")}>
                    Invite Link
                  </button>
              </div>
              {/* end::Description */}
            </div>
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
                  path='/media/icons/duotune/files/fil012.svg'
                  className='svg-icon-3x svg-icon-primary position-absolute'
                /> 
              </div>
              {/* end::Icon */}
    
              {/* begin::Description */}
              <div className='ms-6'>
                  <h1>Graphic Templates</h1>
                <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
                Mission Control has prepared multiple templates of graphic design themes that can be used across various marketing mediums. Each theme includes multiple file sizes and design templates that can work as flyers, powerpoint slides, social media images, and more. Each template leaves room for organizations to customize the artwork by adding their own logo, name, programs, and more. To make it accessible for all types of designers, most themes include the base files in versions of Adobe Illustrator, Powerpoint, and editable PDFs for use on Canva or other programs.
                </p>
              </div>
              {/* end::Description */}

            </div>
          </div>
          <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>
          My Documents
        </h3>
      </div>
          <div className='row g-10'>
          {marketing.map((market , index) =>( 
            <div className='col-md-4' key={index} >  
          <a  href={market.link} target="_blank">
            
            <img
             className ='rounded w-100 h-auto' 
             src={market.avatar} alt='' 
             />		
            
          </a>
        </div>
       ))}
       </div>
   
    </>
    )
}

export{Marketing}

