import React from 'react'
import Nav from '../Nav';

const PageLayout = (props) => {
  return (
    <>
      { props.showNav?<Nav/> : null}
      <main className="mt-4 p-3 col-10 col-md-8 offset-1 offset-md-2">
          {props.searchbox}
        <div className="row px-md-5">
          {props.pageContent}
          {props.loader}
          {props.nodata}
        </div>
      </main>
    </>
  )
}

export default PageLayout