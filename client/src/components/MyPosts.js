import {useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';

/* This page shows to the authorized user all their posted code snippets and comments and gives them a chance to edit them. */

function MyPosts({id}) {
    const token = localStorage.getItem("auth_token");
    const [codes, setCodes] = useState([]);
    const [comments, setComments] = useState([]);
    const { t } = useTranslation();

    /* Find all user's posted codes from the database. */
    useEffect(() => {
        fetch("/codes")
        .then(response => response.json())
        .then(json => setCodes(json))
    }, [])
    // This makes a post method to the server to change the old code snippet to new one
    const editCode = (e,id) => {
        e.preventDefault();
        let updatedCode = codes.map((item) => {
            if(item._id===id) {
                fetch('/codes/editCode', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "authorization": "Bearer " + token
                    },
                    body: JSON.stringify({"id": id, "code": e.target[0].value}),
                    mode: "cors"
                })
                // These returns and setcodes changes the text value in the web page
                return {...item, code: e.target[0].value};
            }
            return item;
        });
        setCodes(updatedCode);

    };
    
    // This shows the codes and textareas+buttons to edit them on the webpage  
    const ownPosts = codes.map((code) => {
        if(code.user===id) {
            return (
                <>
                    <p> <i>{code.code}</i></p>
                    {t("Edit your code snippet")}:
                    <form onSubmit = {(e) => editCode(e,code._id)}>
                        <textarea id="code" rows="5" cols="35" placeholder={t("Write your edits here")}></textarea><br></br>
                        <input type="submit" id="submit" value={t("Submit")} />
                    </form>
                <p>***</p>
                </>
            )
        }
    })

    // **********************************

    // These three methods carry out same things to comments than those three below to codes
    useEffect(() => {
        fetch("/comments")
        .then(response => response.json())
        .then(json => setComments(json))
    }, [])

    const editComment = (e,id) => {
        e.preventDefault();
        let updatedComment = comments.map((item) => {
            if(item._id===id) {
                fetch('/comments/editComment', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "authorization": "Bearer " + token
                    },
                    body: JSON.stringify({"id": id, "comment": e.target[0].value}),
                    mode: "cors"
                })
                return {...item, comment: e.target[0].value};
            }
            return item;
        });
        setComments(updatedComment);

    };

    const ownComments = comments.map((comment) => {
        if(comment.user===id) {
            return (
                <>
                    <p><i>{comment.comment}</i></p>
                    {t("Edit your comment")}:
                <form onSubmit = {(e) => editComment(e,comment._id)}>
                        <textarea id="comment" rows="5" cols="35" placeholder={t("Write your edits here")}></textarea><br></br>
                        <input type="submit" id="submit" value={t("Submit")} />
                </form>
                <p> *** </p>
                </>
            )
        }
    })
    
    return (
        <div>
            <h3> {t("My posted code snippets")}: </h3>
            {ownPosts}
            <h3> {t("My posted comments")}: </h3>
            {ownComments}
        </div>
    )
}

export default function App({id}) {
    return (
        <Suspense fallback="loading">
            <MyPosts id={id} />
        </Suspense>
    )
}