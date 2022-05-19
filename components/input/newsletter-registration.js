import { useRef } from 'react';
import { useState } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {

  const email = useRef()
  const [warningText, setWarningText] = useState({});

  function registrationHandler(event) {
    event.preventDefault();
    setWarningText("");
    if(email.current.value){
      const body = { email: email.current.value }

      fetch('/api/newsLetter',{
      method: 'POST',
      body: JSON.stringify(body),
      headers:{
        'Content-Type':'Application/json'
      }
    }).then(res=>{
      if(res.status === 409){
        setWarningText({text:"Email Already Exists", success:0});
      }
      else{
        setWarningText({text:"Email Registered Successfuly!", success:1});
      }
    })
    return;
    }
    else{
      setWarningText({text:"Invalid Email Address!", success:0});
    }
    
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input ref={email}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
      {warningText.text? InfoText(warningText) : null}
    </section>
  );
}

function InfoText(props){
  return (
    <>
    {props.success? <p className={classes.success}>{props.text}</p>: <p className={classes.error}>{props.text}</p>  }
    </>  
  )
}

export default NewsletterRegistration;
