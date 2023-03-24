import React, {FC, useMemo} from 'react'
import {TableListPagination} from '../../../modules/table/TableListPagination'
import {TableListLoading} from '../../../modules/table/TableListLoading'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {Match} from '../../../models/activity/matches/Match'
import {getDateInUTC} from '../../../helpers/ActivityHelper'
import {TextImageCell} from '../../../modules/table/columns/TextImageCell'
import {calculateTeamScore} from '../../../helpers/MCHelper'
import {useActivity} from '../core/contexts/ActivityContext'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'

type GroupedMatches = Record<number, Match[]>

type Props = {
  direction?: 'asc' | 'desc'
}

const MatchesTable: FC<Props> = ({direction = 'asc'}) => {
  const {activity} = useActivity()
  const matches = useQueryResponseData()
  const isLoading = useQueryResponseLoading()

  const data = useMemo(() => {
    if (!matches) return {}

    const groupedMatches = matches.reduce<GroupedMatches>((acc, obj) => {
      const key = new Date(parseInt(obj.start_date) * 1000).getTime()
      acc[key] = acc[key] || []
      acc[key].push(obj)
      return acc
    }, {})

    const sortedKeys = Object.keys(groupedMatches)
      .map(Number)
      .sort((a, b) => (direction === 'asc' ? a - b : b - a))

    return sortedKeys.reduce<GroupedMatches>((acc, key) => {
      acc[key] = groupedMatches[key]
      return acc
    }, {})
  }, [matches, direction])

  return (
    <>
      <div className='mb-5'>
        {Object.keys(data).map((key, index) => {
          let keyInt = parseInt(key)
          let time = dayjs(
            getDateInUTC(activity?.settings?.time!, activity?.settings?.timezone?.value)
          )
          let date = dayjs(new Date(keyInt).setHours(time.hour(), time.minute(), 0))

          return (
            <React.Fragment key={`yo-${index}`}>
              <div className='match-results'>
                <div
                  className='my-5 text-center badge-mc-secondary w-100 text-center fw-bold rounded py-1'
                  style={{fontSize: '15px'}}>
                  {date.format('MMM DD - hh:mm a')}
                </div>
                {data[keyInt]?.map((match: Match, index: number) => {
                  return (
                    <div key={`match-row-${index}`}>
                      {match?.teams && (
                        <>
                          <Link
                            to={'/activities/' + activity?.id + '/matches/' + match?.id}
                            className='d-flex align-content-center d-flex justify-content-center border-bottom py-2'>
                            <div className='col-5 d-flex py-2 px-2 mw-250px justify-content-end'>
                              <TextImageCell
                                dImage={match?.teams[0]?.image}
                                dText={match?.teams[0]?.name}
                                size={'20'}
                                flip={true}
                              />
                            </div>
                            <div className='col-2 w-60px flex-center text-dark'>
                              <div className='text-center'>
                                {match?.type && match?.type === 1 ? (
                                  <>
                                    <span className='badge bg-info'>Regular</span>
                                  </>
                                ) : (
                                  <>
                                    <span className='badge bg-success'>Playoff</span>
                                  </>
                                )}
                              </div>
                              <div className='d-flex w-60px flex-center'>
                                <span className='me-1' style={{fontSize: '15px'}}>
                                  {calculateTeamScore(match, match?.teams[0])}
                                </span>
                                <span className='mx-1'>-</span>
                                <span className='ms-1' style={{fontSize: '15px'}}>
                                  {calculateTeamScore(match, match?.teams[1])}
                                </span>
                              </div>
                              {match?.current_round && (
                                <span className='badge bg-secondary text-dark'>
                                  Round {match?.current_round}
                                </span>
                              )}
                              <div></div>
                            </div>
                            <div className='col-5 d-flex py-2 px-2 mw-250px justify-content-start'>
                              <TextImageCell
                                dImage={match?.teams[1]?.image}
                                dText={match?.teams[1]?.name}
                                size={'20'}
                              />
                            </div>
                          </Link>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </React.Fragment>
          )
        })}
      </div>
      <TableListPagination />
      {isLoading && <TableListLoading />}
    </>
  )
}

export {MatchesTable}
