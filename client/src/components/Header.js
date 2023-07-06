import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext';

const Header = () => {
    const {setUserInfo, userInfo} = useContext(UserContext);
    
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
            });
        });
    }, []);

    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    }

    const user = userInfo?.user;

  return (
    <header>
        <Link to="/" className="logo">Geeky Physio</Link>
        <nav>
            {user && (
                <>
                    <Link to='/create'>Create New Post</Link>
                    <a onClick={logout}>Logout</a>
                </>
            )}
            {/* {!user && (
                <>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </>
            )
            } */}
        </nav>
      </header>
  )
}

export default Header