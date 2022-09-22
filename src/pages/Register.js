import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import './Login.css'
import { useState } from "react";
export default function Register() {

    const [isContainerActive, setIsContainerActive] = useState('');
    const [statusChange, setStatusChange] = useState('Create Account');
    const change = () => {
        if (isContainerActive === '') {
            setStatusChange('Create Account')
            setIsContainerActive('active');
        }
        else {

            setStatusChange('Login')
            setIsContainerActive('');

        }

    }
    const handleSignInSubmit = (e) => {
        e.preventDefault();
        const dataSubmit = new FormData(e.currentTarget);
        let data = {
            "email": dataSubmit.get('email'),
            "password": dataSubmit.get('password'),
            "check": dataSubmit.get('agree')
        }
        console.log(data)
    }

    const handleRegisterSubmit = (e) =>{
        e.preventDefault();
        const dataSubmit = new FormData(e.currentTarget);
        let data = {
            "email": dataSubmit.get('email1'),
            "password": dataSubmit.get('password1'),
            "fullname": dataSubmit.get('fullname')
        }
        console.log(data)
    }
    return (

        <div className="body">
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
                                <div className="title">Welcome Back</div>
                            </div>
                            <div className="mb-10 block">
                                <div className="mb-3 block">
                                    <Label>Email Address</Label>
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
                                    <Label>Enter your Password</Label>
                                </div>
                                <div>
                                    <TextInput
                                        id="password"
                                        name="password"
                                        type="password"
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-10 block">
                                <Checkbox id="agree" name="agree" />
                                <Label htmlFor="agree">
                                    Keep me Sign In
                                </Label>
                            </div>
                            <div className="mb-10 block">
                                <Button type="submit">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={`right-form ${isContainerActive}`}>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="float-right">
                            <div className="mb-10 block">
                                <div className="title">Create an Account</div>
                            </div>
                            <div className="mb-10 block">
                                <div className="mb-3 block">
                                    <Label>Fullname</Label>
                                </div>
                                <div>
                                    <TextInput
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        placeholder="Alenxander Roon"
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="mb-10 block">
                                <div className="mb-3 block">
                                    <Label>Email Address</Label>
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
                            <div className="mb-10 block">
                                <div className="mb-3 block">
                                    <Label>Enter a Password</Label>
                                </div>
                                <div>
                                    <TextInput
                                        id="password1"
                                        name="password1"
                                        type="password"
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="signin-button">
                                <div className="mb-10 block">
                                    <Button type="submit">
                                        Create Account
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