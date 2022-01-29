import React  from 'react';
import { getPagesArray } from '../../../utils/pages';


const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages);
    return (
        <div className='page-wrapper'>
            {pagesArray.map( p => 
                <span 
                    key={p} 
                    className={page === p ? 'page page-current' : 'page' }
                    onClick={() => changePage(p)}>
                {p}
                </span>
            )}        
        </div>
        );
}

export default Pagination;