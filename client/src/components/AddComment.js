import {useState} from 'react'
import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';

/* This file adds a new comment to one code snippet */

function AddComment({code}) {
    const { t } = useTranslation();
    const token = localStorage.getItem("auth_token");

    const [comment, setComment] = useState([]);

    /* Connection to server and database to save a new comment */
    const addComment = (e) => {
        e.preventDefault()
        fetch("/comments", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "authorization": "Bearer " + token
            },
            body: JSON.stringify({
                comment: comment.comment,
                code: code._id
            }),
            mode: "cors"
        })

    }

    const handleChange = (e) => {
        setComment({...comment, [e.target.id]: e.target.value})
    }
    
    return (
        <div>
            <form onSubmit = {addComment} onChange={handleChange}>
                <textarea id="comment" rows="3" cols="35" placeholder={t("Enter your own comment here")}></textarea><br></br>
                <input type="submit" id="commentBtn" value={t("Submit")} />
            </form>
        </div>
    )
}

export default function App({code}) {
    return (
        <Suspense fallback="loading">
            <AddComment code={code}/>
        </Suspense>
    )
}