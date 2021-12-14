import AddCodeSnippets from './AddCodeSnippets';
import ShowCodeSnippets from './ShowCodeSnippets';
import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';

/* This is the home/front page of the whole page. 
In the home page user can see code snippets, and if logged in, post new code snippets and comment too.
They are fetched here from AddCodeSnippets.js (if user is logged in) and ShowCodeSnippets.js files. */ 

function Home({jwt}) {
    const { t } = useTranslation();

    return (
        <div> 
            <h1> {t("This is the front page")} </h1>
            <p> {jwt.jwt ? <AddCodeSnippets jwt={jwt}/> : ""} </p>
            <ShowCodeSnippets jwt={jwt}/>
        </div>
    )}


export default function App(jwt) {
    return (
        <Suspense fallback="loading">
            <Home jwt={jwt}/>
        </Suspense>
    )
}