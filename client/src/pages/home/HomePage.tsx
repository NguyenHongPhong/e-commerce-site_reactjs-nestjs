import { useEffect, useState } from "react";
import axios from 'axios';
import PromoSearchBar from "../../components/searchBar/PromoSearchBar";
import Slider from "../../components/slider/Slider";


function HomePage() {
    return (
        <>
            <PromoSearchBar />
            <Slider />

        </>
    )
}

export default HomePage;