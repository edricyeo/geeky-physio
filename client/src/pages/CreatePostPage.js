import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { Editor } from '../components';


const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [files, setFiles] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function createPost(ev) {
        // send all the title, summary, image, content to api endpt
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
        const response = await fetch('https://geeky-physio.onrender.com/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        // redirect user if post uploaded successfully
        if (response.ok) {
            setRedirect(true);
        }
    };

    if (redirect) {
        return <Navigate to={'/'}/>
    }

    return (
        <form onSubmit={createPost}>
            <input 
                type="title" 
                placeholder={'Title'} 
                value={title} 
                onChange={ev => setTitle(ev.target.value)}
            />
            <input 
                type="summary" 
                placeholder={'Summary'}
                value={summary}
                onChange={ev => setSummary(ev.target.value)}
            />
            <input 
                type="file"
                onChange={ev => setFiles(ev.target.files)}
            />
            <Editor onChange={setContent} value={content}/>
            <button style={{marginTop:'5px'}}>Create Post</button>
        </form>
    )
}

export default CreatePostPage