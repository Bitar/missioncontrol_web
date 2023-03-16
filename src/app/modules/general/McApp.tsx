import {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState} from 'react'
import {WithChildren} from '../../../_metronic/helpers'
import toast, {Toaster, ToastOptions} from 'react-hot-toast'
import {ToastType} from '../../helpers/variables'
import PendingIcon from '../../components/icons/Pending'

type Alert = {
  message: string
  type: ToastType
}

type McContextProps = {
  alert: Alert | undefined
  setAlert: Dispatch<SetStateAction<Alert | undefined>>
  pageTitle: string
  setPageTitle: Dispatch<SetStateAction<string>>
}

const initMcContextPropsState = {
  alert: undefined,
  setAlert: () => {},
  pageTitle: '',
  setPageTitle: () => {},
}

const McContext = createContext<McContextProps>(initMcContextPropsState)

const useMcApp = () => {
  return useContext(McContext)
}

const McApp: FC<WithChildren> = ({children}) => {
  const [alert, setAlert] = useState<Alert | undefined>(undefined)
  const [pageTitle, setPageTitle] = useState<string>('')

  const color = {
    success: '#50cd89',
    error: '#f1416c',
    pending: '#d5441c',
    warning: '#FFA800',
  }

  const type = {
    success: alert?.type,
    error: alert?.type,
    pending: 'success',
    warning: alert?.type,
  }

  const icon = {
    pending: <PendingIcon />,
    warning: '⚠️',
  }

  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

  useEffect(() => {
    if (alert !== undefined) {
      const options: ToastOptions = {
        id: `alert-${alert.type}`,
        duration: 4000,
        position: 'top-center',
        style: {
          border: '1px solid ' + (color as any)[alert.type],
          padding: '16px',
          color: '#000000',
        },
        iconTheme: {
          primary: (color as any)[alert.type],
          secondary: '',
        },
        ...(alert.type in icon ? {icon: (icon as any)[alert.type]} : {}),
      }

      ;(toast as any)[(type as any)[alert.type]](alert.message, options)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert])

  return (
    <McContext.Provider value={{alert, setAlert, pageTitle, setPageTitle}}>
      {children}
      <Toaster />
    </McContext.Provider>
  )
}

export {McApp, useMcApp}
