import React, { useContext } from "react";
import { Chats } from "../../components/Chats";
import { ChatWindow } from "../../components/ChatWindow";
import { Loading } from "../../components/Loading";
import { useRouter } from "next/router";

import { AuthContext } from "../../context/";
import { useEffect } from "react";
import { useState } from "react";

const MessagesPage = () => {
    const router = useRouter();

    const { user, isLoggedIn, isLoading } = useContext(AuthContext);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (user) {
            setUserId(user.id);
        }
    }, [user]);

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push("/login");
        }
    }, [isLoading]);

    return (
        <>
            <div className="banner"></div>
            {(isLoading && (
                <Loading/>
            )) || (
                <div className="messages-section">
                    <Chats userId={userId} />
                    <ChatWindow />
                </div>
            )}
        </>
    );
};

export default MessagesPage;
