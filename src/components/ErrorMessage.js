import React,{useEffect} from 'react'

const ErrorMessage = ({resetStatus}) => {
  //resets error status to empty
  useEffect(() => {
    setTimeout(()=>{
      resetStatus()
    }, 2000)
  },[resetStatus]);

  return (
    <div className="w-25 bg-danger text-white text-center message">
      Something went wrong
    </div>
  )
}

export default ErrorMessage