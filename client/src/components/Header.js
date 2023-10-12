import React, { useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext';
import {menu, close} from '../assets';

const Header = () => {
    const {setUserInfo, userInfo} = useContext(UserContext);
    const [toggle, setToggle] = useState(false);
    
    useEffect(() => {
        fetch('https://geeky-physio.onrender.com/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
            });
        });
    }, []);

    function logout() {
        fetch('https://geeky-physio.onrender.com/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    }

    const user = userInfo?.user;

  return (
    <header>
        <nav className='w-full mx-auto pb-2'>
            <Link to="/" 
            className="font-black lg:text-[55px] md:text-[50px] sm:text-[40px] text-[30px]
            self-center text-dark-blue">
                Geeky Physio
            </Link>

            <div className='hidden lg:block absolute top-10 right-10'>
                {user && (
                    <>
                        <Link className='text-white bg-[#3F72AF] hover:bg-dark-blue focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none cursor-pointer' 
                        to='/create'>Create Post</Link>
                        <a className='text-white bg-[#3F72AF] hover:bg-dark-blue focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none cursor-pointer' 
                        onClick={logout} href=''>Logout</a>
                    </>
                )}
                {!user && (
                    <>
                        <Link to='/login' className='text-white bg-[#3F72AF] hover:bg-dark-blue focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none cursor-pointer'>
                            Login
                        </Link>
                        <Link to='/register' className='text-white bg-[#3F72AF] hover:bg-dark-blue focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none cursor-pointer'>
                            Register
                        </Link>
                    </>
                )
                }
            </div>
            
            {/* for mobile app users */}
            <div className='block fixed top-4 right-5 sm:top-6 md:top-8 md:right-10 lg:hidden'>
                <img
                src = {toggle ? close : menu}
                alt = "menu"
                className='w-[28px] h-[28px] object-contain cursor-pointer justify-end'
                onClick = {() => setToggle(!toggle)}
                />

                <div className={`${!toggle ? 'hidden' : 'flex'} 
                p-6 black-gradient absolute top-20 right-0 
                mx-4 my-2 min-w[140] z-10 rounded-xl`}>
                    { user && (
                        <ul className='list-none flex justify-end items-start flex-col gap-4'>
                            <li>
                                <Link className='text-black cursor-pointer' 
                                to='/create' onClick={() => setToggle(!toggle)}>Create Post</Link>
                            </li>
                            <li>
                                <a className='text-black cursor-pointer' 
                                onClick={() => {
                                    logout();
                                    setToggle(!toggle);
                                }} href=''>Logout</a>
                            </li>
                        </ul>
                    )}
                    { !user && (
                        <ul className='list-none flex justify-end items-start flex-col gap-4'>
                            <li>
                                <Link className='text-black cursor-pointer' 
                                to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link className='text-black cursor-pointer' 
                                to='/register'>Register</Link>
                            </li>
                        </ul>
                    )}
                
                </div>
            </div>
            
            
        </nav>
      </header>
  )
}

export default Header