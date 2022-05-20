import { useState, useEffect, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;
  
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState();
  const [isFetching, setIsFetching] = useState(false);


  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title:"Sending",
      message:"Sending commment",
      status:'pending'
    })
    fetch(`/api/comments/${eventId}`,{
      method: 'POST',
      body: JSON.stringify(commentData),
      headers:{
        'Content-Type':'Application/json'
      }}).then(res=>{
        if(res.ok)
        {
          return res.json();
        }
        return res.json().then(data=>{
          throw new Error(data.message)
        })
      }).then(data=>{
        notificationCtx.showNotification({
          title:"Comment sended",
          message:"Comment sended successfuly!",
          status:'success'
        })
      }).catch(err=>{
        notificationCtx.showNotification({
          title:"Error on send comment",
          message: err.message,
          status: 'error'
        })
      })
  }
  useEffect(()=>{
    if(showComments){
      setIsFetching(true);
      fetch(`/api/comments/${eventId}`).then(res=>{
        return res.json();
      }).then(data=> {
        setComments(data)
        setIsFetching(false)
      });
    }
  },[showComments])
  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetching && <CommentList comments={comments} />}
      {showComments && isFetching && <p>Loading...</p>}

    </section>
  );
}

export default Comments;
