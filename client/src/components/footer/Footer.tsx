import { Link } from "react-router"
function Footer() {
    return (<footer>
        <div className="@container">
            <div className="flex justify-between">
                <div>
                    <Link to="/" className="grow flex items-center">
                        <div className="flex items-center">
                            <img className="w-8 h-8 mr-2.5" src="../../../public/logo/icon.svg" alt="Logo" />
                            <div className="w-36 h-8 text-gray-900 text-xl font-bold font-['Gordita'] leading-loose">E-commerce</div>
                        </div></Link>
                    <div className="mt-5 text-center text-sm text-gray-500 border-t pt-4">
                        © {new Date().getFullYear()} MyShop. All rights reserved.
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-2">Quick Links</h4>
                    <ul className="space-y-1">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/shop" className="hover:underline">Shop</a></li>
                        <li><a href="/categories" className="hover:underline">Categories</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-2">Customer Service</h4>
                    <ul className="space-y-1">
                        <li><a href="/faq" className="hover:underline">FAQ</a></li>
                        <li><a href="/returns" className="hover:underline">Returns</a></li>
                        <li><a href="/shipping" className="hover:underline">Shipping</a></li>
                        <li><a href="/support" className="hover:underline">Support</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-2">Company</h4>
                    <ul className="space-y-1">
                        <li><a href="/privacy" className="hover:underline">Privacy</a></li>
                        <li><a href="/terms" className="hover:underline">Terms</a></li>
                        <li><a href="/security" className="hover:underline">Security</a></li>
                        <li><a href="/cookies" className="hover:underline">Cookies</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-2">Stay Connected</h4>
                    <form className="mb-4">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full px-3 py-2 border rounded mb-2"
                        />
                        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            Subscribe
                        </button>
                    </form>
                    <div className="flex space-x-4">
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-linkedin"></i>
                        <i className="fa-brands fa-square-x-twitter">Bug in here</i>
                    </div>
                </div>
            </div>
        </div>
    </footer>)
}

export default Footer;