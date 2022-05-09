/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
// import {
//   MixedWidget2,
//   MixedWidget10,
//   MixedWidget11,
//   ListsWidget2,
//   ListsWidget3,
//   ListsWidget4,
//   ListsWidget5,
//   ListsWidget6,
//   TablesWidget5,
//   TablesWidget10,
//   MixedWidget8,
// } from '../../../_metronic/partials/widgets'

const DashboardPage: FC = () => (
  <>

  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
