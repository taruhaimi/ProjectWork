import AddCodeSnippets from './AddCodeSnippets';
import ShowCodeSnippets from './ShowCodeSnippets';
import React, {Suspense} from 'react';

/* This is the home/front page of the whole page. In the home page user can see code snippets and comments.
Votes and for authorized users possibility for posting new code snippets and comments are also shown, but they are called in other files.*/ 

function Home() {
    const token = localStorage.getItem("auth_token");

    return (
        <div> 
            <p> {token ? <AddCodeSnippets /> : ""} </p>
            <ShowCodeSnippets />
        </div>
    )}


export default function App() {
    return (
        <Suspense fallback="loading">
            <Home />
        </Suspense>
    )
}