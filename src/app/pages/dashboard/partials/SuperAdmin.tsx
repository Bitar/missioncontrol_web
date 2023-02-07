import {CommunitiesByDay, CommunitiesCreation} from './CommunitiesByDay'
import React, {useEffect, useState} from 'react'
import {getHome} from '../core/DashboardRequests'
import {ActivitiesByDay, ActivitiesCreation} from './ActivitiesByDay'
import {UserRegistrations, UsersRegistrations} from './UsersRegistrations'
import {StatisticsWidget5} from './StatisticsWidget5'
import {UsersByDay} from './UsersByDay'
import {Game} from '../../../models/game/Game'
import {PopularGames} from './PopularGames'
import {CommunitiesByBillingPlan, CommunitiesSubscriptions} from './CommunitiesByBillingPlan'

export type PopularGames = {
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
  popular_games: PopularGames[]

  communities_billing_plan: CommunitiesSubscriptions[]
}

export const SuperAdmin = () => {
  const [data, setData] = useState<[]>()
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

  const [matchesToday, setMatchesToday] = useState<number>(0)
  const [activeActivities, setActiveActivitiesToday] = useState<number>(0)
  const [commissionerCommunities, setCommissionerCommunities] = useState<number>(0)

  const getDashboardData = () => {
    getHome().then((response) => {
      if (response) {
        handleCommunitiesData(response.communities_creation)
        handleActivitiesData(response.activities_creation)
        handleUsersData(response.user_registrations)
        setMatchesToday(response.matches_count)
        setActiveActivitiesToday(response.active_activities)
        setCommissionerCommunities(response.commissioner_communities)
        handlePopularGamesData(response.popular_games)
        handleCommunityBySubscription(response.communities_billing_plan)
      }
    })
  }

  const handleCommunityBySubscription = (communitySubscriptions: CommunitiesSubscriptions[]) => {
    let data: string[] = []
    let values: number[] = []

    communitySubscriptions.forEach((communitysub) => {
      data.push(communitysub?.billing_plan?.name)
      values.push(communitysub?.total_communities)
    })

    setCommunitiesSubscriptions(data)
    setCommunitiesSubscriptionsValue(values)
  }

  const handlePopularGamesData = (popularGames: PopularGames[]) => {
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

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <>
      <div className='row'>
        <div className='col-xl-4'>
          <StatisticsWidget5
            className='card-xl-stretch mb-5 mb-xl-8'
            faIcon={'fa-duotone fa-gamepad'}
            color='mc-primary'
            iconColor='white'
            titleColor='white'
            descriptionColor='white'
            title={activeActivities + ''}
            description='Active Activities'
          />
        </div>
        <div className='col-xl-4'>
          <StatisticsWidget5
            className='card-xl-stretch mb-5 mb-xl-8'
            faIcon={'fa-duotone fa-joystick'}
            color='mc-secondary'
            iconColor='white'
            titleColor='white'
            descriptionColor='white'
            title={matchesToday + ''}
            description='Matches Today'
          />
        </div>
        <div className='col-xl-4'>
          <StatisticsWidget5
            className='card-xl-stretch mb-5 mb-xl-8'
            faIcon={'fa-duotone fa-people-group'}
            color='success'
            iconColor='white'
            titleColor='white'
            descriptionColor='white'
            title={commissionerCommunities + ''}
            description='Commissioners'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-xl-6'>
          {communitiesSubscriptions.length > 0 && communitiesSubscriptionsValue.length > 0 && (
            <CommunitiesByBillingPlan
              className='mb-xl-8'
              values={communitiesSubscriptionsValue}
              dates={communitiesSubscriptions}
            />
          )}
        </div>
        <div className='col-xl-6'>
          {activitiesByDayValues.length > 0 && activitiesByDayDates.length > 0 && (
            <ActivitiesByDay
              className='mb-xl-8'
              activitiesCreation={activitiesCreation}
              values={activitiesByDayValues}
              dates={activitiesByDayDates}
            />
          )}
        </div>
        <div className='col-xl-4'>
          {communitySubscriptions.length > 0 && popularGamesActivities.length > 0 && (
            <PopularGames
              className={'mb-xl-8'}
              dates={communitySubscriptions}
              values={popularGamesActivities}
            />
          )}
        </div>
        <div className='col-xl-4'>
          {usersByDayDates.length > 0 && usersByDayValues.length > 0 && (
            <UsersByDay className='mb-xl-8' values={usersByDayValues} dates={usersByDayDates} />
          )}
        </div>
        <div className='col-xl-4'>
          {communityByDayValues.length > 0 && communityByDayDates.length > 0 && (
            <CommunitiesByDay
              className='mb-xl-8'
              communitiesCreation={communitiesCreation}
              values={communityByDayValues}
              dates={communityByDayDates}
            />
          )}
        </div>
      </div>
    </>
  )
}
