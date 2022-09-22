import { Avatar, Dropdown } from "flowbite-react";
import { useMemo } from "react";
import { useState, useContext } from "react";
import { StoreContext } from "../store/store";

export default function Account() {
    const { user, setUser } = useContext(StoreContext)
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
                    label="Trần Tấn Trung"
                    inline={true}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                        </span>
                        <span className="block text-sm font-medium truncate">
                            tantrung.dmc@flowbite.com
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        <a href="/login">Tài khoản</a>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <a href="/login">Đơn hàng</a>
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