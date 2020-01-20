import React from 'react'
import Nav from '../Nav';

const PageLayout = (props) => {
  return (
    <>
      { props.showNav?<Nav/> : null}
      <main className="mt-4 p-3 col-8 offset-2">
          {props.searchbox}
        <div className="row px-5">
          {props.pageContent}
          {props.loader}
          {props.nodata}
        </div>
      </main>
    </>
  )
}

export default PageLayout