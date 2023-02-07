import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'

const SidebarFooter = () => {
  return (
    <div className='app-sidebar-footer flex-column-auto pt-2 pb-6 px-6' id='kt_app_sidebar_footer'>
      <a
        className='btn btn-flex flex-center btn-custom btn-mc-secondary overflow-hidden text-nowrap px-0 h-40px w-100'
        data-bs-toggle='tooltip'
        data-bs-trigger='hover'
        data-bs-dismiss-='click'
        rel='noreferrer'
        href='https://forms.gle/B4jBuHaU3cyJHYdU8'
        target='_blank'
      >
        <KTSVG path={toAbsoluteUrl('/media/icons/duotune/gen005.svg')} className='svg-icon-2' />
        <span className='btn-label'>Support</span>
      </a>
    </div>
  )
}

export {SidebarFooter}
