import React, { FC } from 'react'

interface ChatWindowProps {
    user_chat_id: string | null;
}

export const ChatWindow: FC<ChatWindowProps> = ({ user_chat_id = null }) => {
    return (
        <div className="chatWindow">
            {
                user_chat_id && (
                    <div className="chatWindow__header">
                        <div className="chatWindow__header__left">
                            <div className="chatWindow__header__left__avatar">
                                <img src="https://i.pravatar.cc/300" alt="avatar" />
                            </div>
                            <div className="chatWindow__header__left__info">
                                <div className="chatWindow__header__left__info__name">
                                    <b>John Doe</b>
                                </div>
                                <div className="chatWindow__header__left__info__status">
                                    <span className="chatWindow__header__left__info__status__online">Online</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) || (
                    <div className="stackchat-logo-section">
                        <div className="logo-section__img">
                            <img src="/stackchat.png" alt="avatar" />
                        </div>
                        <div className="logo-section__text">Start chating!</div>
                    </div>
                )
            }
        </div>
    )
}

