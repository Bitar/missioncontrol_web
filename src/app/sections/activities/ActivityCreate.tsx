import React, {FC, useEffect, useState,useRef} from 'react'
import {ErrorMessage, Field, FormikProvider, setIn, useFormik} from "formik";
import {Activity, initialActivity} from "../../models/activity/Activity";
import * as Yup from "yup";
import {getGames} from "../games/core/_requests";
import Select from "react-select";
import {ACTIVITY_FEE, ACTIVITY_ITEMTYPE, ACTIVITY_ITEM_VALUETYPE, ACTIVITY_LOCATION,ACTIVITY_PRIZETYPE,ACTIVITY_ROUNDS, ACTIVITY_TIMEZONES, selectCustomStyles} from "./core/_consts";
import {isNotEmpty, KTCard, KTCardBody} from "../../../_metronic/helpers";
import {Game, initialGame} from "../../models/game/Game";
import { createActivity } from './core/_requests';
//import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format} from 'date-fns'
import DatePicker, { DateObject} from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import type{Value} from "react-multi-date-picker"

const editActivitySchema = Yup.object().shape({
    // title: Yup.string()
    //     .required('Title is required'),
    // description: Yup.string()
    // .required('Description is required'),
    // team:Yup.object().shape({
    //     players: Yup.string()
    //         .required('Number of team players is required'),
    //     min: Yup.string()
    //     .required('Number of maximum team players is required'),
    //     max: Yup.string()
    //     .required('Number of minimum team players is required'),
        
    // })
    
})


const gamesSelect: any[] = []
const platforms: any[] = []

