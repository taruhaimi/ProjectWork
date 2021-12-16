import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';


/* This is "user manual" for what features can be found from the webpage*/ 

function Tutorials() {
    const { t } = useTranslation();

    return (
        <div>
            <h2> {t("Here are the tutorials for usage of this web page")}</h2>
            <h4> {t("Non-registered user can")}</h4>
                <ul>
                    <li> {t("read other users' code snippets")} </li>
                    <li> {t("read other users' comments on code snippets")} </li>
                    <li> {t("see votes on code snippets and comments")}</li>
                    <li> {t("change language (Finnish or English)")}</li>
                </ul>
            <h4> {t("When user is registered and logged in, they can in addition")} </h4>
            <ul>
                <li> {t("post their own code snippets")} </li>
                <li> {t("comment on other users' code snippets")} </li>
                <li> {t("vote code snippets and comments (like or dislike once)")} </li>
                <li> {t("edit your own code snippets and comments")} </li>
            </ul>
            <h4> {t("Notes for registering and logging in")}! </h4>
            <ul>
                <li> {t("If there happens some errors when registering or logging in (e.g. your email already exists, password is not strong enough or wrong credentials are written, these error messages are shown in the console but not in the webpage")}!</li>
                <li> {t("You know that your registering/logging in has been succesful, when")}: </li>
                <ul>
                    <li> {t("After registering you are redirected to the login-page")}</li>
                    <li> {t("After logging in the navigation bar shows options 'logout' and 'my posts' instead 'register' and 'login'")}</li>
                </ul>
            </ul>
            <h4> {t("Note about new code snippets, comments and votes")}!</h4>
            <ul>
                <li> {t("Changes are visible on the web pages when the page is refreshed")}</li>
            </ul>
            <h4> {t("Thank you for using this web page")}! :) </h4>
        
        </div>
    )
}

export default function App() {
    return (
        <Suspense fallback="loading">
            <Tutorials />
        </Suspense>
    )
}