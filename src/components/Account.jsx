import { Avatar, Dropdown } from "flowbite-react";
import { useMemo } from "react";
import { useState, useContext } from "react";
import { StoreContext } from "../store/store";
import { Link } from "react-router-dom";

export default function Account() {
    const { user } = useContext(StoreContext)
    // const user = {
    //     name: "Tan Trung"
    // }
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
                    label={user.name}
                    inline={true}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                        </span>
                        <span className="block text-sm font-medium truncate">
                            email_name@host.com
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
                    <Link to="/">
                        <Dropdown.Item>
                            <p>Thoát tài khoản</p>
                        </Dropdown.Item>
                    </Link>
                </Dropdown>
            </div>
        </>
    )
}