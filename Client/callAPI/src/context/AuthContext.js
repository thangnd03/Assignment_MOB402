import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import {API_URL_USER } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading,setSplashLoading] = useState(false);

    const logout = () =>{
        setIsLoading(true);
        axios.get(`${API_URL_USER}/logout`,{
            headers:{Authorization: `Bearer ${userInfo.token}`}
        }).then(res => {
            AsyncStorage.removeItem('userInfo');
            setUserInfo({});
            setIsLoading(false)
        }).catch(e => {
            setIsLoading(false)
            console.log(`logout error ${e}`);
        })
    }

    const register = (email, pass, name, image) => {
        setIsLoading(true);
        axios.post(`${API_URL_USER}/reg`, {
            email,pass,image,name
        }).then(res => {
            let user = res.data;
            console.log(user.imageUrl);
            setUserInfo(user);
            AsyncStorage.setItem('userInfo', JSON.stringify(user));
            setIsLoading(false);
            console.log(userInfo);
        }).catch(error => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const login = (email,pass) => {
        setIsLoading(true);

        axios.post(`${API_URL_USER}/login`,{
            email,pass
        }).then(res => {

             let user = res.data;
            setUserInfo(user);
            AsyncStorage.setItem('userInfo',JSON.stringify(user));
            setIsLoading(false);
        }).catch(error => {console.log(error);setIsLoading(false)})
    }

    const isLoggedIn =async () => {
        try {
            setSplashLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo= JSON.parse(userInfo);

            if(userInfo){
                setUserInfo(userInfo);
            }
            setSplashLoading(false);
        } catch (error) {
            setSplashLoading(false);
            console.log(`is logged in error ${error}`);
        }
    };

    useEffect(() =>{
        isLoggedIn();
    },[]);

    return (
        <AuthContext.Provider value={{
            isLoading,
            userInfo,
            splashLoading,
            register,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

