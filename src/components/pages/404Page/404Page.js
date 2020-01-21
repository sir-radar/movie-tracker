import React from 'react';
import PageLayout from '../../layout/PageLayout';

const Page404 = () => {
  return (
    <PageLayout
      pageContent = {
        <div className="mx-auto text-center">
          <h1>404</h1>
          <h2>Page Not Found</h2>
        </div> 
      }
    />
      

  );
}

export default Page404;
