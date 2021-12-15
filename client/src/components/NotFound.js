import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';

/* This is a page to be shown if user tries to go to page that doesn't exist*/

function NotFound() {
    const { t } = useTranslation();

    return (
        <h2> 404: {t("This is page does not exist")} :( </h2>
    )
}

export default function App() {
    return (
        <Suspense fallback="loading">
            <NotFound />
        </Suspense>
    )
}