"use client";

import { createContext, useEffect, useReducer, ReactNode } from "react";

interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
    [key: string]: any;
}

interface State {
    user: User | null;
    isFetching: boolean;
    error: boolean;
}

const INITIAL_STATE: State = {
    user: null,
    isFetching: false,
    error: false,
};

// Check for localStorage only on client side
const getInitialState = (): State => {
    if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("user");
        return {
            user: savedUser ? JSON.parse(savedUser) : null,
            isFetching: false,
            error: false,
        };
    }
    return INITIAL_STATE;
};

export const AuthContext = createContext<{
    user: User | null;
    isFetching: boolean;
    error: boolean;
    dispatch: React.Dispatch<any>;
}>({
    ...INITIAL_STATE,
    dispatch: () => null,
});

const AuthReducer = (state: State, action: any): State => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE, getInitialState);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(state.user));
        }
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
