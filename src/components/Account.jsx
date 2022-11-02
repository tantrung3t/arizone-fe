import { Avatar, Dropdown } from "flowbite-react";
import { useMemo } from "react";
import { useState, useContext } from "react";

import { Link } from "react-router-dom";

export default function Account(props) {
    // const user = {
    //     name: "Tan Trung"
    // }
    const handleLogOut = () => {
        localStorage.clear()
        window.location.replace("/")
    }
    return (
        <>
            <div className="avatar">
                <Avatar
                    size="xs"
                    rounded={true}
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                />
            </div>
            <div className="account">
                <Dropdown
                    label={props.data.full_name}
                    inline={true}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                        </span>
                        <span className="block text-sm font-medium truncate">
                            Xin chào!
                        </span>
                    </Dropdown.Header>
                    <Link to="/customer/profile">
                        <Dropdown.Item>
                            <p>Thông tin tài khoản</p>
                        </Dropdown.Item>
                    </Link>
                    <Link to="/customer/order">
                        <Dropdown.Item>
                            <p>Lịch sử đơn hàng</p>
                        </Dropdown.Item>
                    </Link>
                    <Link to="/customer/cart">
                        <Dropdown.Item>
                            <p>Giỏ hàng</p>
                        </Dropdown.Item>
                    </Link>
                    <Link to="/customer/change-password">
                        <Dropdown.Item>
                            <p>Đổi mật khẩu</p>
                        </Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <button onClick={handleLogOut}>
                        <Dropdown.Item>
                            <p>Thoát tài khoản</p>
                        </Dropdown.Item>
                    </button>
                </Dropdown>
            </div>
        </>
    )
}