import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {getUserTeams} from '../core/Requests'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Team} from '../../../../models/squad/Team'
import {TeamCard} from '../../../../partials/team/TeamCard'

const UserTeams = () => {
  const params = useParams()
  const [teams, setTeams] = useState<Team[] | undefined>([])

  useEffect(() => {
    getUserTeams(params.id).then((response) => {
      setTeams(response.data)
    })
  }, [params.id])

  return (
    <>
      <KTCard className='bg-light'>
        <h3 className='fw-bold my-2'>
          Teams
          {/*<span className='fs-6 text-gray-400 fw-semibold ms-1'>Active</span>*/}
        </h3>
        <KTCardBody className='py-4 px-0'>
          <div className='d-flex flex-column pt-5'>
            <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
              {teams?.map((team) => (
                <div className='col-sm-6 col-xl-4' key={team.id}>
                  <TeamCard team={team} />
                </div>
              ))}
            </div>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {UserTeams}
