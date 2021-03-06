import React from 'react';

const Paginattion = ({searchMore, page, pages}) => {

  const nextPage = (pageNumber) =>{
    searchMore(pageNumber)
  }

  return (
    <nav data-testid="pagination" className="w-100 pr-3 mt-3">
      <ul className="pagination float-right">
        {
          page > 1 ? <li data-testid="active-prev" className="page-item option" onClick={() => nextPage(--page)}>
                        <span className="page-link">Previous</span>
                     </li>
                : <li data-testid="inactive-prev" className="page-item disabled">
                    <span className="page-link">Previous</span>
                  </li>
        }
        <li data-testid="pagination-detail" className="page-item">
            <span className="page-link">{`Page ${page} of ${pages}`}</span>
        </li>
        {
          page < pages ? <li data-testid="active-next" className="page-item option" onClick={() => nextPage(++page)}>
                                <span className="page-link">Next</span>
                             </li>
                  : <li data-testid="inactive-next" className="page-item disabled">
                      <span className="page-link">Next</span>
                    </li>
        }
        
      </ul>
    </nav>
  );
}

export default Paginattion;
