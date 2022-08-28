/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
// import Pusher from "pusher-js";

const DashboardPage: FC<React.PropsWithChildren<unknown>> = () => {
  // const pusher = new Pusher("ef3138c351470ed98d7b", {
  //   cluster: "us2"
  // });
  // const channel = pusher.subscribe('match-113-chat');
  //
  // channel.bind('MessageSent', function(data: any) {
  //   console.log(data)
  //   return data
  // });

  return <></>
}

const DashboardWrapper: FC<React.PropsWithChildren<unknown>> = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
