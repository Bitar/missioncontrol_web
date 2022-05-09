/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useLang, setLanguage} from '../../../../_metronic/i18n/Metronici18n'

const themes = [
  {
    name: 'Light',
    slug: 'theme-light',
    icon: 'fa-sun'
  },
  {
    name: 'Dark',
    slug: 'theme-dark',
    icon: 'fa-moon'
  }
]

const ThemePicker: FC = () => {
  const currentTheme = themes.find((x) => x.slug === 'theme-light')

  return (
      <div
          className='menu-item px-5'
          data-kt-menu-trigger='hover'
          data-kt-menu-placement='left-start'
          data-kt-menu-flip='bottom'
      >
        <a href='#' className='menu-link px-5'>
          <span className='menu-title position-relative'>
            Theme
            <span className='fs-8 rounded px-3 py-2 position-absolute translate-middle-y top-50 end-0'>
              <i className={clsx("fa-solid fs-2", currentTheme?.icon)}/>
            </span>
          </span>
        </a>

        <div className='menu-sub menu-sub-dropdown w-175px py-4'>
          {themes.map((t) => (
              <div
                  className='menu-item px-3'
                  key={t.slug}
                  onClick={() => {
                    // setLanguage(t.slug)
                    // Set Theme to Clicked
                  }}
              >
                <a
                    href='#'
                    className={clsx('menu-link d-flex px-5', {active: t.slug === currentTheme?.slug})}
                >
              <span className='symbol symbol-20px me-4'>
                <i className={clsx("fa-solid fs-2", t.icon)}/>
              </span>
                  {t.name}
                </a>
              </div>
          ))}
        </div>
      </div>
  )
}

export {ThemePicker}
