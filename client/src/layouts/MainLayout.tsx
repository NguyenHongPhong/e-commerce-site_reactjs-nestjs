import { Outlet } from "react-router";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import PromoSearchBar from "../components/searchBar/PromoSearchBar";

function MainLayout() {
    return (
        <>
            <Header></Header>
            <main>
                <PromoSearchBar />
                <Outlet />
            </main>
            <Footer></Footer>
        </>
    )
}

export default MainLayout;