import React, {FC} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {CommunityIndex} from './CommunityIndex'
import {CommunityCreate} from '../CommunityCreate'

const communityBreadCrumbs: Array<PageLink> = [
    {
        title: 'Community',
        path: '/communities/overview',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]

const CommunityPage: FC = () => {
    return (
        <Routes>
            <Route path='/overview' element={
                <>
                    <PageTitle breadcrumbs={communityBreadCrumbs}>{'Overview'}</PageTitle>
                    <CommunityIndex/>
                </>
            } />
            <Route path='/create' element={
                <>
                    <PageTitle breadcrumbs={communityBreadCrumbs}>{'Add Community'}</PageTitle>
                    <CommunityCreate/>
                </>
            } />
            {/*<Route path='/:id/edit' element={*/}
            {/*    <>*/}
            {/*        <PageTitle breadcrumbs={usersBreadCrumbs}>{"Update User"}</PageTitle>*/}
            {/*        <UserEdit/>*/}
            {/*    </>*/}
            {/*}/>*/}
            <Route path='/:id/*' element={
                <>
                    <PageTitle breadcrumbs={communityBreadCrumbs}>{'View Community'}</PageTitle>
                    {/*<UserView />*/}
                </>
            } />
            <Route index element={<Navigate to='/communities/overview' replace={true} />} />
        </Routes>
    )
}

export {CommunityPage}