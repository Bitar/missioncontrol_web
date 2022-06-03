import React from "react";
import PropTypes from "prop-types";

interface Props {
  currentPage: number;
  totalPages: number;
  handleNextPage: (page: number) => void;
  handlePrevPage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage

}) => {  


  return (
    <div className='row'>
    <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'/>
    <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
    <ul className='pagination'>
        <button
        className='page-item btn btn-white me-3'
        onClick={() => handlePrevPage(currentPage)}
        disabled={currentPage === 1}
        style={{cursor: 'pointer'}}
      >
        &laquo; Previous
      </button>

      <span className="badge badge-white me-3">
        {currentPage} of {totalPages} 
      </span>
      

      <button
        className='page-item btn btn-white me-3'
        onClick={() => handleNextPage(currentPage)}
        disabled={currentPage === totalPages}
        style={{cursor: 'pointer'}}
      >
        Next &raquo;
      </button>
      </ul>  
    </div>
    </div>

 
      
       
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired
};

export default Pagination;
