import { Outlet } from "react-router";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

function MainLayout() {
    return (
        <>
            <Header></Header>
            <main>
                <Outlet />
            </main>
            <Footer></Footer>
        </>
    )
}

export default MainLayout;