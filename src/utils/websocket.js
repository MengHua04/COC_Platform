import Local from './storage.js'

const loggedInUser = Local.getLocal('curUser');

export let send
export let close

let onMessageCallback

export const startWebsocketConnection = () => {
    const ws = new window.WebSocket(`ws://localhost:8082/chat-room/${loggedInUser.account}`)

    ws.onopen = () => {
        console.log('连接成功')
    }

    ws.onclose = (e) => {
        console.log('关闭连接: ', e.code, e.reason)
    }

    ws.onmessage = (e) => {
        onMessageCallback && onMessageCallback(e.data)
    }

    window.onbeforeunload = function () {
        websocket.close();
    }

    send = ws.send.bind(ws)
    close = ws.close.bind(ws)
}

export const registerOnMessageCallback = (fn) => {
    onMessageCallback = fn
}