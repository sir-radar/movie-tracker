import React from 'react'

const Error = () => {
  return (
  <section data-testid="error" className='loading mt-5 mx-auto text-center'>
    <i className="fa fa-times fa-5x text-danger"></i>
    <h1 data-testid="error-header">Opps</h1>
    <h3 data-testid="error-body">Something went wrong. Please check your internet and try again.</h3>
  </section>
  )
}

export default Error