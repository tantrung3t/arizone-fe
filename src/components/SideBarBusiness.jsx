import { Link } from 'react-router-dom'
import logo from '../image/logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import { fetchToken, onMessageListener } from '../firebase';
import { useState } from 'react';

export default function SideBarBusiness(props) {
    const handleLogOut = () => {
        localStorage.clear()
        window.location.replace("/")
    }

    const [isTokenFound, setTokenFound] = useState(false);
    fetchToken(setTokenFound);
    onMessageListener().then(payload => {
        console.log(payload);
        toastNotification()
    }).catch(err => console.log('failed: ', err));

    const toastNotification = () => toast.info('Bạn có đơn hàng mới!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <aside className="w-64 admin-sidebar" aria-label="Sidebar">
                <div className='admin-account'>
                    <img
                        src={logo}
                        alt="Flowbite Logo"
                    />
                    <h1 className='text-2xl font-bold text-gray-600 dark:text-white'>
                        Business
                    </h1>
                </div>
                <div className="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
                    <ul className="space-y-2">
                        <li>
                            <Link to="/business" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>

                                {props.BusinessDashboard
                                    ? <span className="ml-3 font-bold text-gray-600 dark:text-white">Dashboard</span>
                                    : <span className="ml-3">Dashboard</span>
                                }
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/business/user" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                {props.BusinessUser
                                    ? <span className="ml-3 font-bold text-gray-600 dark:text-white">Tài khoản</span>
                                    : <span className="flex-1 ml-3 whitespace-nowrap">Tài khoản</span>
                                }
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/business/products" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                {props.BusinessProduct
                                    ? <span className="ml-3 font-bold text-gray-600 dark:text-white">Sản phẩm</span>
                                    : <span className="flex-1 ml-3 whitespace-nowrap">Sản phẩm</span>
                                }
                            </Link>
                        </li>
                        <li>

                            <Link to="/business/orders" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
                                {props.BusinessOrder
                                    ? <span className="ml-3 font-bold text-gray-600 dark:text-white">Đơn hàng</span>
                                    : <span className="flex-1 ml-3 whitespace-nowrap">Đơn hàng</span>
                                }
                            </Link>
                        </li>
                        <li>
                            <Link to="/business/transactions" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
                                {props.BusinessTransaction
                                    ? <span className="ml-3 font-bold text-gray-600 dark:text-white">Giao dịch Stripe</span>
                                    : <span className="flex-1 ml-3 whitespace-nowrap">Giao dịch Stripe</span>
                                }
                            </Link>
                        </li>
                        <li>
                            <Link to="/business/settings" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="w-6 h-6 text-gray-500 animation-spin" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                                {props.BusinessSetting
                                    ? <span className="ml-3 font-bold text-gray-600 dark:text-white">Tuỳ chỉnh</span>
                                    : <span className="flex-1 ml-3 whitespace-nowrap">Tuỳ chỉnh</span>
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