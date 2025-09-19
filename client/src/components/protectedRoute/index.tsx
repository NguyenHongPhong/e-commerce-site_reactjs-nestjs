import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "hooks";
import { notify } from "@utils/toast";

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const isAuthenticated = !!useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (!isAuthenticated) {
            notify("You do not have permission to access", "error");
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
