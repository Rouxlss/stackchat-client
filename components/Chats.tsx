import React from 'react'
import { useState, useEffect } from 'react';
import { stackChatApi } from '../api';
import { UserActions } from "../components/UserActions";


export interface Chat {
    _id: string;
    lastMessage: LastMessage;
    name: string;
    profileImage: string;
    number: number;
    country_code: string;
}

export interface LastMessage {
    message: string;
    type: string;
    state: string;
    date: Date;
    time: string;
    ago: string;
    diff: number;
    senderId: string;
    deletedBy: string;
}

export const Chats = ({userId = null}) => {

    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        console.log(userId)
    }, [userId])

    useEffect(() => {

        stackChatApi.get('/messages/getRecientChats', {withCredentials: true}).then(res => {
            console.log(res.data.data);
            setChats(res.data.data);
        }).catch(err => {
            console.log(err);
        });

    }, [])

    return (
        <>
            <div className="sidebarChats">
                {
                    chats.length == 0 && (
                        <p>Cargando...</p>
                    ) || (
                        <>
                            <UserActions/>
                            <div className="search"></div>
                            <ul className='chats'>
                                {
                                    chats.map((chat, index, array) => (
                                        <li key={chat._id}>
                                            <div className="chat__profile-picture">
                                                <img src={chat.profileImage} alt="" />
                                            </div>
                                            <div className="chat__body">
                                                <b className='chat__name' >{chat.name}</b>
                                                {/* <b className='chat__name' >{chat.country_code + " " + chat.number}</b> */}
                                                {
                                                    chat.lastMessage.state == 'sent' && (
                                                        chat.lastMessage.type === 'text' && (
                                                            <div className='chat__message'>
                                                                {
                                                                    chat.lastMessage.senderId === userId && (
                                                                        <i className="fa-light fa-check-double"></i>
                                                                    )
                                                                }
                                                                <p>{chat.lastMessage.message}</p>
                                                            </div>
                                                        ) || (
                                                            <p className='chat__message'>
                                                                {
                                                                    chat.lastMessage.type === 'image' && (
                                                                        <>
                                                                            <i className="fa-solid fa-camera"></i> Photo
                                                                        </>
                                                                    )
                                                                }
                                                                {
                                                                    chat.lastMessage.type === 'video' && (
                                                                        <>
                                                                            <i className="fa-solid fa-video"></i> Video
                                                                        </>
                                                                    )
                                                                }
                                                            </p>
                                                        )
                                                    )
                                                }
                                                {
                                                    chat.lastMessage.state == 'deletedForEveryone' && (
                                                        <p className='chat__message'>
                                                            {chat.lastMessage.deletedBy === userId && (
                                                                <>
                                                                    <i className="fa-light fa-ban"></i> Eliminaste este mensaje.
                                                                </>
                                                            ) || (
                                                                    <>
                                                                        <i className="fa-light fa-ban"></i> Mensaje eliminado.
                                                                    </>

                                                                )
                                                            }
                                                        </p>
                                                    )
                                                }

                                            </div>
                                            <div className="chat__info">
                                                {
                                                    new Date(chat.lastMessage.date) < new Date && (
                                                        <p>
                                                            {chat.lastMessage.diff == 0 && (
                                                                <span>{chat.lastMessage.time}</span>
                                                            )}
                                                            {chat.lastMessage.diff > 7 && (
                                                                <span>{chat.lastMessage.date}</span>
                                                            )}
                                                            {chat.lastMessage.diff <= 7 && chat.lastMessage.diff > 0 && (
                                                                <span>{chat.lastMessage.ago}</span>
                                                            )}
                                                        </p>
                                                    ) || (
                                                        <p>{chat.lastMessage.time}</p>
                                                    )
                                                }
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </>
                    )
                }
            </div>
        </>
    )
}
