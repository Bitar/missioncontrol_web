import {CommunitiesByDay, CommunitiesCreation} from './CommunitiesByDay'
import React, {useEffect, useState} from 'react'
import {getHome} from '../core/DashboardRequests'
import {ActivitiesByDay, ActivitiesCreation} from './ActivitiesByDay'
import {UserRegistrations} from './UsersRegistrations'
import {UsersRegistrationsCohort} from './UsersRegistrationsCohort'
import {Game} from '../../../models/game/Game'
import {PopularGames} from './PopularGames'
import {CommunitiesByBillingPlan, CommunitiesSubscriptions} from './CommunitiesByBillingPlan'
import {Col, Row} from 'react-bootstrap'
import {StatisticsWidget5} from './StatisticsWidget5'
import {getColor} from '../../../helpers/MCHelper'
import {MixedWidget1} from './MixedWidget1'

export type PopularGamesType = {
  total: number
  game: Game
}

export type DashboardStuff = {
  communities_creation: CommunitiesCreation[]
  activities_creation: ActivitiesCreation[]
  user_registrations: UserRegistrations[]
  matches_count: number
  active_activities: number
  commissioner_communities: number
  popular_games: PopularGamesType[]
  communities_billing_plan: CommunitiesSubscriptions[]
  statistics: any
  active_users: any
  communities: any
  users_daily: any[]
  users_weekly: any[]
  users_monthly: any[]
}

