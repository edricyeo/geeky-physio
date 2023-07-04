import React from 'react'
import { useState } from 'react';

const RegisterPage = () => {
    const [user, setUser] = useState('');
    const [pw, setPw] = useState('');
    async function register(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({user, pw}),
            headers: {'Content-Type':'application/json'},
        })
        if (response.status === 200) {
            alert('Registration successful');
        } else {
            alert('Registration failed');
        }
    }
  return (
    <form className='register' onSubmit={register}>
        <h1>Register</h1>
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
        <button>Register</button>
    </form>
  )
}

export default RegisterPage