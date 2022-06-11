import React, { Component } from 'react'
import { BrowserRouter,HashRouter,Route,Routes} from 'react-router-dom' 

import Login from '../pages/Login/Login.jsx'
import Home from '../pages/Home/Home.jsx'
import Room from '../pages/Room/Room.jsx'
import AddRoom from '../pages/Room/AddRoom/AddRoom.jsx'
import Card from '../pages/Card/Card.jsx'
import Personal from '../pages/Personal/Personal.jsx'
import CardTool from '../pages/CardTool/CardTool.jsx'
import CardUpdate from '../pages/CardTool/CardUpdate/CardUpdate.jsx'
import BackStage from '../pages/BackStage/BackStage.jsx'
import RoomForm from '../pages/BackStage/RoomForm/RoomForm.jsx'
import UserForm from '../pages/BackStage/UserForm/UserForm.jsx'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            /**路由跳转 */
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Login />}/>
                        <Route path='home' element={<Home />}/>
                            <Route path="home/addroom" element={<AddRoom />}/>
                        <Route path="card" element={<Card />}/>
                        <Route path="room/:id" element={<Room />}/>
                        <Route path="cardtool" element={<CardTool />}/>
                        <Route path="cardupdate/:id" element={<CardUpdate />}/>
                        <Route path="personal/:account" element={<Personal />}/>
                        <Route path='backstage' element={<BackStage />} />
                        <Route path='backstage/room' element={<RoomForm/>} />
                        <Route path='backstage/user' element={<UserForm/>} />
                </Routes>
            </HashRouter>
        )
    } 
}
