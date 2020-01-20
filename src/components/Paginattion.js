import React from 'react';

const Paginattion = ({searchMore, page, pages}) => {

  const nextPage = (pageNumber) =>{
    searchMore(pageNumber)
  }

  const pageLinks = [];
  
  for(let i = 1; i < pages + 1; i++){
    let active = page === i ? 'active' : '';

    pageLinks.push(<li className={`page-item option ${active}`} key={i} onClick={() => nextPage(i)}><span className="page-link">{i}</span></li>)
  }

  return (
    <nav className="w-100 pr-3 mt-3">
      <ul className="pagination float-right">
        {
          page > 1 ? <li className="page-item option" onClick={() => nextPage(--page)}>
                        <span className="page-link">Previous</span>
                     </li>
                : <li className="page-item disabled">
                    <span className="page-link">Previous</span>
                  </li>
        }
        { pageLinks }
        {
          page < pages ? <li className="page-item option" onClick={() => nextPage(++page)}>
                                <span className="page-link">Next</span>
                             </li>
                  : <li className="page-item disabled">
                      <span className="page-link">Next</span>
                    </li>
        }
        
      </ul>
    </nav>
  );
}

export default Paginattion;
