import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home/HomePage";
import AboutPage from "../pages/about/AboutPage";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import RecoveryPassword from "../pages/recovery/RecoveryPassword";
import RecoverLayout from "../layouts/RecoverLayout";
import VerifyOTP from "../pages/recovery/VerifyOTP";
import ResetPassword from "../pages/recovery/ResetPassword";
import CreatePage from "@pages/category/CreatePage";
import ProductPage from "@pages/product/index";
import { AuthenticationUser } from "@components/protectedRoute/AuthenticationUser";
import { useDispatch } from "react-redux";
import { authenticated, unauthenticated } from "@reducers/auth";
import { useEffect } from "react";
import { useGetProfileQuery } from "@modules/auth/queries";
function AppRoutes() {

    const { data: profile, isLoading: isLoadingProfile, error: profileError } = useGetProfileQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        if (profile) {
            dispatch(authenticated(profile));
        }
    }, [profile]);

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<RecoverLayout />}>
                <Route path="/recovery-password" element={<RecoveryPassword />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            <Route path="/category/create" element={
                <AuthenticationUser>
                    <CreatePage />
                </AuthenticationUser>} />

            <Route path="/products/create"
                element={
                    <AuthenticationUser>
                        <ProductPage />
                    </AuthenticationUser>} />

            <Route path="/shopper/register"
                element={
                    <AuthenticationUser>
                        <ProductPage />
                    </AuthenticationUser>} />
        </Routes>
    )
}

export default AppRoutes;