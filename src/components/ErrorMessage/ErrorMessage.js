import React,{useEffect} from 'react'

const ErrorMessage = ({resetStatus}) => {
  //resets error status to empty
  useEffect(() => {
    setTimeout(()=>{
      resetStatus()
    }, 2000)
  },[resetStatus]);

  return (
    <div data-testid="error-message" className="w-auto bg-danger p-1 text-white text-center message">
      Something went wrong
    </div>
  )
}

export default ErrorMessage