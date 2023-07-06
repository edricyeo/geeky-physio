import React from 'react'
import {format} from "date-fns";
import { Link } from 'react-router-dom';

const Post = ({_id, title, summary, cover, content, createdAt, author}) => {
  return (
    <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={'https://geeky-physio.onrender.com/'+cover}></img>
          </Link>
        </div>
        <div className="contents">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className='info'>
            {/* <a className='author'>{author.user}</a> */}
            <time>{format(new Date(createdAt), 'd MMM yyyy')}</time>
          </p>
          <p className='summary'>{summary}</p>
        </div>
    </div>
  )
}

export default Post