const ActivityCreate: FC = () => {
    const [activity, setActivity] = useState<Activity>(initialActivity)

    const [selectedStateOption, setselectedStateOption] = useState(0)    
    const [location,setLocation] = useState("selectLocation")
    const [inPerson,setInPerson] = useState(false)
    const [clickedButton, setClickedButton] = useState('');
    const [date, setDate] = useState<Date | null>(new Date());
    const [enddate,setEndDate] = useState<Date | null>(new Date());
    const [matchdate, setMatchDate] = useState<Date | null>(new Date());
    const [matchenddate,setMatchEndDate] = useState<Date | null>(new Date());
    const [frequencys, setFrequencys] = useState<any>([new Date()]);
    const [time, setTime] = useState(new Date());
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endingDate, setEndingDate] = useState(null);
    const [onefrequency, setOneFrequencys] = useState<any>([new Date()]);
    const [selected, setSelected] = useState('Online');
    const [selectedfee, setSelectedFee] = useState('Free');
    const [selectedfrequency, setSelectedFrequency] = useState('Daily');


    const [startDateTest, setStartDateTest] =useState<Date | null>(new Date());
    const [endDateTest, setEndDateTest] = useState<Date | null>(new Date());


    const [dates, setDates] = useState<Value>(new Date());
    // const format = 'MM/DD/YYYY';
    const [sdate, setSdate] = React.useState();
    console.log(sdate);
  
    const [values, setValues] = React.useState([
      new DateObject(),
      new DateObject().add(1, 'day'),
    ]);
    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();  
        const button: HTMLButtonElement = event.currentTarget;
        setClickedButton(button.name);
      };  


      const datepickerRef = useRef<any>();
      
      function FrequencyPicker (value:any) {
        const [start, end] = value;
        console.log(start)
        console.log(end)
        setStartDate(start);
        setEndingDate(end);
      };
      
      function handleDateChange(date:any) {
        // initial change: start by setting the startDate
        if (!startDateTest && !endDateTest) {
          setStartDateTest(date);
         // startDate has been set, set the end date
        } else if (startDateTest && !endDateTest) {
         setEndDateTest(date);
        }
    
        // user is choosing another range => set the start date
        // and set the endDate back to null
        if (startDateTest && endDateTest) {
          setStartDateTest(date);
          setEndDateTest(null);
        }
     }
    
    function HandleDateChange (value:any)  {
        setDate(new Date(value))
    }

    function HandleEndDateChange (value:any)  {
        setEndDate(new Date(value))
    }

    function HandleMatchStartDate (value:any)  {
        setMatchDate(new Date(value))
    }

    function HandleMatchEndDate (value:any)  {
        setMatchEndDate(new Date(value))  
    }

    function HandleTimePicker (value:any)  {
        setTime(new Date(value))
    }

    //  function HandleOneFrequency (value:any)  {
    //      setOneFrequencys(new Date(value))
    //  }

    const selectionChanged = (e:any) => setSelected(e.target.value);
    const selectionFee = (e:any) => setSelectedFee(e.target.value);
    const selectionFrequency = (e:any) => setSelectedFrequency(e.target.value);
     
    function FrequencyDatePicker (value:any)  {
          var value = frequencys
          value.push(new Date())
         setFrequencys(value)
     }

     // var x = frequencys
    // x.push(new Date())
    // setFrequencys(x)
    const calendarRef = useRef<any>();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialActivity,
        validationSchema: editActivitySchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if(isNotEmpty(values.id)){
                }else{
                    //console.log(values)
                    let formData = new FormData()
                    formData.append('game_id', activity.game!.id as any)
                    formData.append('type_id', '1')
                    formData.append('community_id', '224')
                    formData.append('title', values.title!)
                    formData.append('description', values.description!)
                    formData.append('rounds', values.rounds! as any)
                    formData.append('platform_ids', '7')
                    //formData.append('platform_ids', activity.platforms!.id as any)
                  
                    formData.append('is_cross_play', activity.is_crossPlay! as any)
                    formData.append('team[players]', values.team!.players)
                    formData.append('team[min]', values.team!.min)
                    formData.append('team[max]', values.team!.max)

                    formData.append('schedule[registration_dates][start_date]',format(date!, "yyyy-MM-dd") as any)
                    formData.append('schedule[registration_dates][end_date]',format(enddate!, "yyyy-MM-dd") as any)
                     formData.append('schedule[match_play_dates][start_date]',format(matchdate!, "yyyy-MM-dd") as any)
                     formData.append('schedule[match_play_dates][end_date]',format(matchenddate!, "yyyy-MM-dd") as any)
                     formData.append('schedule[match_frequency][dates]',format(startDate!, "yyyy-MM-dd") as any)      

                    formData.append('schedule[time][time_of_day]',format(time!,"HH:mm" )as any)
                    formData.append('schedule[time][timezone]',values.schedule!.time_timezone)
                            
                    formData.append('location[type]',selected)
                    formData.append('location[location]',values.location!.location)
                    formData.append('entry_fee[type]',selectedfee)
                    formData.append('entry_fee[amount]',values.entry_fee!.amount)


                    formData.append('prize[rank][0][prize_type]',values.prize!.prize_type as any)
                    formData.append('prize[rank][0][item][type]',values.prize!.item_type as any)
                    formData.append('prize[rank][0][item][name]',values.prize!.item_name)
                    formData.append('prize[rank][0][item][value]',values.prize!.item_value as any)
                    formData.append('prize[rank][0][item][value_type]',values.prize!.item_value_type as any)
                    // @ts-ignore
                     console.log(...formData)
                    const potato = await createActivity(formData)
                    // navigate('/communities/' + potato?.id)     
                }
                // await updateRole(params.id, values)
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(false)
                // cancel()
            }
        }
    })

    useEffect(() => {
        getGames('per_page=200').then(response => {
            response?.data?.forEach(function (value) {
                gamesSelect.push({
                    value: value.id,
                    label: value.title,
                    image: value.image,
                    description: value.description,
                    platforms: value.platforms,
                    original: value
                })
            })
        })
    }, [])

    const updatePlatforms = (inputValue: any) => {
        if (inputValue?.platforms.length > 0) {
            updateData({
                game: inputValue.original,
                is_crossPlay: true
            })
            inputValue.platforms.forEach(function (value: any) {
                platforms.push({value: value.id, label: value.name, abbreviation: value.abbreviation})
            })
        } else {
            updateData({
                game: initialGame,
                is_crossPlay: false
            })

            platforms.length = 0
        }
    }

    const updateData = (fieldsToUpdate: Partial<Activity>) => {
        const updatedData = {...activity, ...fieldsToUpdate}
        setActivity(updatedData)
    }

    return (
        <>
            <FormikProvider value={formik}>
                <form className='form d-flex flex-column flex-lg-row' onSubmit={formik.handleSubmit} noValidate>

                    {/* Aside */}
                    <div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10">
                        <div className="card card-flush py-4">
                            <div className="card-header">
                                <div className="required card-title">
                                    <h2>Game</h2>
                                </div>
                            </div>
                            <div className="card-body pt-0">

                                <div className='mb-5'>
                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isClearable={true}
                                        isSearchable={true}
                                        name="gameTitle"
                                        onChange={updatePlatforms}
                                        options={gamesSelect}
                                        styles={selectCustomStyles}
                                        formatOptionLabel={game => (
                                            <div className="game-option">
                                                <div className="row">
                                                    <div className="col-3">
                                                        <div className="game-image d-inline">
                                                            <img src={game.image} alt={game.label}
                                                                 className='w-100 rounded d-block'/>
                                                        </div>
                                                    </div>
                                                    <div className="col-8">
                                                        <div className="game-content d-inline">
                                                            <div className="game-title">
                                                                <h5 className="d-inline">{game.label}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>

                                {activity?.game &&
                                    <div>
                                        <div className="game-option">
                                            <div className="row">
                                                <div className="game-image mb-2">
                                                    <img src={activity?.game?.image} alt={activity?.game?.title}
                                                         className='w-100 rounded d-block'/>
                                                </div>
                                                <div className="game-content">
                                                    <div className="game-title mb-2">
                                                        <h3>{activity?.game?.title}</h3>
                                                    </div>
                                                    <div className="game-description text-muted"
                                                         style={{textAlign: 'justify'}}>
                                                        <p>{activity?.game?.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    {/* Main */}
                    <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
                        <div className="d-flex flex-column gap-7 gap-lg-10">
                            <KTCard className='card-flush py-4'>
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>General</h2>
                                    </div>
                                </div>

                                <KTCardBody className='py-4'>
                                    <div className="mb-10 fv-row">
                                        <label className="required form-label">Title</label>
                                        <Field
                                            type='text'
                                            className='form-control mb-2'
                                            placeholder='Activity Title'
                                            name='title'
                                        />
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='title'/>
                                        </div>
                                    </div>


                                    <div className='mb-10 fv-row'>
                                        <label className='required form-label'>Description</label>
                                        <Field
                                            as='textarea'
                                            name='description'
                                            className='form-control mb-2'
                                            placeholder='Activity Description...'
                                            rows={3}
                                        />
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='description'/>
                                        </div>
                                    </div>

                                    <div className='mb-10 fv-row'>
                                        <label className='required form-label'>Rounds</label>
                                        <select className="form-select" aria-label="Default select example" defaultValue={'DEFAULT'}
                                         {...formik.getFieldProps('rounds')}
                                       >
                                         {ACTIVITY_ROUNDS.map((option, index) => (
                                            <option key={option.value} selected={index===selectedStateOption}>{option.label}</option>
                                          ))}
                                          </select>   
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='rounds'/>
                                        </div>
                                    </div>

                                    <div className="mb-10 fv-row">
                                        <div className='d-flex flex-stack'>
                                            <div className='d-flex'>
                                                <div className='d-flex flex-column'>
                                                    <span className='fs-5 text-dark fw-bolder'>
                                                        Enable CrossPlay
                                                    </span>
                                                    <div className='fs-6 fw-bold text-gray-400'>Description on what that
                                                        means to enable cross play.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-end'>
                                                <div className='form-check form-check-solid form-switch'>            
                                                <Field
                                                        className='form-check-input w-45px h-30px'
                                                        type='checkbox'
                                                        id='googleswitch'
                                                        {...formik.getFieldProps('is_cross_play')}
                                                        checked={activity?.is_crossPlay}
                                                        onChange={() =>
                                                            updateData({
                                                                is_crossPlay: !activity?.is_crossPlay,
                                                            })
                                                        }
                                                    />
                                                    <label className='form-check-label' htmlFor='googleswitch'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {activity?.is_crossPlay && platforms.length > 0 &&
                                        <div className='mb-10 fv-row'>
                                            <label className='form-label mb-3'>Platforms</label>

                                            {platforms.length > 0 &&
                                                <Select
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    isMulti={true}
                                                    name="platform_ids"
                                                    options={platforms}
                                                    styles={selectCustomStyles}
                                                />
                                            }

                                            <div className='text-danger mt-2'>
                                                <ErrorMessage name='platforms'/>
                                            </div>
                                        </div>
                                    }
                                </KTCardBody>
                            </KTCard>
                        </div>
                        <KTCard className='card-flush py-4'>
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>Schedule</h2>
                                    </div>
                                </div>

                                <KTCardBody className='py-4'>
                               <div className='mb-10 fv-row'>
                                <label className='required form-label'>Registration Start Date</label>

                                <DatePicker
                                value={dates}
                                onChange={setDates}
                                range
                                sort
                                placeholder="write"
                                calendarPosition="bottom-center"
                                plugins={[<DatePanel />]}
                            />
                               
                                    <div className='text-danger mt-2'>
                                    <ErrorMessage name='registration_dates.start_date'/>
                                    </div>
                                </div>

                                <div className='mb-10 fv-row'>
                                <label className='required form-label'>Registration End Date</label>
                                        {/* <DatePicker
                                        name="registration_dates.end_date"
                                        onChange={(value) => HandleEndDateChange(value)}
                                        selected={enddate}
                                        /> */}
                               
                                    <div className='text-danger mt-2'>
                                    <ErrorMessage name='registration_dates.end_date'/>
                                    </div>
                                </div>
                                <div className='mb-10 fv-row'>
                                <label className='required form-label'>Match Start Date</label>
                                        {/* <DatePicker
                                        onChange={(value) => HandleMatchStartDate(value)}
                                        selected={matchdate}   
                                        />                    */}
                                    <div className='text-danger mt-2'>
                                    <ErrorMessage name='registration_dates.start_date'/>
                                    </div>
                                </div>

                                <div className='mb-10 fv-row'>
                                <label className='required form-label'>Match Frequency</label>
                                <div className='mb-10 fv-row'>
                                    {/* SELECT COMPONENT */}
                                    <select className="form-select" value={selectedfrequency}onChange={selectionFrequency}>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                    </select>
                                     {/* IF OPTION 2 IS SELECTED */}
                                    {selectedfrequency === "Daily" && (
                                        <>
                                         <div>
                                        
                                            </div>
                                         
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='entry.amount'/>
                                        </div>
                                        </>
                                    )}
                                    </div>
                                    {/* IF OPTION 1 IS SELECTED */}
                                    {selectedfrequency === "Weekly" && (
                                        // <DatePicker
                                        // selected={startDate}
                                        // onChange={(value) => FrequencyPicker(value)}
                                        // startDate={startDate}
                                        // endDate={endingDate}
                                        // selectsRange
                                        // inline
                                        // />
                                        <>
                                         <div>
                                        
                                            </div>
                                         
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='entry.amount'/>
                                        </div>
                                        </>
                                    )}
                                                                
                                    <div className='text-danger mt-2'>
                                    <ErrorMessage name='registration_dates.start_date'/>
                                    </div>
                                </div>


                                <div className='mb-10 fv-row'>
                                <label className='required form-label'>Match End Date</label>
                                        {/* <DatePicker
                                        onChange={(value, e) => HandleMatchEndDate(value)}
                                        selected={matchenddate}      
                                        /> */}
                               
                                    <div className='text-danger mt-2'>
                                    <ErrorMessage name='registration_dates.start_date'/>
                                    </div>
                                </div>
                                <div className='mb-10 fv-row'>
                                <label className='required form-label'>Time Picker</label>
                                {/* <DatePicker
                                selected={time}
                                onChange={(value) => HandleTimePicker(value)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                /> */}
                                                        
                                    <div className='text-danger mt-2'>
                                    <ErrorMessage name='registration_dates.start_date'/>
                                    </div>
                                </div>

                                    <div className='mb-10 fv-row'>
                                        <label className='required form-label'>Time Zones</label>
                                        <select className="form-select" aria-label="Default select example" defaultValue={'DEFAULT'}
                                         {...formik.getFieldProps('schedule[time_timezone]')}
                                       >
                                         {ACTIVITY_TIMEZONES.map((option, index) => (
                                            <option 
                                            key={option.value} selected={index===selectedStateOption}>
                                                {option.value}
                                                </option>
                                          ))}    
                                          </select>
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='schedule.time_timezone'/>
                                        </div>
                                    </div>
  
                                </KTCardBody>
                            </KTCard>
                            <KTCard className='card-flush py-4'>
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>Location</h2>
                                    </div>
                                </div>

                                <KTCardBody className='py-4'>
                                    <div className='mb-10 fv-row'>
                                        <label className='required form-label'>Location Type</label>
                                        {/* HandleOneFrequency */}
                                <div className='mb-10 fv-row'>
                                    {/* SELECT COMPONENT */}
                                    <select className="form-select" value={selected} onChange={selectionChanged}>
                                        <option value="Online">Online</option>
                                        <option value="InPerson">In Person</option>
                                    </select> 
                                    {/* IF OPTION 2 IS SELECTED */}
                                    {selected === "InPerson" && (
                                        <>
                                        <Field
                                            type='text'
                                            className='form-control mb-2'
                                            placeholder='Location'
                                            name='location.location'
                                        />
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='location.location'/>
                                        </div>
                                        </>
                                    )}
                                    </div>
                                </div>
                                                              
                                </KTCardBody>
                            </KTCard>
                            <KTCard className='card-flush py-4'>
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>Team</h2>
                                    </div>
                                </div>

                                <KTCardBody className='py-4'>
                                    <div className="mb-10 fv-row">
                                        <label className="required form-label">Team Players</label>

                                        <Field
                                            type='text'
                                            className='form-control mb-2'
                                            placeholder='Team Players'
                                            {...formik.getFieldProps('team[players]')}
                                        />
                                        {/* <div className="text-muted fs-7">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div> */}
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='team.players'/>
                                        </div>
                                    </div>

                                    <div className="mb-10 fv-row">
                                        <label className="required form-label">Team Players Minimum</label>

                                        <Field
                                            type='text'
                                            className='form-control mb-2'
                                            placeholder='Team Players Minimum'
                                            {...formik.getFieldProps('team[min]')}
                                        />


                                        {/* <div className="text-muted fs-7">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div> */}
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='team.min'/>
                                        </div>
                                    </div>

                                    <div className="mb-10 fv-row">
                                        <label className="required form-label">Team Players Maximum</label>

                                        <Field
                                            type='text'
                                            className='form-control mb-2'
                                            placeholder='Team Players Maximum'
                                            {...formik.getFieldProps('team[max]')}
                                        />
                                        {/* <div className="text-muted fs-7">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div> */}
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='team.max'/>
                                        </div>
                                    </div>
                                </KTCardBody>
                            </KTCard>
                                     
                            <KTCard className='card-flush py-4'>
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>Entry Fee</h2>
                                    </div>
                                </div>
                                <KTCardBody className='py-4'>
                                    <div className='mb-10 fv-row'>
                                        <label className='required form-label'>Entry Type</label>
                                        <div className='mb-10 fv-row'>
                                    {/* SELECT COMPONENT */}
                                    <select className="form-select" value={selectedfee} onChange={selectionFee}>
                                        <option value="Free">Free</option>
                                        <option value="Paid">Paid</option>
                                    </select>
                                     {/* IF OPTION 2 IS SELECTED */}
                                    {selectedfee === "Paid" && (
                                        <>
                                        <Field
                                            type='text'
                                            className='form-control mb-2'
                                            placeholder='Enter Entry Amount'
                                            name="entry_fee[amount]"
                                            
                                        />
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='entry.amount'/>
                                        </div>
                                        </>
                                    )}
                                    </div>

                                       
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='entry.type'/>
                                        </div>
                                    </div>
                                </KTCardBody>
                            </KTCard>




                            <KTCard className='card-flush py-4'>
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>Prize</h2>
                                    </div>
                                </div>

                                
                                <KTCardBody className='py-4'>
                                    <div className='mb-10 fv-row'>
                                        <label className='required form-label'>Prize Item Type</label>
                                         <select className="form-select" aria-label="Default select example" 
                                         defaultValue={'DEFAULT'}
                                         {...formik.getFieldProps('prize.prize_type')}
                                        >
                                         {ACTIVITY_PRIZETYPE.map((option, index) => (
                                            <option key={option.value} selected={index===selectedStateOption}>{option.label}</option>
                                          ))}
                                          </select> 
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='prize.prize_type'/>
                                        </div>
                                    </div>
                 
                                    <div className='mb-10 fv-row'>
                                        <label className='required form-label'>Prize Item Type</label>
                                         <select className="form-select" aria-label="Default select example" 
                                         defaultValue={'DEFAULT'}
                                         {...formik.getFieldProps('prize.item_type')}

                                        >
                                         {ACTIVITY_ITEMTYPE.map((option, index) => (
                                            <option key={option.value} selected={index===selectedStateOption}>{option.label}</option>
                                          ))}
                                          </select> 
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='prize.item_type'/>
                                        </div>
                                    </div>
                              
                                    <div className="mb-10 fv-row">
                                        <label className="required form-label">Prize Item Name</label>   
                                        <Field
                                            type='text'
                                            className='form-control mb-2'
                                            placeholder='Activity Title'
                                            name='prize.item_name'
                                        />
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='prize.item_name'/>
                                        </div>
                                    </div>
                                    <div className="mb-10 fv-row">
                                        <label className="required form-label">Prize Item Amount</label>                           
                                        <Field
                                            type='text'
                                            className='form-control mb-2'
                                            placeholder='Activity Title'
                                            name='prize.item_value'
                                        />     
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='prize.item_value'/>
                                        </div>
                                    </div>
                                    <div className='mb-10 fv-row'>
                                        <label className='required form-label'>Item Type</label>
                                        <select className="form-select" aria-label="Default select example" 
                                         defaultValue={'DEFAULT'}
                                         {...formik.getFieldProps('prize.item_value_type')} 
                                        >
                                         {ACTIVITY_ITEM_VALUETYPE.map((option, index) => (
                                            <option key={option.value} selected={index===selectedStateOption}>{option.label}</option>
                                          ))}
                                          </select> 
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='prize.item_value_type'/>
                                        </div>
                                    </div>

                                   <button 
                                   onClick={buttonHandler} 
                                   className="btn btn-primary mb-5" name="button 1">
                                    Add Prize
                                    </button>
                                    <div className='card mb-5 mb-xl-10'>
                                    {clickedButton !== ""
                                    ? <><div className='mb-10 fv-row'>
                                            <label className='required form-label'>Prize Item Type</label>
                                            <select className="form-select" aria-label="Default select example"
                                                defaultValue={'DEFAULT'}
                                                {...formik.getFieldProps('prize.prize_type')}
                                            >
                                                {ACTIVITY_PRIZETYPE.map((option, index) => (
                                                    <option key={option.value} selected={index === selectedStateOption}>{option.label}</option>
                                                ))}
                                            </select>
                                            <div className='text-danger mt-2'>
                                                <ErrorMessage name='prize.prize_type' />
                                            </div>
                                        </div><div className='mb-10 fv-row'>
                                                <label className='required form-label'>Prize Item Type</label>
                                                <select className="form-select" aria-label="Default select example"
                                                    defaultValue={'DEFAULT'}
                                                    {...formik.getFieldProps('prize.item_type')}

                                                >
                                                    {ACTIVITY_ITEMTYPE.map((option, index) => (
                                                        <option key={option.value} selected={index === selectedStateOption}>{option.label}</option>
                                                    ))}
                                                </select>
                                                <div className='text-danger mt-2'>
                                                    <ErrorMessage name='prize.item_type' />
                                                </div>
                                            </div><div className="mb-10 fv-row">
                                                <label className="required form-label">Prize Item Name</label>
                                                <Field
                                                    type='text'
                                                    className='form-control mb-2'
                                                    placeholder='Activity Title'
                                                    name='prize.item_name' />
                                                <div className='text-danger mt-2'>
                                                    <ErrorMessage name='prize.item_name' />
                                                </div>
                                            </div><div className="mb-10 fv-row">
                                                <label className="required form-label">Prize Item Amount</label>
                                                <Field
                                                    type='text'
                                                    className='form-control mb-2'
                                                    placeholder='Activity Title'
                                                    name='prize.item_value' />
                                                <div className='text-danger mt-2'>
                                                    <ErrorMessage name='prize.item_value' />
                                                </div>
                                            </div><div className='mb-10 fv-row'>
                                                <label className='required form-label'>Item Type</label>
                                                <select className="form-select" aria-label="Default select example"
                                                    defaultValue={'DEFAULT'}
                                                    {...formik.getFieldProps('prize.item_value_type')}
                                                >
                                                    {ACTIVITY_ITEM_VALUETYPE.map((option, index) => (
                                                        <option key={option.value} selected={index === selectedStateOption}>{option.label}</option>
                                                    ))}
                                                </select>
                                                <div className='text-danger mt-2'>
                                                    <ErrorMessage name='prize.item_value_type' />
                                                </div>
                                            </div></>
                                                : ""}
                                            </div>
                                            
                                        <div className='py-5'>
                                        <button
                                            type='submit'
                                            className='btn btn-primary'
                                            data-kt-users-modal-action='submit'
                                            disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
                                        >
                                            <span className='indicator-label'>Submit</span>
                                            {(formik.isSubmitting) && (
                                                <span className='indicator-progress'>
                                                    Please wait...{' '}
                                                    <span className='spinner-border spinner-border-sm align-middle ms-2'/>
                                                </span>
                                            )}
                                        </button>
                                    </div>
                        </KTCardBody>
                        </KTCard>
                    </div>
                </form>
                {(formik.isSubmitting)}  
            </FormikProvider>
        </>
    )
}

export {ActivityCreate}
