import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../layout/core'
import React, {FC, useEffect} from 'react'
import {MatchInfo} from './MatchInfo'
import {MatchOverview} from './MatchOverview'
import {getActivityMatch} from '../activity/core/ActivityRequests'
import {useActivity} from '../activity/ActivityContext'

const MatchPage: FC = () => {
  const {activity, match, setMatch} = useActivity()
  const params = useParams()
  // const [match, setMatch] = useState<Match | undefined>(initialMatch)

  const matchBreadCrumbs: Array<PageLink> = [
    {
      title: 'Activities',
      path: '/activities/:id/overview',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: match?.activity?.title || '',
      path: '/activities/' + params.id + '/overview',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: 'Match',
      path: '',
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

  useEffect(() => {
    if (match === undefined) {
      getActivityMatch(params.id, params.matchId).then((response) => {
        setMatch(response)
      })
    }
  }, [params.id, params.matchId, match, setMatch])

  return (
    <Routes>
      <Route
        element={
          <>
            <MatchInfo match={match} />
            <Outlet />
          </>
        }
      >
        <Route
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={matchBreadCrumbs}>{'Overview'}</PageTitle>
              <MatchOverview activity={activity} match={match} />
            </>
          }
        />
        <Route
          path='chat'
          element={
            <>
              <PageTitle breadcrumbs={matchBreadCrumbs}>{'Chat'}</PageTitle>
              {/*<ActivityIndex />*/}
            </>
          }
        />
        <Route
          path='settings'
          element={
            <>
              <PageTitle breadcrumbs={matchBreadCrumbs}>{'Settings'}</PageTitle>
              {/*<ActivityIndex />*/}
            </>
          }
        />
        <Route
          index
          element={
            <Navigate
              to={`/activities/${params.id}/matches/${params.matchId}/overview`}
              replace={true}
            />
          }
        />
      </Route>
    </Routes>
  )
}

export {MatchPage}
