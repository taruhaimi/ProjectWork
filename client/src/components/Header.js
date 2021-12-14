import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';

/* This is a navigation menu in the top of every page */

function Header({jwt}) {

    /* To change language in the web page*/
    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <div>
                <Button color="inherit" component={RouterLink} to="/">{t("Home")}</Button>
                <Button color="inherit" component={RouterLink} to="/register">{t("Register")}</Button>
                <Button color="inherit" component={RouterLink} to="/login">{t("Login")}</Button>
                <Button color="inherit" component={RouterLink} to="/logout">{t("Logout")}</Button>
                <Button color="inherit" component={RouterLink} to="/tutorials">{t("Tutorials")}</Button>
                <Button id = "fi" color="inherit" onClick={()=> changeLanguage("fi")}>FI</Button>
                <Button id = "en" color="inherit" onClick={()=> changeLanguage("en")}>EN</Button>
            </div>
            </Toolbar> 
        </AppBar>
    </Box>
    )
}

export default function App() {
    return (
        <Suspense fallback="loading">
            <Header />
        </Suspense>
    )
}