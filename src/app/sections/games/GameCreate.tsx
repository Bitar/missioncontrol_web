import React, {useEffect, useState} from 'react'
import useDebounce from './hooks/useDebounce';
import * as Yup from 'yup'
import {useNavigate} from 'react-router-dom';
import {Field, Formik} from "formik";
import {KTCard, KTCardBody, toAbsoluteUrl} from '../../../_metronic/helpers';
import {Igdb} from '../../models/game/Igdb';
import {getIgdb} from './core/_requests';
import {createGame} from './core/_requests';
import {PageTitle} from '../../../_metronic/layout/core';
import Swal from 'sweetalert2';
import {AxiosError} from 'axios';
import clsx from "clsx";

const createGameSearchSchema = Yup.object().shape({
    query: Yup.string()
})


const GameCreate = () => {
    const [games, setGames] = useState<Igdb[] | undefined>([])
    const [search, setSearch] = useState<string | ''>('')
    const debouncedSearch = useDebounce(search, 300)

    useEffect(() => {
        getIgdb(search).then(response => {
            setGames(response.data)
        })

    }, [debouncedSearch, search])


    const sendRequest = (igdb_id: any) => {
        createGame(igdb_id).then(response => {
            Swal.fire({
                title: 'Are you sure you want to add this Game?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#009ef7',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Add it!'
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Added!', '', 'success')
                    // setIsSending(false)
                    postLink()
                } else if (result.isDenied) {
                    Swal.fire('Game not added', '', 'info')
                    cancel()
                }
            })

        })
            .catch((reason: AxiosError) => {
                    if (reason.response!.status === 500) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            footer: '<a target=”_blank” href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500">Why do I have this issue?</a>'
                        })
                    }
                }
            )
    }

    const navigate = useNavigate();

    const cancel = () => {
        navigate('/games')
    }

    const postLink = () => {
        navigate('/games')
    }

    return (
        <>
            <PageTitle breadcrumbs={[]}>{'Add Game'}</PageTitle>
            <KTCard>
                <div className="card-header">
                    <div className="card-title">
                        <span className="card-icon">
                            <i className="las la-plus fs-2"/>
                        </span>
                        <h3 className="card-label">
                            Add Game
                        </h3>
                    </div>
                </div>

                <Formik initialValues={{createGameSearchSchema}}
                        onSubmit={(values, {setSubmitting}) => {
                            setSubmitting(false);
                        }}>
                    {(formikProps) => (
                        <KTCardBody className='py-4'>

                            <div className="d-flex flex-column pt-5">
                                <div className="row mb-6">
                                    <label
                                        className="col-lg-4 col-form-label required fw-bold fs-6">Game</label>
                                    <div className="col-lg-8 fv-row">
                                        <Field
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            onChange={(e: any) => setSearch(e.target.value)}
                                            className={clsx("form-control mb-3 mb-lg-0",
                                                // {"is-invalid": touched.name && errors.name},
                                                // {"is-valid": touched.name && !errors.name}
                                            )}
                                            autoComplete="off"
                                            // disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row g-6 g-xl-9 mb-6 mb-xl-9">
                                {games?.map((game) => (
                                    <div className="col-md-6 col-lg-4 col-xl-3" key={game.id}>
                                        <div className="game-container">
                                            {/* TODO: Set The image as background Image*/}
                                            <div className="game-image">
                                                {!game.image ?
                                                    <img className=" w-100 rounded border border-2 " alt='cover'
                                                         src={toAbsoluteUrl('/media/svg/avatars/AstroLearn.svg')}/>
                                                    :
                                                    <img
                                                        onClick={() => sendRequest(game.id)}
                                                        className=" w-100 rounded border border-2"
                                                        src={game.image}
                                                        alt='game cover'
                                                    />}
                                            </div>
                                            <div className="game-title">
                                                <div
                                                    className='text-center fs-2 fw-bold text-black mt-auto'>{game.title}</div>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </KTCardBody>
                    )}
                </Formik>
            </KTCard>
        </>
    );
};

export {GameCreate}