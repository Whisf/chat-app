import React from 'react'
// import socket from 'socket.io-client/lib/socket';
import './Input.css';


function Input( { message, setMessage, sendMessage } ) {
    return (
        <form className="form">
            <input 
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(event) => {setMessage(event.target.value); console.log()}} 
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
        </form>
        
    )
}

export default Input;
