import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "hooks";
import { notify } from "@utils/toast";
import { useRef } from "react";

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const isAuthenticated = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.status);
    const messageRef = useRef(false);

    if (isLoading === "loading") {
        return <div>Loading......</div>;
    }


    useEffect(() => {
        if (!isAuthenticated && !messageRef.current) {
            notify("You do not have permission to access", "error");
            messageRef.current = true;
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
