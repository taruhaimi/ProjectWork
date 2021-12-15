import {useState} from 'react'
import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';

/* This file adds new code snippet */

function AddCodeSnippets() {
    const [codeData, setCodeData] = useState("");
    const token = localStorage.getItem("auth_token");
    const { t } = useTranslation();

    /* Connection to server and database to save a new code snippet */
    const submitCode = (e) => {
        e.preventDefault()
        fetch("/codes", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "authorization": "Bearer " + token
            },
            body: JSON.stringify(codeData),
            mode: "cors"
        })
    }

    const handleChange = (e) => {
        setCodeData({...codeData, [e.target.id]: e.target.value})
    }

    return (
        <div>
            <h2> {t("Post your own code")}!</h2>
            <form onSubmit = {submitCode} onChange={handleChange}>
                <input type="text" id="code" placeholder={t("Enter your code here")}/>
                <input type="submit" id="submit" value={t("Submit")} />
            </form>
        </div>
    )
}

export default function App() {
    return (
        <Suspense fallback="loading">
            <AddCodeSnippets/>
        </Suspense>
    )
}