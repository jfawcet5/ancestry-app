//import React, { useState } from 'react';
import { useEffect } from 'react';
import logo from '../assets/test1.svg';
//import background from "../assets/background.png";

import { useAuthentication } from '../features/security/authContext';
import { useLoader } from '../features/async/loaderContext';
import { useNotification } from '../features/notification/notificationContext';
import { logout } from '../features/security/authentication';

const ENDPOINT = process.env.REACT_APP_API_URL;

function HomePage() {
    console.log("Open homepage");
    const { setUser, setToken } = useAuthentication();
    const { executeWithLoader } = useLoader();
    const { showError } = useNotification();

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    useEffect(() => {
        console.log("Home page");
        console.warn("----------");
        
        if (!code) {
            return;
        }
        //const state = params.get("state");
    
        if (!code) {
            console.log("No code provided");
            return;
        }
        //console.log("Auth0 Code: ", code);
    
        const verifier = sessionStorage.getItem("pkce_verifier");
        //sessionStorage.removeItem("pkce_verifier");
        //console.log("Using verifier: ", verifier);
    
        if (!verifier) {
            console.log("No verifier");
            return;
        }

        sessionStorage.removeItem("pkce_verifier");

        const authFlow = sessionStorage.getItem("authFlow");

        if (!authFlow) {
            return;
        }
    
        const reqBody = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code,
                codeVerifier: verifier,
                flow: authFlow
            })
        };
    
        // use api call here
        console.log("make api call for token exchange");
        //const requestPromise = fetch(`${ENDPOINT}/api/auth/exchange`, reqBody);
        const apiOperation = () => fetch(`${ENDPOINT}/api/auth/exchange`, reqBody);

        //requestPromise.then(res => res.json())
        executeWithLoader(apiOperation, "Authenticating...")
            .then(response => {
                //console.log("Api call returned");
                //console.log(response);
                return response.json();
            })
            .then(data => {
                //console.log("json response: ", JSON.stringify(data));
                console.log("APP TOKEN: ", data.token);
                const userData = JSON.parse(atob(data.token.split(".")[1]));
                setUser(userData); // Store user data in memory for later user (access control, refresh, etc.)
                setToken(data.token);
            })
            .catch(error => {
                console.error("Auth flow FAILED: ", error.message);
                console.log(error);
                showError({
                    title: "Login didn't work.",
                    message: "This can happen occasionally. Please try again in a few minutes."
                })
                logout();
            })
            .finally(() => {
                console.log("finally: reset auth state");
                sessionStorage.removeItem("pkce_verifier");
                sessionStorage.removeItem("authFlow");
                window.history.replaceState({}, "", process.env.REACT_APP_PUBLIC_URL);
            }
        );
    }, [setUser, setToken, code, showError, executeWithLoader]);

    return (
        <div>
            <h1>home</h1>
            <img src={logo} width="600" height="800" alt="logo"/>
        </div>
    );
}

export default HomePage;