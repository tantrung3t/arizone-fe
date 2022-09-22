import { Label, TextInput, Checkbox, Button, Alert } from "flowbite-react";
import './Login.css'
import { useState } from "react";
import axios from "axios";
import { useContext } from 'react';
import { StoreContext } from '../store/store';

export default function Login() {
    const { user, setUser } = useContext(StoreContext)
    const [isContainerActive, setIsContainerActive] = useState('active')
    const [alertTitle, setAlertTitle] = useState("")
    const [alertContent, setAlertContent] = useState("")
    const [statusChange, setStatusChange] = useState('Tạo tài khoản')
    const [showAlertFailure, setShowAlertFailure] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const change = () => {
        if (isContainerActive === '') {
            setStatusChange('Tạo tài khoản')
            setIsContainerActive('active');
        }
        else {

            setStatusChange('Đăng nhập')
            setIsContainerActive('');
        }

    }
    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        const dataSubmit = new FormData(e.currentTarget);
        let data = {
            "email": dataSubmit.get('email'),
            "password": dataSubmit.get('password'),
            "check": dataSubmit.get('agree')
        }
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/login/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        await axios(config)
            .then(function (response) {
                if (response) {
                    localStorage.setItem("accessToken", response.data.access)
                    localStorage.setItem("refreshToken", response.data.refresh)
                    if (response.data.permission === "admin") {
                        localStorage.setItem("role", "admin")
                        window.location = '/admin'
                    }
                    else if (response.data.permission === "business") {
                        localStorage.setItem("role", "business")
                        window.location = '/business'
                    }
                    else {
                        window.location = '/'
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
                setAlertTitle("Không thành công!")
                setAlertContent("Email hoặc mật khẩu không đúng")
                setShowAlertFailure(true)
                setTimeout(function () {
                    setShowAlertFailure(false)
                }, 5000)
            });

        console.log("hello")


    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const dataSubmit = new FormData(e.currentTarget);
        let data = {
            "phone": dataSubmit.get('phone'),
            "email": dataSubmit.get('email1'),
            "password": dataSubmit.get('password1'),
            "full_name": dataSubmit.get('fullname'),
        }
        console.log(data)
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/register/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(response.data);
                setShowAlertSuccess(true)
                setTimeout(function () {
                    setShowAlertSuccess(false)
                }, 5000)
            })
            .catch(function (error) {
                console.log(error);
                setAlertTitle("Không thể đăng ký!")
                setAlertContent("Vui lòng thay đổi email hoặc số điện thoại")
                setShowAlertFailure(true)
                setTimeout(function () {
                    setShowAlertFailure(false)
                }, 5000)
            });
    }
    return (

        <div className="body">
            <div>
                <div className="alert">
                    {showAlertFailure ?
                        <AlertFailure
                            title = {alertTitle}
                            content= {alertContent}
                        />
                        :
                        <div></div>

                    }
                </div>
                <div className="alert">
                    {showAlertSuccess ?
                        <Alert
                            color="success"
                        >
                            <span>
                                <span className="font-medium">
                                    Đăng ký thành công !
                                </span>
                                {' '}Vui lòng đăng nhập để sử dụng dịch vụ.
                            </span>
                        </Alert>
                        :
                        <div></div>

                    }
                </div>
            </div>
            <button className="button-change" onClick={change}>{statusChange}</button>

            <div className={`container-top ${isContainerActive}`}>
                <div className={`circle ${isContainerActive}`}>
                </div>
            </div>
            <div className="container">
                <div className={`left-form ${isContainerActive}`}>
                    <form onSubmit={handleSignInSubmit}>
                        <div className="float-left">
                            <div className="mb-10 block">
                                <div className="title">Đăng nhập với tài khoản của bạn</div>
                            </div>
                            <div className="mb-10 block">
                                <div className="mb-3 block">
                                    <Label>Địa chỉ Email</Label>
                                </div>
                                <div>
                                    <TextInput
                                        id="email"
                                        name='email'
                                        type="email"
                                        placeholder="name@host.com"
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="mb-10 block">
                                <div className="mb-3 block">
                                    <Label>Mật khẩu</Label>
                                </div>
                                <div>
                                    <TextInput
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="********"
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-10 block">
                                <Checkbox id="agree" name="agree" />
                                <Label htmlFor="agree">
                                    Giữ trạng thái đăng nhập
                                </Label>
                            </div>
                            <div className="mb-10 block">
                                <Button type="submit">
                                    Đăng nhập
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={`right-form ${isContainerActive}`}>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="float-right">
                            <div className="mb-5 block">
                                <div className="title">Tạo một tài khoản</div>
                            </div>
                            <div className="mb-5 block">
                                <div className="mb-3 block">
                                    <Label>Họ và tên</Label>
                                </div>
                                <div>
                                    <TextInput
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        placeholder="Trần Văn A"
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="mb-5 block">
                                <div className="mb-3 block">
                                    <Label>Số điện thoại</Label>
                                </div>
                                <div>
                                    <TextInput
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        placeholder="0123123123"
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="mb-5 block">
                                <div className="mb-3 block">
                                    <Label>Địa chỉ Email</Label>
                                </div>
                                <div>
                                    <TextInput
                                        id="email1"
                                        name="email1"
                                        type="email"
                                        placeholder="name@host.com"
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="mb-5 block">
                                <div className="mb-3 block">
                                    <Label>Mật khẩu</Label>
                                </div>
                                <div>
                                    <TextInput
                                        id="password1"
                                        name="password1"
                                        type="password"
                                        placeholder="********"
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="signin-button">
                                <div className="mb-10 block">
                                    <Button type="submit">
                                        Tạo tài khoản
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


function AlertFailure(props) {
    return (
        <Alert
            color="failure"
        >
            <span>
                <span className="font-medium">
                    {props.title}
                </span>
                {' '}{props.content}
            </span>
        </Alert>
    )
}