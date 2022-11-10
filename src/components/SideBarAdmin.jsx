import { Link } from 'react-router-dom'
import logo from '../image/logo.svg'
export default function SideBarAdmin(props) {
    const handleLogOut = () => {
        localStorage.clear()
        window.location.replace("/")
    }
    return (
        <div>
            <aside className="w-64 admin-sidebar" aria-label="Sidebar">
                <div className='admin-account'>
                    <img
                        src={logo}
                        alt="Flowbite Logo"
                    />
                    <h1 className='text-2xl font-bold text-gray-600 dark:text-white'>
                        ADMIN
                    </h1>
                </div>
                <div className="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
                    <ul className="space-y-2">
                        <li>
                            <Link to="/admin" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>

                                {props.AdminDashboard
                                    ? <span className="ml-3 font-bold text-gray-600 dark:text-white">Dashboard</span>
                                    : <span className="ml-3">Dashboard</span>
                                }
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/user" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                {props.AdminUser
                                    ? <span className="ml-3 font-bold text-gray-600 dark:text-white">Tài khoản</span>
                                    : <span className="flex-1 ml-3 whitespace-nowrap">Tài khoản</span>
                                }
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/product" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                {props.AdminProduct
                                    ? <span className="ml-3 font-bold text-gray-600 dark:text-white">Sản phẩm</span>
                                    : <span className="flex-1 ml-3 whitespace-nowrap">Sản phẩm</span>
                                }
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogOut} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Đăng xuất</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}