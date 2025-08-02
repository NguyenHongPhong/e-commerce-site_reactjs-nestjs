import { useEffect, useState } from "react";
import axios from 'axios';
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
        <>{data}</>
    )
}

export default HomePage;