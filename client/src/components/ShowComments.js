import {useState, useEffect} from 'react'
import React, {Suspense} from 'react';
import FetchUsername from './FetchUsername';

/* This file fetches all the comments to be showb below code snippets.*/ 

function ShowComments({id}) {
    const token = localStorage.getItem("auth_token"); //fetch token from local storage to identify user

    const [comment, setComment] = useState([])

    /* Tries to find, if there are comments made to the code snippet in the first place*/
    useEffect(() => {
        fetch("/comments")
        .then(response => response.json())
        .then(json => setComment(json))
    }, [])


    // This makes sure that the possible previous button click is carried out fully (= previous fetch and post are finished)
    // so user can't click like or dislike -buttons multiple times
    const [sending, setSending] = useState(false); 

    // If user is logged in, they can add one like or dislike to the comment 
    const addLike = async (id) => {
        let commentsCopy = [...comment];
        let item = commentsCopy.find((comment) => comment._id === id);
        if (!sending) {
            setSending(true);
            // Make a post to the server side that updates the like count in the database
            let response = await fetch("/comments/addLike", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({"id": id}),
                mode: "cors"
            }).then((response) => {
                if (response.status==200) {
                    // Updates the like count on the web page
                    item.like += 1;
                    setComment(commentsCopy);
                }
            })
        }
        setSending(false);
    };

    // Works like addLike()
    const disLike = async (id) => {
        let commentsCopy = [...comment];
        let item = commentsCopy.find((comment) => comment._id === id);
        if (!sending) {
            setSending(true);
            let response = await fetch("/comments/disLike", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({"id": id}),
                mode: "cors"
            }).then((response) => {
                if (response.status==200) {
                    item.dislike += 1;
                    setComment(commentsCopy);
                }
            })
        }
        setSending(false);
    };
    

    /* Returns comments and the users who has written them one by one for one post at time. */
    const commentList = comment.map((item) => {
        if(item.code===id) {
            return ( 
                <div> 
                    <p> <FetchUsername id={item.user} />: <i>{item.comment}</i> </p>
                    <button id="likeBtn"onClick={() => {addLike(item._id)}} >❤️ {item.like} </button> <button id="dislikeBtn" onClick={() => {disLike(item._id)}} >💔 {item.dislike}</button>
                </div>
            )
        } else {
            return <div></div>
        }
    });
    return (
        <div>{commentList} </div>
    )
}

export default function App({id}) {
    return (
        <Suspense fallback="loading">
            <ShowComments id={id}/>
        </Suspense>
    )
}