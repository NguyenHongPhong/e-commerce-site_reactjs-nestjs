import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

function MainLayout() {
    return (
        <div className="@container">
            <Header></Header>
            <main>
                <Outlet />
            </main>
            <Footer></Footer>
        </div>
    )
}

export default MainLayout;