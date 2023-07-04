import React from 'react'
import { Outlet } from 'react-router'
import {Header} from './'

const Layout = () => {
  return (
    <main>
        <Header/>
        <Outlet/>
    </main>
  )
}

export default Layout