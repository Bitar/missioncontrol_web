import {Col, Row} from 'react-bootstrap'
import {StatisticsWidget5} from '../../../../pages/dashboard/partials/StatisticsWidget5'
import React, {useEffect, useState} from 'react'
import {useCommunity} from '../../core/CommunityContext'
import {getCommunityDashboard} from '../../../../pages/dashboard/core/DashboardRequests'
import {UserRegistrations} from '../../../../pages/dashboard/partials/UsersRegistrations'
import {PopularGamesType} from '../../../../pages/dashboard/partials/SuperAdmin'
import {PopularGames} from '../../../../pages/dashboard/partials/PopularGames'
import {UsersByDay} from '../../../../pages/dashboard/partials/UsersByDay'

const CommunityOverview = () => {
  const {community} = useCommunity()

  const [usersByDayDates, setUsersByDayDates] = useState<string[]>([])
  const [usersByDayValues, setUsersByDayValues] = useState<number[]>([])
  const [communitySubscriptions, setCommunitySubscriptions] = useState<string[]>([])
  const [popularGamesActivities, setPopularGamesActivities] = useState<number[]>([])

  useEffect(() => {
    if (community?.id) {
      getCommunityDashboard(community?.id).then((response) => {
        if (response) {
          handleUsersData(response.user_registrations)
          handlePopularGamesData(response.popular_games)
        }
      })
    }
  }, [community])

  const handleUsersData = (userRegistrations: UserRegistrations[]) => {
    let dates: string[] = []
    let values: number[] = []

    userRegistrations.forEach((creation) => {
      dates.push(creation?.date)
      values.push(creation?.count)
    })

    setUsersByDayDates(dates)
    setUsersByDayValues(values)
  }

  const handlePopularGamesData = (popularGames: PopularGamesType[]) => {
    let games: string[] = []
    let values: number[] = []

    popularGames.forEach((popularGame) => {
      games.push(popularGame?.game?.title)
      values.push(popularGame?.total)
    })

    setCommunitySubscriptions(games)
    setPopularGamesActivities(values)
  }

  return (
    <>
      <Row>
        {community?.subscription?.plan?.max_members && (
          <Col xl={4}>
            <StatisticsWidget5
              className='card-xl-stretch mb-xl-8'
              faIcon='fas fa-users'
              color='dark'
              iconColor='white'
              titleColor='white'
              descriptionColor='white'
              title={`${community?.additional_data?.players_count} / ${community?.subscription?.plan?.max_members}`}
              description='Users'
            />
          </Col>
        )}
        <Col xl={4}>
          {communitySubscriptions.length > 0 && popularGamesActivities.length > 0 && (
            <PopularGames
              className={'mb-xl-8'}
              dates={communitySubscriptions}
              values={popularGamesActivities}
            />
          )}
        </Col>
        <Col xl={4}>
          {usersByDayDates.length > 0 && usersByDayValues.length > 0 && (
            <UsersByDay className='mb-xl-8' values={usersByDayValues} dates={usersByDayDates} />
          )}
        </Col>
      </Row>
    </>
  )
}

export default CommunityOverview
