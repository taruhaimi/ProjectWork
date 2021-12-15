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



    /* If user is logged in, they can add one like or dislike to the comment */
    const addLike = (id) => {
        let updatedItems = comment.map((item) => {
            if(item._id === id) {
                // Make a post to the server side that updates the like count in the database
                fetch('/comments/addLike', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "authorization": "Bearer " + token
                    },
                    body: JSON.stringify({"id": id}),
                    mode: "cors"
                })
                /* These returns and setcomment() update the like count on the webpage (=user can click like button multiple times and the like count increases on the page) 
                but it doesn't effect on the real like count */
                return {...item, like: item.like+1};
            }
            return item;
        });
        setComment(updatedItems);
    };
    
    // Works like addLike()
    const disLike = (id) => {
        let updatedItems = comment.map((item) => {
            if(item._id === id) {
                

                fetch('/comments/disLike', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "authorization": "Bearer " + token
                    },
                    body: JSON.stringify({"id": id}),
                    mode: "cors"
                })

                return {...item, dislike: item.dislike+1};
            }
            return item;
        });
        setComment(updatedItems);
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