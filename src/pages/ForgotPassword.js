import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

export default function ForgotPassword() {
    const history = useHistory()

    const [step1, setStep1] = useState(true)
    const [email, setEmail] = useState("")


    const handleChangePassword = async (e) => {
        e.preventDefault()
        const dataSubmit = new FormData(e.currentTarget);
        let data = {
            "email": email,
            "pin": dataSubmit.get('pin'),
            "new_password": dataSubmit.get('password'),
            "confirm_password": dataSubmit.get('confirm-password'),
        }
        var config = {
            method: 'post',
            url: process.env.REACT_APP_HOST + '/forgot-password/confirm/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                toastSuccess()
                setTimeout(() =>{
                    history.push('/login')
                }, 3200)
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const handleSendPin = async (e) => {
        e.preventDefault()
        const dataSubmit = new FormData(e.currentTarget);
        let data = {
            "email": dataSubmit.get('email'),
        }
        setEmail(dataSubmit.get('email'))
        var config = {
            method: 'post',
            url: process.env.REACT_APP_HOST + '/forgot-password/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                setStep1(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const toastSuccess = () => toast.success('Thay đổi mật khẩu thành công! Bạn sẽ được chuyển hướng sau 3 giây', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {
                step1 ? (
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            Arizone
                        </a>
                        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                            <h2 className="mb-1 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đổi mật khẩu
                            </h2>
                            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSendPin}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@host.com" required />
                                </div>
                                <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Lấy mã</button>
                                <button type="button" className="w-full text-blue bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng nhập</button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            Arizone
                        </a>
                        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                            <h2 className="mb-1 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đổi mật khẩu
                            </h2>
                            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleChangePassword}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã PIN</label>
                                    <input type="number" name="pin" id="pin" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu mới</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập lại mật khẩu mới</label>
                                    <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đổi mật khẩu</button>
                                <button type="button" className="w-full text-blue bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng nhập</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}