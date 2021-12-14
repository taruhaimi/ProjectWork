import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';

/* This is the webpage for logging out fo the webpage. Also we delete the token so user can't be authorized anymore. */

function Logout({jwt}) {
    const { t } = useTranslation();

    jwt = null;
    localStorage.removeItem("auth_token");
    window.location.href="/";
    return (
        <div>{t("Logging out")}</div>
    )
}

export default function App() {
    return (
        <Suspense fallback="loading">
            <Logout />
        </Suspense>
    )
}