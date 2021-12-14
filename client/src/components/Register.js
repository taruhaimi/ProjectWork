import {useState} from "react"
import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';

/* This the webpage for user to register.*/

function Register() {

    const [userData, setUserData] = useState({})

    const { t } = useTranslation();

    const registerUser = (e) => {

        e.preventDefault()

        /* When user submits their info, we add new user to the database. */
        fetch("/users/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
        window.location.href = "/login";

    }
    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }

    return (
        <div>
            <h1> {t("Register")} </h1>
            <form onSubmit={registerUser} onChange={handleChange}>
                <input type="email" id="email" placeholder={t("Email")}/>
                <input type="text" id="username" placeholder={t("Username")}/>
                <input type="password" id="password" placeholder={t("Password")} />
                <input type="submit" id="submit" value={t("Register")} />
            </form>
        </div>

    )
}


export default function App() {
    return (
        <Suspense fallback="loading">
            <Register />
        </Suspense>
    )
}