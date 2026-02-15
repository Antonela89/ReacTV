import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/Firebase'

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('No hay Auth Provider');
    return context;
}

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const login = async (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth);
    const loginWithGoogle = () => {
        const GoogleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, GoogleProvider);
    }

    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
    }

    useEffect (() => {
        // console.log('auth provider loaded');
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuth(!!currentUser); // Actualiza el estado de autenticación
            setLoading(false);
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = {
        isAuth,
        setIsAuth,
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword
    };

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
}