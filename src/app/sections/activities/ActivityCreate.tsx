import React, {FC, useEffect, useState} from 'react'
import {ErrorMessage, Field, FormikProvider, useFormik} from "formik";
import {Activity, initialActivity} from "../../models/activity/Activity";
import * as Yup from "yup";
import {getGames} from "../games/core/_requests";
import Select from "react-select";
import {ACTIVITY_FEE, ACTIVITY_LOCATION, ACTIVITY_ROUNDS, selectCustomStyles} from "./core/_consts";
import {isNotEmpty, KTCard, KTCardBody} from "../../../_metronic/helpers";
import {initialGame} from "../../models/game/Game";
import DateTimePicker from 'react-datetime-picker';
import { createCommunity } from '../community/core/_requests';
import { createActivity } from './core/_requests';

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
    const [value, onChange] = useState(new Date());

    
    


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

                    formData.append('title', values.title!)
                    formData.append('description', values.description!)
                    formData.append('rounds', values.rounds!)
                  
                    // formData.append('is_cross_play', values.is_crossPlay!)
                     formData.append('team[players]', values.team!.toString())
                     formData.append('team[min]', values.team!.min.toString())
                     formData.append('team[max]', values.team!.max.toString())
                    // formData.append('contact[phone_number]', values.contact!.phone_number)
                    // formData.append('address[address_one]', values.address!.address_one)
                    // formData.append('address[address_two]', values.address!.address_two)
                    // formData.append('address[city]', values.address!.city)
                    // formData.append('address[state_province]', communityAddress.state_province)
                    // formData.append('address[postal_code]', values.address!.postal_code)
                    // formData.append('address[country_code]', communityAddress.country_code)

                    const potato = await createActivity(formData)
                    // navigate('/communities/' + potato?.id)
                    console.log(values)



                    
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
                gamesSelect.push({value: value.id, label: value.title, image: value.image, description: value.description, platforms: value.platforms, original: value})
            })
        })
    }, [])

    const updatePlatforms = (inputValue: any) => {
        if (inputValue?.platforms.length > 0) {
            updateData({
                game: inputValue.original
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
                                                            <img src={game.image} alt={game.label} className='w-100 rounded d-block'/>
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
                                                    <div className="game-description text-muted" style={{textAlign: 'justify'}}>
                                                        <p>{activity?.game?.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                                {/*<div className="text-muted fs-7">Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted</div>*/}
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


                                        <div className="text-muted fs-7">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
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

                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isClearable={true}
                                            isSearchable={true}
                                            name="rounds"
                                            options={ACTIVITY_ROUNDS}
                                            styles={selectCustomStyles}
                                        />

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
                                                    <div className='fs-6 fw-bold text-gray-400'>Description on what that means to enable cross play.</div>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-end'>
                                                <div className='form-check form-check-solid form-switch'>
                                                    <input
                                                        className='form-check-input w-45px h-30px'
                                                        type='checkbox'
                                                        id='googleswitch'
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
                                                    name="platforms"
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
                                    <div className="mb-10 fv-row">
                                        <label className="required form-label">Date</label>
                                        <div>   <DateTimePicker onChange={onChange} value={value} /></div>       
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
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isClearable={true}
                                            isSearchable={true}
                                            name="location"
                                            options={ACTIVITY_LOCATION}
                                            styles={selectCustomStyles}
                                            
                                        />
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='location'/>
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
                                        <div className="text-muted fs-7">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
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


                                        <div className="text-muted fs-7">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
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
                                        <div className="text-muted fs-7">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
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
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isClearable={true}
                                            isSearchable={true}
                                            name="location"
                                            options={ACTIVITY_FEE}
                                            styles={selectCustomStyles}
                                        />
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='location'/>
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
                                    <div className="mb-10 fv-row">
                                        <label className="required form-label">Title</label>

                                        <Field
                                            type='text'
                                            className='form-control mb-2'
                                            placeholder='Activity Title'
                                            name='title'
                                        />


                                        <div className="text-muted fs-7">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
                                        <div className='text-danger mt-2'>
                                            <ErrorMessage name='title'/>
                                        </div>
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