export const SuperAdmin = () => {
  const [communitiesCreation, setCommunitiesCreation] = useState<CommunitiesCreation[]>([])
  const [communityByDayDates, setCommunityByDayDates] = useState<string[]>([])
  const [communityByDayValues, setCommunityByDayValues] = useState<number[]>([])

  const [activitiesCreation, setActivitiesCreation] = useState<CommunitiesCreation[]>([])
  const [activitiesByDayDates, setActivitiesByDayDates] = useState<string[]>([])
  const [activitiesByDayValues, setActivitiesByDayValues] = useState<number[]>([])

  const [usersByDayDates, setUsersByDayDates] = useState<string[]>([])
  const [usersByDayValues, setUsersByDayValues] = useState<number[]>([])

  const [communitySubscriptions, setCommunitySubscriptions] = useState<string[]>([])
  const [popularGamesActivities, setPopularGamesActivities] = useState<number[]>([])

  const [communitiesSubscriptions, setCommunitiesSubscriptions] = useState<string[]>([])
  const [communitiesSubscriptionsValue, setCommunitiesSubscriptionsValue] = useState<number[]>([])

  const [statistics, setStatistics] = useState<any[]>([])

  const [activeUsers, setActiveUsers] = useState<any>()
  const [communityData, setCommunityData] = useState<any>()

  const [userRegistrationDaily, setUserRegistrationDaily] = useState<any>()
  const [userRegistrationWeekly, setUserRegistrationWeekly] = useState<any>()
  const [userRegistrationMonthly, setUserRegistrationMonthly] = useState<any>()

  const getDashboardData = () => {
    getHome().then((response) => {
      if (response) {
        handleCommunitiesData(response.communities_creation)
        handleActivitiesData(response.activities_creation)

        handleUsersData(response.user_registrations)

        setUserRegistrationDaily(response.users_daily)
        setUserRegistrationWeekly(response.users_weekly)
        setUserRegistrationMonthly(response.users_monthly)

        handlePopularGamesData(response.popular_games)
        handleCommunityBySubscription(response.communities_billing_plan)
        handleStatistics(response.statistics)
        handleStatistics(response.statistics)
        setActiveUsers(response.active_users)
        setCommunityData(response.communities)
      }
    })
  }

  const handleCommunityBySubscription = (communitySubscriptions: CommunitiesSubscriptions[]) => {
    let data: string[] = []
    let values: number[] = []

    communitySubscriptions.forEach((communitySub) => {
      data.push(communitySub?.billing_plan?.name)
      values.push(communitySub?.total_communities)
    })

    setCommunitiesSubscriptions(data)
    setCommunitiesSubscriptionsValue(values)
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

  const handleCommunitiesData = (communitiesCreation: CommunitiesCreation[]) => {
    setCommunitiesCreation(communitiesCreation)

    let dates: string[] = []
    let values: number[] = []

    communitiesCreation.forEach((creation) => {
      dates.push(creation?.date)
      values.push(creation?.count)
    })

    setCommunityByDayDates(dates)
    setCommunityByDayValues(values)
  }

  const handleActivitiesData = (activitiesCreation: ActivitiesCreation[]) => {
    setActivitiesCreation(activitiesCreation)

    let dates: string[] = []
    let values: number[] = []

    activitiesCreation.forEach((creation) => {
      dates.push(creation?.date)
      values.push(creation?.count)
    })

    setActivitiesByDayDates(dates)
    setActivitiesByDayValues(values)
  }

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

  const handleStatistics = (statistics: any) => {
    const keys = Object.keys(statistics)

    keys.forEach((key: any, index) => {
      statistics[key].color = getColor(index)
      statistics[key].value = statistics[key].value.toLocaleString('en-us', {
        minimumFractionDigits: 0,
      })
    })

    setStatistics(statistics)
  }

  useEffect(() => {
    getDashboardData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Row>
        <Col lg={6}>
          {activeUsers && (
            <MixedWidget1
              title={'Active Users'}
              className='card-xl-stretch mb-xl-8'
              color='danger'
              data={activeUsers}
            />
          )}
        </Col>
        <Col lg={6}>
          {activeUsers && (
            <MixedWidget1
              title={'Community'}
              className='card-xl-stretch mb-xl-8'
              color='info'
              data={communityData}
            />
          )}
        </Col>
        {Object.entries(statistics).map(([key, {label, value, color}]) => {
          return (
            <Col lg={4} key={key}>
              <StatisticsWidget5
                className='card-xl-stretch mb-xl-8'
                faIcon='fas fa-users'
                color={color}
                iconColor='white'
                titleColor='white'
                descriptionColor='white'
                title={value}
                description={label}
              />
            </Col>
          )
        })}
      </Row>
      <Row>
        <Col xl={12}>
          {usersByDayDates.length > 0 && usersByDayValues.length > 0 && (
            <UsersRegistrationsCohort
              className='mb-xl-8'
              daily={userRegistrationDaily}
              weekly={userRegistrationWeekly}
              monthly={userRegistrationMonthly}
            />
          )}
        </Col>
        <Col xl={6}>
          {communitiesSubscriptions.length > 0 && communitiesSubscriptionsValue.length > 0 && (
            <CommunitiesByBillingPlan
              className='mb-xl-8'
              values={communitiesSubscriptionsValue}
              dates={communitiesSubscriptions}
            />
          )}
        </Col>
        <Col xl={6}>
          {activitiesByDayValues.length > 0 && activitiesByDayDates.length > 0 && (
            <ActivitiesByDay
              className='mb-xl-8'
              activitiesCreation={activitiesCreation}
              values={activitiesByDayValues}
              dates={activitiesByDayDates}
            />
          )}
        </Col>
        <Col xl={6}>
          {communitySubscriptions.length > 0 && popularGamesActivities.length > 0 && (
            <PopularGames
              className={'mb-xl-8'}
              dates={communitySubscriptions}
              values={popularGamesActivities}
            />
          )}
        </Col>
        <Col xl={6}>
          {communityByDayValues.length > 0 && communityByDayDates.length > 0 && (
            <CommunitiesByDay
              className='mb-xl-8'
              communitiesCreation={communitiesCreation}
              values={communityByDayValues}
              dates={communityByDayDates}
            />
          )}
        </Col>
      </Row>
    </>
  )
}
