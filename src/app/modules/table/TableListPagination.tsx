import clsx from 'clsx'
import {useQueryResponseLoading, useQueryResponsePagination} from "./QueryResponseProvider";
import {useQueryRequest} from "./QueryRequestProvider";

const TableListPagination = () => {
    const pagination = useQueryResponsePagination()
    const isLoading = useQueryResponseLoading()
    const {updateState} = useQueryRequest()

    const updatePage = (page: number | undefined) => {
        if (!page || isLoading || pagination.page === page) {
            return
        }

        updateState({page, per_page: pagination.per_page || 10})
    }

    const currentPage = (link: any) => {
        if (link) {
            return parseInt(link.url?.substring(link.url?.indexOf('page=') + 5))
        }
    }

    return (
        <div className='row'>
            <div
                className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'/>
            <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                <div id='kt_table_users_paginate'>
                    <ul className='pagination'>
                        {pagination.links?.map((link) => (
                            <li
                                key={link.label}
                                className={clsx('page-item', {
                                    active: pagination.current_page === currentPage(link),
                                    disabled: isLoading,
                                    previous: link.label === '&laquo; Previous',
                                    next: link.label === 'Next &raquo;',
                                })}
                            >

                                <a className='page-link'
                                   onClick={() => {
                                       updatePage(currentPage(link))
                                   }}
                                   dangerouslySetInnerHTML={{__html: link.label}}
                                   style={{cursor: 'pointer'}}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export {TableListPagination}
