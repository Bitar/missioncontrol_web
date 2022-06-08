import React from "react";
import PropTypes from "prop-types";

interface Props {
  currentPage: number;
  totalPages: number;  
  handleNextPage: (page: number) => void;
  handlePrevPage: (page: number) => void;
  setPage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  setPage,
  handlePrevPage,
  handleNextPage

}) => {  
  
  return (
    
    <div className='row'>
    <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'/>
    <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
    <ul className='pagination'>
        <button
        onClick={() => handlePrevPage(currentPage)}
        disabled={currentPage === 1}
        className={`page-link ${currentPage === 1 && "disabled"}`}
        
      >
        &laquo; Previous
      </button>     
        {/* @ts-ignore */}
      {[...Array(totalPages).keys()].map(el => (
    <button
      onClick={() => setPage(el + 1)}
      key={el}
      className={`page-link ${currentPage === el + 1 ? "btn btn-primary btn-sm active" : ""}`}
    >
      {el + 1}
      
    </button>
  ))}
      <button
        onClick={() => handleNextPage(currentPage)}
        disabled={currentPage === totalPages}
        className={`page-link ${currentPage === totalPages && "disabled"}`}
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
  setPage:PropTypes.any.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired
};

export default Pagination;
