import AddComment from './AddComment'
import ShowComments from './ShowComments'
import {useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';
import FetchUsername from './FetchUsername';


/* This file fetches the posted code snippets from the database and shows them at home page.*/ 

function ShowCodeSnippets() {
    const { t } = useTranslation();
    const token = localStorage.getItem("auth_token"); //fetch token from local storage to identify user
    const [code, setCode] = useState([])

    /* Find posted codes from the database. */
    useEffect(() => {
        fetch("/codes")
        .then(response => response.json())
        .then(json => setCode(json))
    }, [])


    // This makes sure that the possible previous button click is carried out fully (= previous fetch and post are finished)
    // so user can't click like or dislike -buttons multiple times
    const [sending, setSending] = useState(false); 

    // If user is logged in, they can add one like or dislike to the post 
    const addLike = async (id) => {
        let codesCopy = [...code];
        let item = codesCopy.find((code) => code._id === id);
        if (!sending) {
            setSending(true);
            // Make a post to the server side that updates the like count in the database
            let response = await fetch("/codes/addLike", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({"id": id}),
                mode: "cors"
            }).then((response) => {
                if (response.status===200) {
                    // Updates the like count on the web page
                    item.like += 1;
                    setCode(codesCopy);
                }
            })
        }
        setSending(false);

    };

    // Works like addLike()
    const disLike = async (id) => {
        let codesCopy = [...code];
        let item = codesCopy.find((code) => code._id === id);
        if (!sending) {
            setSending(true);
            // Make a post to the server side that updates the like count in the database
            let response = await fetch("/codes/disLike", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({"id": id}),
                mode: "cors"
            }).then((response) => {
                if (response.status===200) {
                    // Updates the like count on the web page
                    item.dislike += 1;
                    setCode(codesCopy);
                }
            })
        }
        setSending(false);

    };

    /* Function for changing if the comments are shown or not at frontpage. 
    Visibility of comments has been carried out with boolean attribute "clicked" in the comment-database.*/
    const showComments = (id) => {
        let clickedCodes = code.map((code) => {
            if(code._id === id) {
                return {...code, code_clicked: !code.code_clicked};
            }
            return code;
        });
        setCode(clickedCodes);
    }

    /* Every codesnippet has its own array about who has written it, its comments, likes and dislikes. Everyone can see them.
    Comments are shown or hidden by clicking a button (showComments()).
    If user is logged in, they can also post new comments (<AddComment> is called) or vote once*/
    const codeList = code.map((item) => {
        return (
            <div id="code-area"> 
                <p > <FetchUsername id={item.user}/>: <i>{item.code}</i> </p>
                <button id="likeBtn" onClick={() => {addLike(item._id)}}>❤️ {item.like} </button> <button id="dislikeBtn" onClick={() => {disLike(item._id)}}>💔 {item.dislike} </button> 
                <button onClick={() => showComments(item._id)}>{t("Show comments")}</button>
                <p> {token ? <AddComment code={item} />: ""} </p> 
                {item.code_clicked ? <ShowComments id={item._id} /> : ""}
            </div>
        )
            
        
    });

    return (
        <div><h2 id="show-code-title"> {t("All Code Snippets")} </h2>
        {codeList} </div>
    )
}

export default function App() {
    return (
        <Suspense fallback="loading">
            <ShowCodeSnippets />
        </Suspense>
    )
}