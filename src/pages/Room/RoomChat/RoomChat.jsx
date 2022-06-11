import React, { Component, useState, useRef, useCallback, useLayoutEffect } from 'react';
import {
    Input,
    Button,
    Row,
    Col
} from 'antd'
import Local from '../../../utils/storage.js';
import MessageWindow from '../../../components/Chat/MessageWindow/MessageWindow.jsx';
import TextBar from '../../../components/Chat/TextBar/TextBar.jsx';
import { send, close, registerOnMessageCallback, startWebsocketConnection } from '../../../utils/websocket.js';
import { getChat } from '../../../services/chat.js';
import style from './RoomChat.module.less';

export class RoomChat extends Component {
    constructor (props) {
        super(props)
        startWebsocketConnection()
        const loggedInUser = Local.getLocal('curUser')
        this.state = {
            messages: [],
            username: loggedInUser.account
        }
        registerOnMessageCallback(this.onMessageReceived.bind(this))

    }

    onMessageReceived (msg) {
        msg = JSON.parse(msg);
        console.log('msg',msg);
        this.setState({
            messages: this.state.messages.concat(msg)
        })
    }

    setUserName (name) {
        this.setState({
            username: name
        })
    }
    
    sendMessage (text) {
        const message = {
            username: this.state.username,
            text: text
        }
        send(JSON.stringify(message))
    }
    
    render () {
        const setUserName = this.setUserName.bind(this)
        const sendMessage = this.sendMessage.bind(this)
        return (
            <div className={style.container}>
                <MessageWindow messages={this.state.messages} username={this.state.username} />
                <TextBar onSend={sendMessage} />
            </div>
        )
    }
}

export default RoomChat;