import { useState, useEffect } from 'react';
import './Business.css'
import SideBarBusiness from '../components/SideBarBusiness';
import './CustomerProfile.css'
import axios from 'axios';
import user from '../image/none_user.jpg'
import { ToastContainer, toast } from 'react-toastify';

import { StoreContext } from "../store/store";
import { useContext } from "react";

import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import { useMapEvents } from "react-leaflet";
import './Mapping.css'

const HOST = process.env.REACT_APP_HOST

export default function BusinessSetting() {

    const { location } = useContext(StoreContext)
    const [image, setImage] = useState("")
    const [imageUpload, setImageUpload] = useState("")

    const [nameStore, setNameStore] = useState()
    const [address, setAddress] = useState()
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()

    useEffect(() => {
        // getBusinessInfo()
        const data = JSON.parse(localStorage.getItem("info"))
        setImage(HOST + data.user.image)
        setAddress(data.address) 
        setNameStore(data.user.full_name)
        setLatitude(data.latitude)
        setLongitude(data.longitude)
    }, [])

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
        if (imageUpload) {
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const dataSubmit = new FormData(e.currentTarget);
        let data = {
            "full_name": dataSubmit.get("name"),
            "address": dataSubmit.get('address'),
            "latitude": dataSubmit.get('latitude'),
            "longitude": dataSubmit.get('longitude'),
        }
        var config = {
            method: 'put',
            url: 'http://127.0.0.1:8000/business/profile/update/',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                toastSuccess()
            })
            .catch(function (error) {
                toastError()
            });
    }

    const toastSuccess = () => toast.success('Cập nhật thành công!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });;

    const toastError = () => toast.error('Lỗi rồi, thử lại sau nhé!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    return (
        <div>
            <div className='display-flex'>
                <SideBarBusiness BusinessSetting="true" />
            </div>
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
            <div className='business-container'>
                <div className="business-product">
                    <div className="display-flex-only">
                        <div>
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
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className='customer-profile-container-info-element'>
                                    <label className="text-lg font-medium text-gray-900 dark:text-gray-300">
                                        Tên cửa hàng:
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        defaultValue={nameStore}
                                        required />
                                </div>
                                <div className='customer-profile-container-info-element'>
                                    <label className="text-lg font-medium text-gray-900 dark:text-gray-300">
                                        Địa chỉ:
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        defaultValue={address}
                                        required />
                                </div>
                                <div className='mt-5 customer-profile-container-info-element'>
                                    <div className='business-position'>
                                        <p className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                                            Toạ độ:
                                        </p>
                                        {
                                            location.latitude ? (
                                                <input
                                                    type="text"
                                                    id="latitude"
                                                    name="latitude"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    defaultValue={location.latitude}
                                                    required />
                                            ) : (
                                                <input
                                                    type="text"
                                                    id="latitude"
                                                    name="latitude"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    defaultValue={latitude}
                                                    required />
                                            )
                                        }
                                        {
                                            location.longitude ? (
                                                <input
                                                    type="text"
                                                    id="longitude"
                                                    name="longitude"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    defaultValue={location.longitude}
                                                    required />
                                            ) : (
                                                <input
                                                    type="text"
                                                    id="longitude"
                                                    name="longitude"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    defaultValue={longitude}
                                                    required />
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='button-update'>
                                    <button
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        Cập nhật
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                    <div className='business-map'>
                        {
                            latitude ? (
                                <MapContainer center={[latitude, longitude]} zoom={14} scrollWheelZoom={true}>
                                    <LocationFinderDummy />
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {
                                        location.latitude ? (
                                            <Marker position={[location.latitude, location.longitude]}>
                                            </Marker>
                                        ) : (
                                            <Marker position={[latitude, longitude]}>
                                            </Marker>
                                        )
                                    }
                                </MapContainer>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


const LocationFinderDummy = () => {
    const { setLocation } = useContext(StoreContext)
    useMapEvents({
        click(e) {
            // console.log(e.latlng.lat.toFixed(7));
            // console.log(e.latlng.lng.toFixed(7));
            const latlng = {
                "latitude": e.latlng.lat.toFixed(7),
                "longitude": e.latlng.lng.toFixed(7)
            }
            setLocation(latlng)
        },
    });
    return null;
};