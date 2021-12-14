import AddComment from './AddComment'
import ShowComments from './ShowComments'
import {useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';
import FetchUsername from './FetchUsername';

/* This file fetches the posted code snippets from the database and shows them at home page.*/ 

function ShowCodeSnippets({jwt}) {
    const { t } = useTranslation();
    const [code, setCode] = useState([])

    /* Find posted codes from the database. */
    useEffect(() => {
        fetch("/codes")
        .then(response => response.json())
        .then(json => setCode(json))
    }, [])

    /* If user is logged in, they can add one like or dislike to the post */
    const addLike = (id) => {
        let updatedItems = code.map((item) => {
            if(item._id === id) {
                // Make a post to the server side that updates the like count in the database
                fetch('/codes/addLike', {
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
        setCode(updatedItems);
    };

    const disLike = (id) => {
        let updatedItems = code.map((item) => {
            if(item._id === id) {
                

                fetch('/codes/disLike', {
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
        setCode(updatedItems);
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

    /* Every codesnippet has its own array about who has written it, comments, likes and dislikes. Everyone can see them.
    Comments are shown or hidden by clicking a button.
    If user is logged in, they can also post new comments (<AddComment> is called) or vote once*/
    const codeList = code.map((item) => {
        return (
            <> 
                <p> <FetchUsername id={item.user}/>: {item.code} </p>
                <button id="likeBtn" onClick={() => {addLike(item._id)}}>❤️ {item.like} </button> <button id="dislikeBtn" onClick={() => {disLike(item._id)}}>💔 {item.dislike}</button> 
                <button onClick={() => showComments(item._id)}>{t("Show comments")}</button>
                <p> {jwt.jwt ? <AddComment code={item} jwt={jwt}/>: ""} </p> 
                {item.code_clicked ? <ShowComments id={item._id} jwt={jwt}/> : ""}
                <p> *** </p>
            </>
        )
            
        
    });

    return (
        <div><h2> {t("All Code Snippets")} </h2>
        {codeList} </div>
    )
}

export default function App({jwt}) {
    return (
        <Suspense fallback="loading">
            <ShowCodeSnippets jwt={jwt}/>
        </Suspense>
    )
}