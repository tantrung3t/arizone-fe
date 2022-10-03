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
                    <Dropdown.Item>
                        <a href="/login">Tài khoản</a>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to="/customer/order">Đơn hàng</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <a href="/login">Giỏ hàng</a>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <a href="/login">Thoát tài khoản</a>
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </>
    )
}