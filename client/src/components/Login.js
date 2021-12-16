import {useState} from 'react'
import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';
 
/* This is the login page for user to authorize to the page. */

function Login({setUser, setToken}) {
    const [userData, setUserData] = useState({})
    const { t } = useTranslation();

    const login = (e) => {
        e.preventDefault()

        /* When user tries to log in, this fetch tries to find them from the database. 
        If the user is found, the token is returned from the server and stored to the local storage. 
        With that token we check in the "subpages" if the user is authorized or not. */
        
        fetch("/users/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                if(data.token) {
                    setUser(JSON.parse(Buffer.from(data.token.split(".")[1], "base64").toString()))
                    localStorage.setItem("auth_token", data.token);
                    setToken(data.token)
                    window.location.href = "/";
                }
            })

    }


    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }

    return (
        <div>
            <h2>{t("Login")}</h2> 
            <form onSubmit={login} onChange={handleChange}>
                <input type="email" id="email" placeholder={t("Email")}/>
                <input type="password" id="password" placeholder={t("Password")}/>
                <input type="submit" value={t("Login")}/>
            </form>
        </div>
    )

}

export default function App({setUser, setToken}) {
    return (
        <Suspense fallback="loading">
            <Login setUser={setUser} setToken={setToken} />
        </Suspense>
    )
}