import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';

/* This is the webpage for logging out fo the webpage. Also we delete the token from local storage so user can't be authorized anymore. */

function Logout({setToken}) {
    const { t } = useTranslation();
    setToken(null);
    localStorage.removeItem("auth_token");
    window.location.href="/";
    return (
        <div>{t("Logging out")}</div>
    )
}

export default function App({setToken}) {
    return (
        <Suspense fallback="loading">
            <Logout setToken={setToken}/>
        </Suspense>
    )
}