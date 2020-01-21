import React from 'react'
import Nav from '../Nav';

const PageLayout = (props) => {
  return (
    <>
      { props.showNav?<Nav/> : null}
      <main className="mt-4 p-3 col-10 col-md-10 offset-1 offset-md-1">
          {props.searchbox}
        <div className="row">
          {props.pageContent}
          {props.loader}
          {props.error}
          {/* {props.errorMessage} */}
          {props.nodata}
          {props.pagination}
          {props.errorMessage}
        </div>
      </main>
    </>
  )
}

export default PageLayout