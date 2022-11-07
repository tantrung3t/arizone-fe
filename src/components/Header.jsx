import { Footer, Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import Account from "./Account";
import Cart from "./Cart";
import { StoreContext } from "../store/store";
import { useState, useContext } from "react";
import './Header.css'



export default function Header(props) {
    const { user } = useContext(StoreContext)
    const handleSearch = (e) => {
        e.preventDefault()
        const dataSubmit = new FormData(e.currentTarget);
        console.log(dataSubmit.get('search-navbar'))
    }
    return (
        <Footer container={true} className="navbar">
            <Footer.Brand
                href="#"
                src="https://flowbite.com/docs/images/logo.svg"
                alt="Arizone Logo"
                name="Arizone"
            />
            <div>
                <Link to='/' className="text-base font-medium text-gray-900 dark:text-white hover:text-blue-600">
                    Trang chủ
                </Link>
            </div>
            <div>
                <Link to='/login' className="text-base font-medium text-gray-900 dark:text-white hover:text-blue-600">
                    Sản phẩm
                </Link>

            </div>
            <div>
                <Link to='/map' className="text-base font-medium text-gray-900 dark:text-white hover:text-blue-600">
                    Cửa hàng
                </Link>
            </div>
            <form className="search" onSubmit={handleSearch}>
                <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Search</span>
                </button>
                <div className="hidden relative md:block">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Search icon</span>
                    </div>
                    <input type="text" name="search-navbar" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                </div>
                <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                    <span className="sr-only">Open menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
            </form>
            <div className="header-cart">
                <Cart />
            </div>
            {user.full_name && user.permission
                ?
                <div className="header-account">
                    <Account data={user}></Account>
                </div>
                : <Link to="/login" className="header-account">
                    <p className="hover:text-blue-600">
                        Đăng nhập
                    </p>
                </Link>
            }
        </Footer>
    )
}