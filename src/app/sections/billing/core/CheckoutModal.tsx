import React, {createContext, Dispatch, FC, SetStateAction, useContext, useState} from 'react'

export type CheckoutModalContextProps = {
  showCheckout: boolean
  setShowCheckout: Dispatch<SetStateAction<boolean>>
}

export const initialCheckoutModal: CheckoutModalContextProps = {
  showCheckout: false,
  setShowCheckout: () => {},
}

const CheckoutModalContext = createContext<CheckoutModalContextProps>(initialCheckoutModal)

const CheckoutModalProvider: FC<React.PropsWithChildren<unknown>> = ({children}) => {
  const [showCheckout, setShowCheckout] = useState<boolean>(initialCheckoutModal.showCheckout)

  return (
    <CheckoutModalContext.Provider
      value={{
        showCheckout,
        setShowCheckout,
      }}
    >
      {children}
    </CheckoutModalContext.Provider>
  )
}

const useCheckoutModal = () => useContext(CheckoutModalContext)

export {CheckoutModalProvider, useCheckoutModal}
