import React, {useEffect} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {marketingData} from './data/MarketingData'
import {support} from './data/SupportData'
import {Card7} from '../../../_metronic/partials/content/cards/Card7'
import toast from 'react-hot-toast'

const Marketing = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const notify = async () => {
    let text = 'Invite Link copied!'
    // TODO: Update Link for clipboard
    await navigator.clipboard.writeText(text)
    toast.success(text)
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{'Marketing & Support'}</PageTitle>
      <div className='card mb-10'>
        <div className='card-body d-flex align-items-center py-8'>
          <div className='d-flex h-80px w-80px flex-shrink-0 flex-center position-relative'>
            <KTSVG
              path='/media/icons/duotune/abs051.svg'
              className='svg-icon-primary position-absolute opacity-15'
              svgClassName='h-80px w-80px'
            />
            <KTSVG
              path='/media/icons/duotune/fil012.svg'
              className='svg-icon-3x svg-icon-primary position-absolute'
            />
          </div>

          <div className='ms-6'>
            <h1>Graphic Templates</h1>
            <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
              Mission Control has prepared multiple graphic design templates of various sizes to use
              for flyers, powerpoint slides, social media images and more. Each template can be
              customized with your own logo, name, program details, etc., and comes in various file
              types for easy edit access in Adobe Illustrator, PowerPoint, Canva and more.
            </p>
          </div>
        </div>
      </div>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        {/* <h3 className='fw-bolder my-2'>
                    My Documents
                </h3> */}
      </div>
      <div className='row g-10 mb-10'>
        {marketingData.map((market, index) => (
          <div className='col-md-4' key={index}>
            <a
              href={market.link}
              target='_blank'
              rel='noreferrer'
              className='d-block opacity-75-hover hoverable'
            >
              <img className='rounded w-100 h-auto' src={market.avatar} alt='' />
            </a>
          </div>
        ))}
      </div>

      <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
        {support.map((supportData, index) => (
          <div className='col-12 col-sm-12 col-xl' key={index}>
            <div className='card h-100'>
              <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
                <a
                  href={supportData.link}
                  className='text-gray-800 text-hover-primary d-flex flex-column'
                  rel='noreferrer'
                  target='_blank'
                >
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
        <h3 className='fw-bolder my-2'>Contact Support</h3>
      </div>

      <div className='card mb-10'>
        <div className='card-body d-flex align-items-center py-8 '>
          <div className='d-flex h-80px w-80px flex-shrink-0 flex-center position-relative'>
            <KTSVG
              path='/media/icons/duotune/abs051.svg'
              className='svg-icon-primary position-absolute opacity-15'
              svgClassName='h-80px w-80px'
            />
            <KTSVG
              path='/media/icons/duotune/com011.svg'
              className='svg-icon-3x svg-icon-primary position-absolute'
            />
          </div>

          <div className='ms-6'>
            <h1>Email Admin Support</h1>
            <div className='mt-2'>
              <a href='mailto:support@missioncontrol.gg' target='_blank' rel='noreferrer'>
                <button type='submit' className='btn btn-primary'>
                  Email
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export {Marketing}
