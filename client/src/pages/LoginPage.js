import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../components/UserContext';

const LoginPage = () => {
    const [user, setUser] = useState('');
    const [pw, setPw] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);
    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({user, pw}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });
        if (response.ok) {
            response.json().then(userInfo => {
                // setting user info for login
                setUserInfo(userInfo);
                setRedirect(true);
            });
        } else {
            alert('Wrong Credentials');
        }
    };
    if (redirect) {
        return <Navigate to={'/'}/>
    };
  return (
    <form className='login' onSubmit={login}>
        <h1>Login</h1>
        <input 
            type="text"
            placeholder='username'
            value={user}
            onChange={ev => setUser(ev.target.value)}
        />
        <input 
            type="text"
            placeholder='password'
            value={pw}
            onChange={ev => setPw(ev.target.value)}
        />
        <button>Login</button>
    </form>
  )
}

export default LoginPage