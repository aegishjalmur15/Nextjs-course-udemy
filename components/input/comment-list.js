import { useState, useEffect } from 'react';
import classes from './comment-list.module.css';

function CommentList(props) {

  const comments = props.comments;

  
  return (
    <ul className={classes.comments}>
      {comments? (comments.map(com=>{
        return(<li key={com._id}>
          <p>{com.text}</p>
          <div>
            By <address>{com.name}</address>
          </div>
        </li>)
      })): <p>Nenhum comentário</p>}
    </ul>
  );
}

export default CommentList;
