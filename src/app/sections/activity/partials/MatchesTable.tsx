import React, {FC, useMemo} from 'react'
import {TableListPagination} from '../../../modules/table/TableListPagination'
import {TableListLoading} from '../../../modules/table/TableListLoading'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {Match} from '../models/matches/Match'
import {getDateConvertedToLocal} from '../../../helpers/ActivityHelper'
import {TextImageCell} from '../../../modules/table/columns/TextImageCell'
import {calculateTeamScore} from '../../../helpers/MCHelper'
import {useActivity} from '../core/contexts/ActivityContext'
import {Link} from 'react-router-dom'

type Props = {
  title: string
}

interface GroupedMatches {
  [key: number]: Match[]
}

const MatchesTable: FC<Props> = ({title}) => {
  const {activity} = useActivity()
  const matches = useQueryResponseData()
  const isLoading = useQueryResponseLoading()

  const data = useMemo(() => {
    if (matches && matches?.length > 0) {
      return matches?.reduce((acc, obj) => {
        acc[obj?.start_date] = acc[obj?.start_date] || []
        acc[obj?.start_date].push(obj)
        return acc
      }, {} as GroupedMatches)
    }
    return matches
  }, [matches])

  return (
    <>
      <div className='mb-5'>
        {Object.keys(data).map((key, index) => {
          let keyInt = parseInt(key)
          let date = getDateConvertedToLocal(keyInt)

          return (
            <React.Fragment key={`yo-${index}`}>
              <div className='match-results'>
                <div
                  className='my-5 text-center badge-mc-secondary w-100 text-center fw-bold rounded py-1'
                  style={{fontSize: '15px'}}
                >
                  {date.format('MMM DD - hh:mm a')}
                </div>
                {data[keyInt]?.map((match: Match, index: number) => {
                  return (
                    <div key={`match-row-${index}`}>
                      {match?.teams && (
                        <>
                          <Link
                            to={'/activities/' + activity?.id + '/matches/' + match?.id}
                            className='d-flex align-content-center d-flex justify-content-center border-bottom py-2'
                          >
                            <div className='col-5 d-flex py-2 px-2 mw-250px justify-content-end'>
                              <TextImageCell
                                dImage={match?.teams[0]?.image}
                                dText={match?.teams[0]?.name}
                                size={'20'}
                                flip={true}
                              />
                            </div>
                            <div className='col-2 d-flex w-60px flex-center text-dark'>
                              <span className='me-1' style={{fontSize: '15px'}}>
                                {calculateTeamScore(match, match?.teams[0])}
                              </span>
                              <span className='mx-1'>-</span>
                              <span className='ms-1' style={{fontSize: '15px'}}>
                                {calculateTeamScore(match, match?.teams[1])}
                              </span>
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
