/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {useAuth} from '../../modules/auth';
import {EngageWidget3} from '../../partials/widgets/EngageWidget3';
import {EngageWidget4} from "../../partials/widgets/EngageWidget4";

const DashboardPage: FC = () => {
    const {communityAdmin} = useAuth()

    return (
        <>
            <div className='row gy-5 g-xl-8'>
                <div className='col-xl-12'>
                    {!communityAdmin ? (
                        <div/>
                    ) : (
                        <>
                            <EngageWidget3
                                bgHex={'#FFFFFF'}/>
                            <EngageWidget4
                                bgHex={'#110055'}/>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

const DashboardWrapper: FC = () => {
    const intl = useIntl()
    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
            <DashboardPage/>
        </>
    )
}

export {DashboardWrapper}
