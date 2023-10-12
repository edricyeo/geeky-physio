import React, { useContext, useEffect, useState } from 'react';
import {format} from "date-fns";
import { useParams } from 'react-router';
import { UserContext } from '../components/UserContext';
import { Link } from 'react-router-dom';

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();
    useEffect(() => {
        console.log(id)
        fetch(`https://geeky-physio.onrender.com/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            });
        });
    }, [id]);
  
    if (!postInfo) return '';

    return (
        <div className='post-page'>
            <h1>{postInfo.title}</h1>
            <time>{format(new Date(postInfo.createdAt), 'd MMM yyyy')}</time>
            {
                userInfo.id === postInfo.author._id && (
                    <div className='edit-row'> 
                        <Link to={`/edit/${postInfo._id}`} className='edit-btn'>Edit Post</Link>
                    </div>
                )
            }
            <div className='image'>
                <img src={`https://geeky-physio.onrender.com/${postInfo.cover}`} alt=''/>
            </div>
            <div className='content' dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
        </div>
    )
}

export default PostPage