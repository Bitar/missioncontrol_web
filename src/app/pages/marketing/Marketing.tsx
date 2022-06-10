import { useEffect } from "react";
import Swal from "sweetalert2";
import { KTSVG } from "../../../_metronic/helpers";
import { PageTitle } from "../../../_metronic/layout/core";
import { marketingData } from "./data/MarketingData";

const Marketing = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

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
                        Share the link below to invite players directly to your community! If players do not have the Mission Control app, this link will first prompt them to download the app and then invite them to join your community. If players do have the app, this link will bring them straight your community on Mission Control. If players click access the link via desktop, they will be asked for a mobile number to receive the direct link invite.
                        </p>
                        <button
                            type="submit"
                            className='mt-2 btn btn-primary'
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
                        Mission Control has prepared multiple graphic design templates of various sizes to use for flyers, powerpoint slides, social media images and more. Each template can be customized with your own logo, name, program details, etc., and comes in various file types for easy edit access in Adobe Illustrator, PowerPoint, Canva and more.
                        </p>
                    </div>
                    {/* end::Description */}

                </div>
            </div>
            <div className='d-flex flex-wrap flex-stack mb-6'>
                {/* <h3 className='fw-bolder my-2'>
                    My Documents
                </h3> */}
            </div>
            <div className='row g-10'>
                {marketingData.map((market , index) =>(
                    <div className='col-md-4' key={index} >
                        <a href={market.link} target="_blank"  rel="noreferrer" className="d-block opacity-75-hover hoverable">
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
