import React, { createContext, useState, useEffect } from "react";
import { auth } from '../Firebase/firebaseConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    const signIn = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const signOut = () => {
        return auth.signOut();
    };

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    };

    const updateEmail = (email) => {
        return currentUser.updateEmail(email);
    };

    const updatePassword = (password) => {
        return currentUser.updatePassword(password);
    };

    const value = {
        currentUser,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateEmail,
        updatePassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
