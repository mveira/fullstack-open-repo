const Notification = ({ message, messageStyle}) => {
    if (!message) {
      // console.log('message', message)
      return null
    }
    else{
      return(
        <div className={messageStyle}>{message}</div>
      )
    }
      


    // if(isSuccess === false){
    //   return (
    //     <div className='error'> 
    //       {message}
    //     </div>
    //   )
    // }

    // if(isSuccess === true){
    //   return (
    //     <div className='success'> 
    //       {message}
    //     </div>
    //   )
    // }
  }

  export default Notification

/*
If the value of the message prop is null, 
then nothing is rendered to the screen, 
and in other cases, the message gets rendered inside of a div element.
*/

