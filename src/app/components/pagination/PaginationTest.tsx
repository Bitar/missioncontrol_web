import React from 'react'
import PropTypes from "prop-types";

interface Props {
    nPages: number;
    currentPage: number;
    setCurrentPage:any;
  }

const PaginationTest :React.FC<Props> =  ({ 
    nPages, 
    currentPage, 
    setCurrentPage, 
    })=> {

    const pageNumbers = Array.from(Array(nPages), (_, index) => index + 1)
    console.log(pageNumbers)
    const nextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <nav>
            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <a className="page-link" 
                        onClick={prevPage} 
                        href='#'>
                        
                        Previous
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

                        <a onClick={() => setCurrentPage(pgNumber)}  
                            className='page-link' 
                            href='#'>
                            
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link" 
                        onClick={nextPage}
                        href='#'>
                        
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )
}

PaginationTest.propTypes = {
    currentPage: PropTypes.number.isRequired,
    nPages: PropTypes.number.isRequired,
    setCurrentPage:PropTypes.number.isRequired,
  };


export default PaginationTest;