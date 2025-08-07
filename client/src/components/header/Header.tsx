import { Link } from "react-router"
function Header() {
    return (<header>
        <div className="@container">
            <div className="flex justify-between">
                <Link to="/" className="grow flex items-center">
                    <div className="flex items-center">
                        <img className="w-8 h-8 mr-2.5" src="../../../public/logo/icon.svg" alt="Logo" />
                        <div className="w-36 h-8 text-gray-900 text-xl font-bold font-['Gordita'] leading-loose">E-commerce</div>
                    </div></Link>
                <nav className="text-lg grow flex justify-between items-center">
                    <Link to="/">Home</Link>
                    <Link to="/categories">Categories</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
                <div className="flex items-center grow justify-end">
                    <Link to="/login" className="mr-5 text-gray-900 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-7">Log in</Link>
                    <Link to="/register" className="w-28 h-12 bg-gray-900 rounded-md flex justify-center items-center hover:opacity-85">
                        <span className="text-white">Sign up</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>)
}

export default Header;