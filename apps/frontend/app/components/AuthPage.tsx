"use client"

import axios from "axios";
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
export function AuthPage({isSignin} : {
    isSignin: boolean
}){
    // const navigate = useNavigate();
    const usernameref = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);
    async function login () {
        const username = usernameref.current?.value;
        const password = passwordref.current?.value;
        const url = isSignin ? "signin" : "signup"
        const response = await axios.post(`${BACKEND_URL}/${url}`,{
            data:{
                username,
                password
            }
        })
    
    const jwt = response.data.token;
    if(jwt){
    alert("You are " + url);
    localStorage.setItem('token', jwt);
    }
    // navigate('/page');

    }

    return <div className="w-screen h-screen flex justify-center items-center">
            <div className="p-2 m-2 bg-amber-600 rounded">
                <div className="p-4">
                <input type="text" ref={usernameref} placeholder="Email"></input>
                </div>
                <div className="p-4">
                <input type="password" ref={passwordref} placeholder="Password"></input>
                </div>
                <div className="pt-2 flex items-center justify-center">
                <button onClick={login}>
                    {isSignin ? "Sign In" : "Sign Up"}
                </button>
                </div>
            </div>
    </div>
}