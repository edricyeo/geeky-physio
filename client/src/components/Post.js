import React from 'react'
import {format} from "date-fns";
import { Link } from 'react-router-dom';

const Post = ({_id, title, summary, cover, content, createdAt, author}) => {
  return (
    <div>
    <div className="hidden md:block mx-auto p-4">
      <div className='grid grid-cols-3 gap-4'>
        <div className="col-span-1">
          <Link to={`/post/${_id}`}>
            <img src={'http://geeky-physio.onrender.com/' + cover} alt="" className='rounded'></img>
          </Link>
        </div>
        <div className="col-span-2">
          <div className='grid grid-rows-6'>
            <Link className='row-span-2' to={`/post/${_id}`}>
              <h2>{title}</h2>
            </Link>
            <p className='row-span-4'>
              <time>{format(new Date(createdAt), 'd MMM yyyy')}</time>
              <p className=''>{summary}</p>
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* mobile app users*/}
    <div className='block mx-auto p-4 md:hidden'>
      <div className='grid grid-rows-2 '>
        <div className='row-span-1 max-w-sm mx-auto'>
          <Link to={`/post/${_id}`}>
            <img src={'http://geeky-physio.onrender.com/' + cover} alt="" className='rounded'></img>
          </Link>
        </div>
        <div className='row-span-1 max-w-sm mx-auto'>
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className='info'>
            <time>{format(new Date(createdAt), 'd MMM yyyy')}</time>
          </p>
          <p className='summary'>{summary}</p>
        </div>
      </div>
    </div>
    </div>

  )
}

export default Post