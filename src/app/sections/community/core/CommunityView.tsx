import React from "react"
import { PageTitle } from "../../../../_metronic/layout/core"
import { KTCard } from "../../../../_metronic/helpers"
import { getCommunityById } from "./_requests"
import { Community } from "../../../models/community/Community"
const CommunityView = () => {
    

    
    return (
        <>
            <PageTitle breadcrumbs={[]}>{'Create Community'}</PageTitle>
            <KTCard>
                <div className="card-header">
                    <div className="card-title">
                        <span className="card-icon">
                            <i className="las la-plus fs-2"/>
                        </span>
                        <h3 className="card-label">
                           Your Community
                        </h3>
                    </div>
                </div>
               
            </KTCard>
        </>
    )
}

export {CommunityView}