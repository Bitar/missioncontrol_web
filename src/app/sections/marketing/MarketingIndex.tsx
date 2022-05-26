import React from "react";
import {KTSVG} from "../../../_metronic/helpers";
import {PageTitle} from "../../../_metronic/layout/core";
import {Card3} from "../../../_metronic/partials/content/cards/Card3";
import {ClipboardCopy} from "../../components/functionality/Clipboard";


const MarketingIndex = () => {

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
                            path='/media/icons/duotune/coding/cod009.svg'
                            className='svg-icon-3x svg-icon-primary position-absolute'
                        />
                    </div>
                    {/* end::Icon */}

                    {/* begin::Description */}
                    <div className='ms-6'>
                        <h1>Community Invite Link</h1>
                        <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
                            Share the link below to invite players directly to your community! If they do not have the Mission Control app, it will have them download the app then immediately join
                            your community. If they do have the app, it will bring them straight to your community. If accessed via desktop, it will ask for a mobile number to direct the app download
                            to.
                        </p>

                        <ClipboardCopy copyText="https://missioncontrol.test-app.link/?organization=46efece0-e7dc-4506-b343-44b0cc0dcbd0&action=view"/>
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
                            path='/media/icons/duotune/coding/cod009.svg'
                            className='svg-icon-3x svg-icon-primary position-absolute'
                        />
                    </div>
                    {/* end::Icon */}

                    {/* begin::Description */}
                    <div className='ms-6'>
                        <h1>Graphic Templates</h1>
                        <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
                            Mission Control has prepared multiple templates of graphic design themes that can be used across various marketing mediums. Each theme includes multiple file sizes and
                            design templates that can work as flyers, powerpoint slides, social media images, and more. Each template leaves room for organizations to customize the artwork by adding
                            their own logo, name, programs, and more. To make it accessible for all types of designers, most themes include the base files in versions of Adobe Illustrator, Powerpoint,
                            and editable PDFs for use on Canva or other programs.
                        </p>


                    </div>
                    {/* end::Description */}

                </div>

            </div>

            <div className='d-flex flex-wrap flex-stack mb-6'>
                <h3 className='fw-bolder my-2'>
                    My Documents
                </h3>

                {/* <div className='d-flex my-2'>
<select
name='status'
data-control='select2'
data-hide-search='true'
className='form-select form-select-white form-select-sm w-125px'
defaultValue='Online'
>
<option value='Online'>Online</option>
<option value='Pending'>Pending</option>
<option value='Declined'>Declined</option>
<option value='Accepted'>Accepted</option>
</select>
</div> */}
            </div>

            <div className='row g-6 g-xl-9'>
                <div className='col-md-6 col-xxl-4'>
                    <Card3
                        avatar='/media/marketing/HowPlaying.png'
                        link='https://drive.google.com/drive/folders/14C33yaL1HlLEUQlQfsDir__dcXfIrCxn'

                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card3
                        avatar='/media/marketing/LevelUpGame.png'
                        link='https://drive.google.com/drive/folders/10Z47kxcmKqGedCFu80ewzrNG-H2rC8Q8'

                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card3
                        avatar='/media/marketing/SeasonX.png'
                        link='https://drive.google.com/drive/folders/1fR7xhY2K-Gb1YGAkDF90w3CNfaxH3LWz'

                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card3
                        avatar='/media/marketing/RemoteAccess.png'
                        link='https://drive.google.com/drive/folders/16J_cyHaFnyVoubPbqaEAqU-7zvWKapXo'
                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card3
                        avatar='/media/marketing/RealGameIsOn.png'
                        link='https://drive.google.com/drive/folders/1H1C3QYpROeBqed5BjvckGjT3bTMbOsMo'
                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card3
                        avatar='/media/marketing/MakeItCount.png'
                        link='https://drive.google.com/drive/folders/15hdaf_R3nGZXFdg0IHvjEo7vN-5cBXVl'
                    />
                </div>
            </div>
        </>
    )
}


export {MarketingIndex}