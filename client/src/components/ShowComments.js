import {useState, useEffect} from 'react'
import React, {Suspense} from 'react';
import FetchUsername from './FetchUsername';

/* This file fetches all the comments.*/ 

function ShowComments({id, jwt}) {

    const [comment, setComment] = useState([])

    /* Tries to find, if there are comments made in the first place*/
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
                            "authorization": "Bearer " + jwt.jwt
                        },
                        body: JSON.stringify({"id": id}),
                        mode: "cors"
                    })
                    // This return updates the like amount on the webpage but doesn't effect on the real like count
                    return {...item, like: item.like+1};
                }
                return item;
            });
            setComment(updatedItems);
        };
    
        const disLike = (id) => {
            let updatedItems = comment.map((item) => {
                if(item._id === id) {
                    
    
                    fetch('/comments/disLike', {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "authorization": "Bearer " + jwt.jwt
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

    /* Returns comments one by one for one post, if there are any matching based on code snippet's id. */
    const commentList = comment.map((item) => {
        if(item.code===id) {
            return ( 
                <div> 
                    <p> <FetchUsername id={item.user} />: {item.comment} </p>
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

export default function App({id, jwt}) {
    return (
        <Suspense fallback="loading">
            <ShowComments id={id} jwt={jwt}/>
        </Suspense>
    )
}