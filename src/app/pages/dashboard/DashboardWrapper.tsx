import React, {FC, useEffect} from 'react'
import {useAuth} from '../../modules/auth'
import {isCommunityAdmin, isSuperAdmin} from '../../models/iam/User'
import {CommunityViewRoutes} from '../../routes/community/CommunityViewRoutes'
import {SuperAdmin} from './partials/SuperAdmin'
import {useMcApp} from '../../modules/general/McApp'
import {generatePageTitle} from '../../helpers/pageTitleGenerator'
import {Sections} from '../../helpers/sections'
import {PageTypes} from '../../helpers/variables'
import {CreateCommunityWidget} from '../../layout/widgets/CreateCommunityWidget'
import {DownloadAppWidget} from '../../layout/widgets/DownloadAppWidget'
import {Col, Row} from 'react-bootstrap'

const DashboardWrapper: FC<React.PropsWithChildren<unknown>> = () => {
  const {currentUser, communityAdmin} = useAuth()
  const mcApp = useMcApp()

  useEffect(() => {
    mcApp.setPageTitle(generatePageTitle(Sections.DASHBOARD, PageTypes.INDEX))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {currentUser &&
        (isSuperAdmin(currentUser) ? (
          <SuperAdmin />
        ) : isCommunityAdmin(currentUser) && communityAdmin ? (
          <CommunityViewRoutes communityId={communityAdmin?.id} />
        ) : (
          <>
            <Row>
              <Col lg={6}>
                <CreateCommunityWidget />
              </Col>
              <Col lg={6}>
                <DownloadAppWidget />
              </Col>
            </Row>
          </>
        ))}
    </>
  )
}

export {DashboardWrapper}
