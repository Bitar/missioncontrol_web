import React from 'react'

type Props = {
  className: string
  color: string
  title: string
  data: any
}

const snakeToTitleCase = (str: string) => {
  const words = str.split('_')
  const titleCaseWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase()
    const restOfWord = word.slice(1)
    return `${firstLetter}${restOfWord}`
  })
  return titleCaseWords.join(' ')
}

const MixedWidget1: React.FC<Props> = ({className, color, title, data}) => {
  const updatedData: any = Object.keys(data).reduce((acc, key) => {
    const newKey = snakeToTitleCase(key)
    return {
      ...acc,
      [newKey]: data[key],
    }
  }, {})

  return (
    <div className={`card ${className}`}>
      <div className='card-body p-0'>
        <div className={`px-9 pt-7 card-rounded h-175px w-100 bg-${color}`}>
          <div className='d-flex flex-stack'>
            <h3 className='m-0 text-white fw-bold fs-3'>{title}</h3>
          </div>
        </div>

        <div
          className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-body'
          style={{marginTop: '-100px'}}>
          {Object.keys(updatedData).map((key, index) => (
            <div className='d-flex align-items-center mb-6' key={`${key}-${index}`}>
              <div className='d-flex align-items-center flex-wrap w-100'>
                <div className='mb-1 pe-3 flex-grow-1'>
                  <span className='fs-5 text-gray-800 fw-bold'>{key}</span>
                </div>

                <div className='d-flex align-items-center'>
                  <div className='fw-bold fs-5 text-gray-800 pe-1'>
                    {updatedData[key].toLocaleString('en-us')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export {MixedWidget1}
