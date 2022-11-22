import React, {FC, useState} from 'react'
import {CommunityFormType, initialCommunityFormTypeByCommunity} from '../models/Community'
import {KTCard, KTCardBody, QUERIES} from '../../../../_metronic/helpers'
import {useCommunity} from '../CommunityContext'
import {KTCardHeader} from '../../../helpers/components/KTCardHeader'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import {GeneralDetail} from '../partials/community-form-steps/GeneralDetail'
import {ContactDetails} from '../partials/community-form-steps/ContactDetails'
import {AddressDetails} from '../partials/community-form-steps/AddressDetails'
import {AccessDetail} from '../partials/community-form-steps/AccessDetail'
import {PermissionDetails} from '../partials/community-form-steps/permission/PermissionDetails'
import {SuspenseView} from '../../../layout/SuspenseView'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {QueryResponseProvider} from '../../../modules/table/QueryResponseProvider'
import {getCommunityPermissions} from '../core/CommunityPermissionRequests'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {CommunityFormContext} from '../core/CommunityFormContext'
import {SubscriptionDetail} from '../partials/community-form-steps/SubscriptionDetail'

const CommunitySettings: FC = () => {
  const {community} = useCommunity()
  const [communityForm, setCommunityForm] = useState<CommunityFormType>(
    initialCommunityFormTypeByCommunity(community)
  )

  const settingsNav = [
    {
      title: 'Details',
      description: 'Basic Details',
      icon: 'fa-duotone fa-file',
    },
    {
      title: 'External Contact',
      description: 'Who should your players contact?',
      icon: 'fa-duotone fa-phone-arrow-down-left',
    },
    {
      title: 'Address',
      description: 'Where art thou?',
      icon: 'fa-duotone fa-location-dot fs-3x',
    },
    {
      title: 'Access',
      description: 'You can do what again?',
      icon: 'fa-duotone fa-key',
    },
    {
      title: 'Permissions',
      description: "Let's add people",
      icon: 'fa-duotone fa-users',
    },
    {
      title: 'Subscription',
      description: '',
      icon: 'fa-duotone fa-money-check-dollar',
    },
  ]

  return (
    <>
      <KTCard>
        <KTCardHeader text={'Settings'} className='bg-mc-secondary' text_color='white' />
        <KTCardBody>
          <Tab.Container defaultActiveKey='settingsNav-0'>
            <div className='row'>
              <div className='col-lg-4 col-xl-3'>
                <Nav variant='pills' className='flex-column settings-nav'>
                  {settingsNav.map((settings, index) => (
                    <Nav.Item key={`settings-nav-${index}`} className='mb-5'>
                      <Nav.Link className='settings-nav-item' eventKey={`settingsNav-${index}`}>
                        <div className='settings-nav-icon w-45px h-45px bg-transparent'>
                          <i className={`${settings.icon} fs-2x text-mc-secondary`}></i>
                        </div>
                        <div className='settings-nav-label'>
                          <span className='settings-nav-title'>{settings.title}</span>
                          <span className='settings-nav-desc'>{settings.description}</span>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </div>
              <div className='col-lg-8 col-xl-9'>
                <CommunityFormContext.Provider
                  value={{
                    communityForm: communityForm,
                    setCommunityForm: setCommunityForm,
                    // plans: plans,
                    // states: states,
                    // paymentTerm: paymentTerm,
                    // setPaymentTerm: setPaymentTerm
                  }}
                >
                  <Tab.Content>
                    <Tab.Pane eventKey='settingsNav-0'>
                      <GeneralDetail />
                    </Tab.Pane>
                    <Tab.Pane eventKey='settingsNav-1'>
                      <ContactDetails />
                    </Tab.Pane>
                    <Tab.Pane eventKey='settingsNav-2'>
                      <AddressDetails />
                    </Tab.Pane>
                    <Tab.Pane eventKey='settingsNav-3'>
                      <AccessDetail />
                    </Tab.Pane>
                    <Tab.Pane eventKey='settingsNav-4'>
                      <SuspenseView>
                        {community && (
                          <QueryRequestProvider>
                            <QueryResponseProvider
                              id={QUERIES.COMMUNITIES_PERMISSIONS_LIST}
                              requestFunction={getCommunityPermissions}
                              requestId={community?.id}
                            >
                              <ListViewProvider>
                                <PermissionDetails />
                              </ListViewProvider>
                            </QueryResponseProvider>
                          </QueryRequestProvider>
                        )}
                      </SuspenseView>
                    </Tab.Pane>
                    <Tab.Pane eventKey='settingsNav-5'>
                      <SubscriptionDetail />
                    </Tab.Pane>
                  </Tab.Content>
                </CommunityFormContext.Provider>
              </div>
            </div>
          </Tab.Container>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {CommunitySettings}
