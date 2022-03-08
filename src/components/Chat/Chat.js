import React, { useState, useEffect } from 'react'
import queryString from 'query-string';
import io from "socket.io-client";
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
// import TextContainer from '../TextContainer/TextContainer';

let socket;

export default function Chat({ location }) {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    // const [userLocation, setUserLocation ] = useState({});
    // const [users, setUsers] = useState('');

    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);

        console.log(name, room);
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
            // setUserLocation(navigator.geolocation.getCurrentPosition());
        });

        // socket.on('roomData', ({ users }) => {
        //     setUsers(users);
        // });
    }, []);

   const sendMessage = (event) => {
       event.preventDefault();

       if(message){
        socket.emit('sendMessage', message, () => setMessage(''));
       } 
   }

   const sendLocation = (e) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            socket.emit('sendLocation', {
                lattitude: position.coords.latitude,
                longtitude: position.coords.longitude
            })
        });
   }

    return (
        <div className="outerCon1tainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                <button onClick={sendLocation}>Send Location</button>
            </div>
            {/* <TextContainer users={users} /> */}
        </div>
    );
}


