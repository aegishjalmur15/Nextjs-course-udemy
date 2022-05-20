import { useRef, useState, useContext } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);

  const email = useRef();
  const [warningText, setWarningText] = useState({});

  function registrationHandler(event) {
    event.preventDefault();
    setWarningText("");

    notificationCtx.showNotification({
      title: "Signing in...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    if (email.current.value) {
      const body = { email: email.current.value };

      fetch("/api/newsLetter", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "Application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then((data) => {
            throw new Error(data.message);
          });
        })
        .then((data) => {
          setWarningText({ text: data.message, success: 1 });
          notificationCtx.showNotification({
            title: data.message,
            message: "Registered for newsletter.",
            status: "success",
          });
        })
        .catch((err) => {
          setWarningText({ text: err.message, success: 0 });
          notificationCtx.showNotification({
            title: "Error",
            message: err.message,
            status: "error",
          });
        });
    } else {
      setWarningText({ text: "Invalid Email Address!", success: 0 });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={email}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
      {warningText.text ? InfoText(warningText) : null}
    </section>
  );
}

function InfoText(props) {
  return (
    <>
      {props.success ? (
        <p className={classes.success}>{props.text}</p>
      ) : (
        <p className={classes.error}>{props.text}</p>
      )}
    </>
  );
}

export default NewsletterRegistration;
