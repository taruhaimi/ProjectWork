import {useState} from 'react'
import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';

/* This file adds a new comment to the code snippet */

function AddComment({code, jwt}) {
    const { t } = useTranslation();

    const [comment, setComment] = useState([]);

    /* Connection to server and database*/
    const addComment = (e) => {
        
        e.preventDefault()
        fetch("/comments", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "authorization": "Bearer " + jwt.jwt
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
                <input type="text" id="comment" placeholder={t("Enter your own comment here")}/>
                <input type="submit" id="commentBtn" value={t("Submit")} />
            </form>
        </div>
    )
}

export default function App({code, jwt}) {
    return (
        <Suspense fallback="loading">
            <AddComment code={code} jwt={jwt}/>
        </Suspense>
    )
}