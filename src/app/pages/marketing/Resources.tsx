import React, {useEffect} from 'react'
import {PageTitle} from '../../layout/core'
import {marketingData} from './data/MarketingData'

const Resources = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{'Resources'}</PageTitle>

      <div className='row g-10 mb-10'>
        {marketingData.map((market, index) => (
          <div className='col-md-4' key={index}>
            <div className='card'>
              <a
                href={market.link}
                target='_blank'
                download
                rel='noreferrer'
                className='d-block opacity-75-hover hoverable'
              >
                <img className='card-img-top' src={market.avatar} alt='' />
                <div className='card-body'>
                  <h5 className='card-title'>{market.title} - Media Kit</h5>
                  {/*{market.desc &&*/}
                  {/*  <p className="card-text text-black">{market.desc}</p>*/}
                  {/*}*/}
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
export {Resources}
