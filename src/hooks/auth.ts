import { useState, useEffect } from 'react';
import Router from 'next/router';

import axios from 'axios';
export function storeTokenInLocalStorage(token: string) {
    localStorage.setItem('token', token);
}

export function getTokenFromLocalStorage() {
    return localStorage.getItem('token');
}

export async function getAuthenticatedUser() {
    const defaultReturnObject = { authenticated: false, user: null };
    try {
        const token = getTokenFromLocalStorage();
        if (!token) {
            return defaultReturnObject;
        }
        const response = await axios({
            method: 'POST',
            url: '/getuser',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { authenticated = false } = response.data;
        return authenticated ? response.data : false;
    }
    catch (err) {
        console.log('getAuthenticatedUser, Something Went Wrong', err);
        return defaultReturnObject;
    }
}

export function useUser() {
    const [user, setUser] = useState(null);
    const [authenticated, setAutenticated] = useState(false);
    useEffect(() => {
        async function getUserDetails() {
            const { authenticated, user } = await getAuthenticatedUser();
            if (!authenticated) {
                Router.push("/login");
                return;
            }
            setUser(user);
            setAutenticated(authenticated);
        }
        getUserDetails();
    }, []);
    return { user, authenticated };
}