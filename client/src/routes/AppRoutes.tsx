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
import ProductPage from "@pages/product/index";
import { AuthenticationUser } from "@components/protectedRoute/AuthenticationUser";
import { useDispatch } from "react-redux";
import { authenticated, unauthenticated } from "@reducers/auth";
import { useEffect } from "react";
import { useGetProfileQuery } from "@modules/auth/queries";
import ShopperLayout from "@layouts/ShopperLayout";
import { RegisterShpperPage } from "@pages/shopper/register";
function AppRoutes() {
    const { data: profile, error, isError, isLoading } = useGetProfileQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            dispatch(unauthenticated());
        }
    }, [isError]);

    useEffect(() => {
        if (profile) {
            dispatch(authenticated(profile));
        }
    }, [profile]);

    return (
        <Routes>
            {/* Public routes */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
            </Route>

            {/* Auth routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Recovery routes */}
            <Route element={<RecoverLayout />}>
                <Route path="/recovery-password" element={<RecoveryPassword />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Shopper routes */}
            <Route
                path="/shopper"
                element={
                    <AuthenticationUser>
                        <ShopperLayout />
                    </AuthenticationUser>
                }
            >

                <Route path="register" element={<RegisterShpperPage />} />


                {/* Product routes */}
                <Route path="product">
                    {/* <Route index element={<ProductList />} /> */}
                    <Route path="create" element={<ProductPage />} />
                    {/* <Route path="edit/:id" element={<ProductEdit />} /> */}
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRoutes;
