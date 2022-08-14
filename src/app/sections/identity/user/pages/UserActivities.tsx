import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {getUserActivities} from '../core/_requests'
import React, {useEffect, useState} from 'react'
import {Activity} from '../../../../models/activity/Activity'
import {useParams} from 'react-router-dom'
import {ActivityObject} from '../objects/activity/ActivityObject'

const UserActivities = () => {
  const params = useParams()
  const [activities, setActivities] = useState<Activity[] | undefined>([])

  useEffect(() => {
    getUserActivities(params.id).then((response) => {
      setActivities(response.data)
    })
  }, [params.id])

  return (
    <>
      <KTCard className='bg-light'>
        <h3 className='fw-bold my-2'>
          Activities
          <span className='fs-6 text-gray-400 fw-semibold ms-1'>Active</span>
        </h3>
        <KTCardBody className='py-4 px-0'>
          <div className='d-flex flex-column pt-5'>
            <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
              {activities?.map((activity) => (
                <div className='col-md-6 col-lg-4' key={activity.id}>
                  <ActivityObject activity={activity} />
                </div>
              ))}
            </div>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {UserActivities}
