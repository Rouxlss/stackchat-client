import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { stackChatApi } from "../api";
import { AuthContext } from "../context";

export const UserActions = () => {
    const [actionsModal, setActionsModal] = useState(false);
    const [personalInformation, setPersonalInformation] = useState(null);
    const { logoutUser, user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            stackChatApi
                .get(`/users/personaInformation/${user._id}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    setPersonalInformation(res.data.personalInformation);
                    console.log(res.data.personalInformation);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [user]);

    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser();
        router.replace("/login");
    };

    return (
        personalInformation && (
            <div className="user-actions">
                <div className="profile-picture">
                    <img
                        src={personalInformation.profilePicture}
                        alt="profile"
                    />
                </div>
                <div className="user-actions__items">
                    <div
                        className="action"
                        onClickCapture={() => setActionsModal(true)}
                    >
                        <i className="fa-light fa-ellipsis"></i>
                    </div>
                    {actionsModal == true && (
                        <div className="action-modal">
                            <div
                                className="action-modal__item"
                                onClick={handleLogout}
                            >
                                Cerrar Sesión
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    );
};
