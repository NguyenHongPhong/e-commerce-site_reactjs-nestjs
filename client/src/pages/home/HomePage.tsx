import { useEffect, useState } from "react";
import axios from 'axios';
import PromoSearchBar from "../../components/searchBar/PromoSearchBar";
import Slider from "../../components/slider/Slider";
const apiUrl = import.meta.env.VITE_API_URL;

function HomePage() {
    const [data, setData] = useState();
    useEffect(() => {
        axios.get(`${apiUrl}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.error(err));
    }, []);
    return (
        <>
            <PromoSearchBar />
            <Slider />
            {data}
        </>
    )
}

export default HomePage;