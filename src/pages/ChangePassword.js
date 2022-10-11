
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import './CustomerProfile.css'
import user from '../image/user-image.png'
import { useEffect, useState } from 'react';

const data = {
    image: "",
    full_name: "Trần Tấn Trung",
    email: "tantrung@gmail.com",
    phone: "0123456789",
    birthday: "2000-09-13",
    sex: "male"
}

export default function ChangePassword() {
    const handleSubmit = (e) => {
        e.preventDefault()
        const dataSubmit = new FormData(e.currentTarget);
        let data = {
            "old_password": dataSubmit.get('old_password'),
            "new_password": dataSubmit.get('new_password'),
            "confirm_new_password": dataSubmit.get('confirm_new_password'),
        }
        console.log(data)
    }
    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <div className='body-container'>
                    <div className='customer-profile-container'>
                        <div className='customer-profile-container-info margin-auto'>
                            <div className='customer-profile-container-info-title'>
                                <p className="block text-3xl font-bold text-gray-900 dark:text-gray-300">
                                    Đổi mật khẩu
                                </p>
                                <h1 className="block text-sm font-bold text-gray-500 dark:text-gray-300">
                                    (Bạn sẽ được yêu cầu đăng nhập lại sau khi đổi mật khẩu)
                                </h1>
                            </div>
                            <form onSubmit={handleSubmit} className="change-password-container">
                                <div className='change-password-container-info-element'>
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                                        Mật khẩu cũ:
                                    </label>
                                    <div className='eye-password'>
                                        {/* <button>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        </button> */}
                                        <input
                                            type="password"
                                            id="old_password"
                                            name="old_password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder='********'

                                            required />
                                    </div>
                                </div>
                                <div className='change-password-container-info-element'>
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                                        Mật khẩu mới:
                                    </label>
                                    <input
                                        type="password"
                                        id="new_password"
                                        name="new_password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder='********'
                                        required />

                                </div>
                                <div className='change-password-container-info-element'>
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                                        Nhập lại mật khẩu mới:
                                    </label>
                                    <input
                                        type="password"
                                        id="confirm_new_password"

                                        name="confirm_new_password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder='********'

                                        required />
                                </div>
                                <div className='customer-profile-container-info-element-button'>
                                    <button
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        Đổi mật khẩu
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <AppFooter></AppFooter>
            </footer>
        </div>
    )
}