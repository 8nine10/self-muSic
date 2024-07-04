import React from 'react';
import { useNavigate } from 'react-router-dom';

const Pagination = ({ pageNumber, isNext, path }) => {
  const navigate = useNavigate();
  const handleNavigation = (type) => {
    let nextPageNumber = Number(pageNumber);
  
    if (type === "prev") {
      nextPageNumber = Math.max(1, nextPageNumber - 1);
    } else if (type === "next") {
      nextPageNumber = nextPageNumber + 1;
    }
  
    if (nextPageNumber > 1) {
      navigate(`?page=${nextPageNumber}`);
    } else {
      navigate(``);
    }
  };
  

  return (
    <div className='pagination flex justify-center items-center gap-4'>
      <button
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1}
        className='text-small-regular text-light-2'
        aria-label="Previous Page"
      >
        Prev
      </button>
      <p className='text-small-semibold text-light-1'>{pageNumber}</p>
      <button
        onClick={() => handleNavigation("next")}
        disabled={!isNext}
        className='text-small-regular text-light-2'
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
