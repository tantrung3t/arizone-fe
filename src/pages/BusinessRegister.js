import { useState } from 'react'
import './BusinessRegister.css'
import { Link } from 'react-router-dom'
import success from '../image/success.png'
import axios from 'axios'

const HOST = process.env.REACT_APP_HOST

export default function BusinessRegister() {

    const [showWarning, setShowWarning] = useState("form-warning-hide")
    const [registerSuccess, setRegisterSuccess] = useState("register-success-hide")
    const [formRegister, setFormRegister] = useState("form-container")
    const [step1, setStep1] = useState("form-step-1")
    const [step2, setStep2] = useState("form-step-2-hide")
    const [step3, setStep3] = useState("form-step-3-hide")
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [content, setContent] = useState("Mật khẩu nhập lại không đúng!")
    const [isRegister, setIsRegister] = useState(false)

    const checkStep1 = () => {
        if (name && phone && address) {
            setStep1("form-step-1-hide")
            setStep2("form-step-2")
            setShowWarning("form-warning-hide")
        }
        else {
            setShowWarning("form-warning")
        }

    }

    const previousStep1 = () => {
        setStep1("form-step-1")
        setStep2("form-step-2-hide")
        setShowWarning("form-warning-hide")
    }
    const changeName = (e) => {
        setName(e.target.value)
    }
    const changePhone = (e) => {
        setPhone(e.target.value)
    }
    const changeAddress = (e) => {
        setAddress(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataSubmit = new FormData(e.currentTarget);
        setIsRegister(true)
        if (dataSubmit.get('password1') === dataSubmit.get('password2')) {
            let data = {
                "full_name": dataSubmit.get('name'),
                "phone": dataSubmit.get('phone'),
                "address": dataSubmit.get('address'),
                "email": dataSubmit.get('email'),
                "password": dataSubmit.get('password1'),
            }
            var config = {
                method: 'post',
                url: HOST + '/business/register/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            await axios(config)
                .then(function (response) {
                    setFormRegister("form-container-hide")
                    setRegisterSuccess("register-success")
                    setIsRegister(false)
                })
                .catch(function (error) {
                    setContent("Email đã tồn tại!")
                });
        }
        else {
            setShowWarning("form-warning")
        }
    }
    return (
        <div className='business-register'>
            <div className='background-wave'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path className='wave1' fill="#0099ff" fillOpacity="1" d="M0,96L30,85.3C60,75,120,53,180,90.7C240,128,300,224,360,224C420,224,480,128,540,128C600,128,660,224,720,256C780,288,840,256,900,250.7C960,245,1020,267,1080,245.3C1140,224,1200,160,1260,149.3C1320,139,1380,181,1410,202.7L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z">
                    </path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path className='wave2' fill="#00cba9" fillOpacity="1" d="M0,192L34.3,165.3C68.6,139,137,85,206,101.3C274.3,117,343,203,411,229.3C480,256,549,224,617,229.3C685.7,235,754,277,823,250.7C891.4,224,960,128,1029,101.3C1097.1,75,1166,117,1234,154.7C1302.9,192,1371,224,1406,240L1440,256L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                    </path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path className='wave3' fill="#273036" fillOpacity="1" d="M0,224L24,240C48,256,96,288,144,256C192,224,240,128,288,128C336,128,384,224,432,224C480,224,528,128,576,101.3C624,75,672,117,720,144C768,171,816,181,864,202.7C912,224,960,256,1008,261.3C1056,267,1104,245,1152,218.7C1200,192,1248,160,1296,170.7C1344,181,1392,235,1416,261.3L1440,288L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z">
                    </path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path className='wave4' fill="#0099ff" fillOpacity="1" d="M0,96L30,96C60,96,120,96,180,112C240,128,300,160,360,144C420,128,480,64,540,74.7C600,85,660,171,720,192C780,213,840,171,900,149.3C960,128,1020,128,1080,138.7C1140,149,1200,171,1260,181.3C1320,192,1380,192,1410,192L1440,192L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z">
                    </path>
                </svg>
            </div>
            <div className={formRegister}>
                <p className='form-title text-3xl font-bold text-blue-600 dark:text-gray-300'>
                    Đăng ký cửa hàng
                </p>
                <form onSubmit={handleSubmit}>
                    <div className={step1}>

                        <div className="form-input mb-6">
                            <label className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300">
                                Tên cửa hàng
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=""
                                onChange={changeName}
                                required />
                        </div>
                        <div className="form-input mb-6">
                            <label className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300">
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=""
                                onChange={changePhone}
                                required />
                        </div>
                        <div className="form-input mb-6">
                            <label className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300">
                                Địa chỉ cửa hàng
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=""
                                onChange={changeAddress}
                                required />
                        </div>
                        <div className={showWarning}>
                            <p className='text-lg font-bold text-yellow-500 dark:text-gray-300'>
                                Vui lòng nhập đầy đủ các trường!
                            </p>
                        </div>
                        <div onClick={checkStep1} className="form-button mb-6">
                            <p className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Bước kế
                            </p>
                        </div>
                    </div>
                    <div className={step2}>
                        <div onClick={previousStep1} className='form-previous'>
                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="form-input mb-6">
                            <label className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=""
                                required />
                        </div>
                        <div className="form-input mb-6">
                            <label className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                id="password1"
                                name="password1"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=""
                                required />
                        </div>
                        <div className="form-input mb-6">
                            <label className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300">
                                Nhập lại mật khẩu
                            </label>
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=""
                                required />
                        </div>
                        <div className={showWarning}>
                            <p className='text-lg font-bold text-yellow-500 dark:text-gray-300'>
                                {content}
                            </p>
                        </div>
                        <div className="form-button mb-6">
                            {isRegister ? (
                                <button type='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    Đăng ký
                                </button>
                            ) : (
                                <button type='submit' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Đăng ký
                                </button>
                            )
                            }

                        </div>
                    </div>
                </form>
            </div>
            <div className={registerSuccess}>
                <img
                    src={success}
                    alt="success"
                />
                <p className='text-3xl font-bold text-blue-500 dark:text-gray-300'>
                    Đăng ký thành công
                </p>
                <Link to='/login' className='text-xl font-bold text-blue-500 underline dark:text-gray-300'>
                    Đăng nhập ngay
                </Link>
            </div>
        </div>
    )
}
