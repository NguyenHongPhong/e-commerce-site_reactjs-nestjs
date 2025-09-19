import PromoSearchBar from "../../components/searchBar/PromoSearchBar";
import Slider from "../../components/slider/Slider";
import Categories from "../../sections/home/Categories";
import FadeInSection from "@components/fadeInSection/FadeInSection";
import FlashSales from "@sections/home/FlashSales";
import TopSearch from "@sections/home/TopSearch";
import Recommendation from "@sections/home/Recommendation";
function HomePage() {
    return (
        <>
            <PromoSearchBar />
            <Slider />
            <FadeInSection children={<Categories />} />
            <FadeInSection children={<FlashSales />} />
            <FadeInSection children={<TopSearch />} />
            <FadeInSection children={<Recommendation />} />
        </>
    )
}

export default HomePage;