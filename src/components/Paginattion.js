import React from 'react';

const Paginattion = ({searchMore, page, pages}) => {

  const nextPage = (pageNumber) =>{
    searchMore(pageNumber)
  }

  const pageLinks = [];

  for(let i = 1; i < pages + 1; i++){
    let active = page === i ? 'active' : '';

    pageLinks.push(<li className={`page-item ${active}`} key={i} onClick={() => nextPage(i)}><a className="page-link">{i}</a></li>)
  }

  return (
    <nav className="w-100">
      <ul className="pagination">
        {
          page > 1 ? <li className="page-item" onClick={() => nextPage(--page)}>
                        <a className="page-link">Previous</a>
                     </li>
                : <li className="page-item disabled">
                    <a className="page-link">Previous</a>
                  </li>
        }
        { pageLinks }
        {
          page < pages + 1 ? <li className="page-item" onClick={() => nextPage(++page)}>
                                <a className="page-link">Next</a>
                             </li>
                  : <li className="page-item disabled">
                      <a className="page-link">Next</a>
                    </li>
        }
        
      </ul>
    </nav>
  );
}

export default Paginattion;
