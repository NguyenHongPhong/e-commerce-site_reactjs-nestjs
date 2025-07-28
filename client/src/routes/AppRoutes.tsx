import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../modules/home/HomePage";
import AboutPage from "../modules/about/AboutPage";
function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;