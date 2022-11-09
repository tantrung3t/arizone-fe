import Header from '../components/Header';
import AppFooter from '../components/Footer';
import './CustomerProfile.css'
import user from '../image/none_user.jpg'
import { useEffect, useState } from 'react';
import axios from 'axios';

const data = {
    image: "",
    full_name: "Trần Tấn Trung",
    email: "tantrung@gmail.com",
    phone: "0123456789",
    birthday: "2000-09-13",
    sex: "male"
}

const HOST = process.env.REACT_APP_HOST

export default function CustomerProfile() {
    const [profile, setProfile] = useState(
        {
            image: "",
            full_name: "",
            email: "",
            phone: "",
            birthday: "",
            sex: ""
        }
    )
    const [image, setImage] = useState("")
    const [imageUpload, setImageUpload] = useState("")
    const [sex, setSex] = useState("other")
    const [maleCheck, setMaleCheck] = useState(false)
    const [femaleCheck, setFemaleCheck] = useState(false)
    const [otherCheck, setOtherCheck] = useState(false)
    useEffect(() => {
        getUserProfile()
    }, [])

    const getUserProfile = async () => {
        var config = {
            method: 'get',
            url: HOST + '/user/profile/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        };
        await axios(config)
            .then(function (response) {
                console.log(response.data)
                setProfile(response.data)
                if(response.data.image === null){
                    setImage("")
                }else{
                    setImage(HOST + response.data.image)
                }
                if (response.data.sex === "male") {
                    setMaleCheck(true)
                    setFemaleCheck(false)
                    setOtherCheck(false)
                } else if (response.data.sex === "female") {
                    setFemaleCheck(true)
                    setMaleCheck(false)
                    setOtherCheck(false)
                } else {
                    setOtherCheck(true)
                    setFemaleCheck(false)
                    setMaleCheck(false)
                }
                setSex(response.data.sex)
            })
            .catch(function (error) {
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataSubmit = new FormData(e.currentTarget);
        let data = {
            "full_name": dataSubmit.get("name"),
            "phone": dataSubmit.get('phone'),
            "name": dataSubmit.get('name'),
            "birthday": dataSubmit.get('birthday'),
            "sex": sex,
        }
        var config = {
            method: 'post',
            url: HOST + '/user/profile/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            data: data
        };
        await axios(config)
            .then(function (response) {
                alert("Cập nhật thông tin thành công!")
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const sexMale = () => {
        setSex("male")
        setMaleCheck(true)
        setFemaleCheck(false)
        setOtherCheck(false)
    }
    const sexFemale = () => {
        setSex("female")
        setFemaleCheck(true)
        setMaleCheck(false)
        setOtherCheck(false)
    }
    const sexOther = () => {
        setSex("other")
        setOtherCheck(true)
        setFemaleCheck(false)
        setMaleCheck(false)
    }
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                setImage(e.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
            setImageUpload(e.target.files[0])
        }
    }
    const handleSubmitImage = async (e) => {
        if(imageUpload) {
            let formData = new FormData();
            formData.append('image', imageUpload);
            var config = {
                method: 'post',
                url: HOST + '/user/profile/image/',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                },
                data: formData
            };
            await axios(config)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <div className='body-container'>
                    <div className='customer-profile-container'>
                        <div className='customer-profile-container-image'>
                            <div className='customer-profile-container-cover-pic bg-gray-300'>

                                <div className='customer-profile-container-change-pic bg-gray-300'>
                                    <label htmlFor="upload-input" className="upload-image">
                                        <svg className="text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        {/* <div>Tải ảnh lên</div> */}
                                        <input
                                            hidden
                                            type="file"
                                            id="upload-input"
                                            accept=".jpg,.jpeg,.png"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                                {image
                                    ? <img
                                        src={image}
                                        alt="store"
                                    />
                                    : <img
                                        src={user}
                                        alt="store"
                                    />
                                }

                            </div>
                            <div className='customer-profile-container-cover-pic-upload'>
                                <button
                                    onClick={handleSubmitImage}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Upload
                                </button>
                            </div>
                        </div>
                        <div className='customer-profile-container-info bg-gray-300'>
                            <div className='customer-profile-container-info-title'>
                                <p className="block text-3xl font-bold text-gray-900 dark:text-gray-300">
                                    Thông tin cá nhân
                                </p>
                                <h1 className="block text-sm font-bold text-gray-500 dark:text-gray-300">
                                    (Thông tin mà bạn cung cấp chỉ dùng cho mục đích mua hàng)
                                </h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className='customer-profile-container-info-element'>
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                                        Họ và tên:
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder='Trần Văn A'
                                        defaultValue={profile.full_name}
                                        required />
                                </div>
                                <div className='customer-profile-container-info-element'>
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        disabled={true}
                                        name="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder='example@host.com'
                                        defaultValue={profile.email}
                                        required />
                                </div>
                                <div className='customer-profile-container-info-element'>
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                                        Số điện thoại:
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        pattern="[0-9]{8,12}"
                                        name="phone"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder='0123456789'
                                        defaultValue={profile.phone}
                                        required />
                                </div>
                                <div className='customer-profile-container-info-element display-flex-only justify-content-sb-only'>
                                    <div>
                                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                                            Ngày sinh:
                                        </label>
                                        <input
                                            type="date"
                                            id="birthday"
                                            name="birthday"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={profile.birthday}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                                            Giới tính:
                                        </label>
                                        <div className='display-flex-only'>
                                            <div className="flex items-center dark:border-gray-700">
                                                <input
                                                    id="bordered-radio-1"
                                                    type="radio"
                                                    value=""
                                                    name="bordered-radio"
                                                    onClick={sexMale}
                                                    checked={maleCheck}
                                                    readOnly={true}
                                                    onChange={sexMale}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className="py-4 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300">
                                                    Nam
                                                </label>
                                            </div>
                                            <div className="flex items-center pl-4 dark:border-gray-700">
                                                <input
                                                    id="bordered-radio-1"
                                                    type="radio"
                                                    value=""
                                                    onClick={sexFemale}
                                                    checked={femaleCheck}
                                                    onChange={sexFemale}
                                                    name="bordered-radio"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className="py-4 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300">
                                                    Nữ
                                                </label>
                                            </div>
                                            <div className="flex items-center pl-4 dark:border-gray-700">
                                                <input
                                                    id="bordered-radio-1"
                                                    type="radio"
                                                    value=""
                                                    name="bordered-radio"
                                                    onClick={sexOther}
                                                    checked={otherCheck}
                                                    onChange={sexOther}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className="py-4 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300">
                                                    Khác
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='customer-profile-container-info-element-button'>
                                    <button
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        Cập nhật
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