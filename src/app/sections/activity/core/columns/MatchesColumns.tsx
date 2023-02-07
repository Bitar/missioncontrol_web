import {Column} from 'react-table'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import React from 'react'
import {Match} from '../../../../models/activity/matches/Match'
import {isWinner} from '../../../../helpers/MatchHelper'
import {calculateTeamScore} from '../../../../helpers/MCHelper'
import {getDateConvertedToLocal} from '../../../../helpers/ActivityHelper'
import clsx from 'clsx'
import {TextImageCell} from '../../../../modules/table/columns/TextImageCell'

const MatchesColumns: ReadonlyArray<Column<Match>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='' className='mw-200px' />,
    id: 'teamA',
    Cell: ({...props}) => (
      <div style={{position: 'relative'}}>
        <div
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: '-1',
            backgroundColor: '#f66',
          }}
        ></div>
        <div
          style={{flexDirection: 'column'}}
          className={clsx('d-flex flex-wrap flex-stack text-start py-5 px-2 bg-light-secondary', {
            'bg-light-success':
              props.data[props.row.index]?.result &&
              isWinner(props.data[props.row.index], props.data[props.row.index]?.teams[0]?.id),
            'bg-light-danger':
              props.data[props.row.index]?.result &&
              !isWinner(props.data[props.row.index], props.data[props.row.index]?.teams[0]?.id),
          })}
        >
          {/*<div className="d-flex flex-stack text-start py-5 px-2 flex-wrap">*/}
          {/*  <div className="flex-grow-1 flex-stack">*/}
          <TextImageCell
            dImage={props.data[props.row.index]?.teams[0]?.image}
            dText={props.data[props.row.index]?.teams[0]?.name}
            size={'20'}
          />
          {/*</div>*/}
          {/*</div>*/}
        </div>
      </div>
      // <div
      //   className={clsx("d-flex flex-wrap flex-stack text-start py-5 px-2 bg-light-secondary", {
      //     "bg-light-success":
      //       props.data[props.row.index]?.result &&
      //       isWinner(props.data[props.row.index], props.data[props.row.index]?.teams[0]?.id),
      //     "bg-light-danger":
      //       props.data[props.row.index]?.result &&
      //       !isWinner(props.data[props.row.index], props.data[props.row.index]?.teams[0]?.id)
      //   })}
      // >
      //   <TextImageCell
      //     dImage={props.data[props.row.index]?.teams[0]?.image}
      //     dText={props.data[props.row.index]?.teams[0]?.name}
      //     size={"20"}
      //   />
      // </div>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='' className='mw-150px' />,
    id: 'teamAScore',
    Cell: ({...props}) => (
      <div className='text-center'>
        {calculateTeamScore(props.data[props.row.index], props.data[props.row.index]?.teams[0])}
      </div>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='' className='mw-150px' />,
    id: 'details',
    Cell: ({...props}) => {
      return (
        <div className='text-center'>
          <div className='fw-semibold text-gray-600 px-5' style={{fontSize: '12px'}}>
            <p className='m-0'>
              {getDateConvertedToLocal(props.data[props.row.index]?.start_date).format(
                'ddd MM/DD/YYYY - hh:mm a'
              )}
            </p>
            {/*  <Link*/}
            {/*    to={*/}
            {/*      '/activities/' +*/}
            {/*      props.data[props.row.index]?.activity_id +*/}
            {/*      '/matches/' +*/}
            {/*      props.data[props.row.index]?.id*/}
            {/*    }*/}
            {/*    replace*/}
            {/*    className='bg-info p-2 d-inline-block rounded mt-1'*/}
            {/*  >*/}
            {/*    <i className='fas fa-eye text-white'></i>*/}
            {/*  </Link>*/}
            {/*</p>*/}
          </div>
        </div>
      )
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='' className='mw-150px' />,
    id: 'teamBScore',
    Cell: ({...props}) => (
      <div className='text-center'>
        {calculateTeamScore(props.data[props.row.index], props.data[props.row.index]?.teams[1])}
      </div>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='' className='mw-300px' />,
    id: 'teamB',
    Cell: ({...props}) => (
      <div style={{position: 'relative'}}>
        <div
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: '-1',
            backgroundColor: '#f66',
          }}
        ></div>
        <div
          style={{flexDirection: 'column'}}
          className={clsx('d-flex flex-wrap flex-stack text-start py-5 px-2 bg-light-secondary', {
            'bg-light-success':
              props.data[props.row.index]?.result &&
              isWinner(props.data[props.row.index], props.data[props.row.index]?.teams[1]?.id),
            'bg-light-danger':
              props.data[props.row.index]?.result &&
              !isWinner(props.data[props.row.index], props.data[props.row.index]?.teams[1]?.id),
          })}
        >
          {/*<div className="d-flex flex-stack text-start py-5 px-2 flex-wrap">*/}
          {/*  <div className="flex-grow-1 flex-stack">*/}
          <TextImageCell
            dImage={props.data[props.row.index]?.teams[1]?.image}
            dText={props.data[props.row.index]?.teams[1]?.name}
            size={'20'}
          />
          {/*</div>*/}
          {/*</div>*/}
        </div>
      </div>
    ),
  },
]

export {MatchesColumns}
