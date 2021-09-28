import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from '../components/navbar/Navbar'
import Dashboard from '../pages/dashboard/Dashboard'
import Login from "../pages/login/Login"
import Register from "../pages/register/Register"
import Detail from '../pages/detail/Detail'
import  NotFound  from "../pages/notfound/NotFound"
import Profile from "../pages/profile/Profile"
import AddPost from "../pages/addpost/AddPost"
import UpdatePost from "../pages/updatepost/UpdatePost"
import Chat from "../pages/chat/Chat"

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

const AppRouter = () => {
    return (
        <BrowserRouter>

            <Navbar />

            <Switch>

                <PublicRoute restricted={false} component={Dashboard} path="/" exact />
                <PublicRoute restricted={false} component={Dashboard} path="/dashboard" exact />
                <PublicRoute restricted={false} component={Detail} path="/detail/:id" exact />
                <PublicRoute restricted={true} component={Login} path="/login" exact />
                <PublicRoute restricted={true} component={Register} path="/register" exact />

                <PrivateRoute component={Profile} path="/profile" exact />
                <PrivateRoute component={AddPost} path="/addpost" exact />
                <PrivateRoute component={UpdatePost} path="/updatepost/:id" exact />
                <PrivateRoute component={Chat} path="/chat" exact />
                
                <Route path="" component={NotFound}/>

            </Switch>

        </BrowserRouter>
    )
}

export default AppRouter
