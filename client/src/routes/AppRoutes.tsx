import { Routes, Route } from "react-router";
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

function AppRoutes() {
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

        </Routes>
    )
}

export default AppRoutes;