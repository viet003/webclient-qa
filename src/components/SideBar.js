import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { FaUserGraduate } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdFindInPage } from "react-icons/md";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { path } from "../ultils/containts";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const SideBar = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeItem, setActiveItem] = useState(""); // Trạng thái của mục đang được chọn

    const getContent = props.getContent;
    const type = props.type;
    const toggle = props.toggle;

    const handleFunction = (input, path) => {
        getContent(input);
        setActiveItem(path);
        navigate(path);
        handleClick(input)
    };

    const { active } = useSelector(state => state.state)

    const handleClick = (page) => {
        dispatch(actions.state(page))
    }

    useEffect(() => {
       setActiveItem(active)
    }, [active]);

    return (
        <div className={`${toggle ? "" : ""} flex flex-col justify-between h-[90%]`}>
            <div className="">
                <div
                    onClick={() => handleFunction("Home", path.HOME)}
                    className={`${toggle ? "w-[3.5rem]" : "w-[12rem]"} sideData ${activeItem === "Home" ? "text-black bg-white" : ""}`}
                >
                    <div className="mr-8 text-[1.7rem]"><RxDashboard /></div>
                    <div className={`${toggle ? "opacity-0 " : "transition-opacity "} text-[14px] whitespace-pre`}>Trang chủ</div>
                </div>
                <div
                    onClick={() => handleFunction("Thông tin cá nhân", path.PROFILE)}
                    className={`${toggle ? "w-[3.5rem]" : "w-[12rem]"} sideData ${activeItem === "Thông tin cá nhân" ? "text-black bg-white" : ""}`}
                >
                    <div className="mr-8 text-[1.7rem]"><ImProfile /></div>
                    <div className={`${toggle ? "opacity-0 " : "transition-opacity "} text-[14px] whitespace-pre`}>Thông tin</div>
                </div>
                <div
                    onClick={() => handleFunction("Quản lý nhân viên", path.EMPLOYEE)}
                    className={`${toggle ? "w-[3.5rem]" : "w-[12rem]"} sideData ${activeItem === "Quản lý nhân viên" ? "text-black bg-white" : ""}`}
                >
                    <div className="mr-8 text-[1.7rem]"><FaUserGraduate /></div>
                    <div className={`${toggle ? "opacity-0 " : "transition-opacity "} text-[14px] whitespace-pre`}>Nhân viên</div>
                </div>
                <div
                    onClick={() => handleFunction("Quản lý phòng ban", path.DEPARTMENT)}
                    className={`${toggle ? "w-[3.5rem]" : "w-[12rem]"} sideData ${activeItem === "Quản lý phòng ban" ? "text-black bg-white" : ""}`}
                >
                    <div className="mr-8 text-[1.7rem]"><MdFindInPage /></div>
                    <div className={`${toggle ? "opacity-0 " : "transition-opacity "} text-[14px] whitespace-pre`}>Phòng ban</div>
                </div>
                <div
                    onClick={() => handleFunction("Quản lý tài khoản", path.ACCOUNT)}
                    className={`${toggle ? "w-[3.5rem]" : "w-[12rem]"} sideData ${activeItem === "Quản lý tài khoản" ? "text-black bg-white" : ""}`}
                >
                    <div className="mr-8 text-[1.7rem]"><RiAccountPinBoxFill /></div>
                    <div className={`${toggle ? "opacity-0 " : "transition-opacity "} text-[14px] whitespace-pre`}>Tài khoản</div>
                </div>
            </div>

            <div>
                <div
                    onClick={() => {
                        dispatch(actions.logout());
                    }}
                    className={`${toggle ? "w-[3.5rem]" : "w-[12rem]"} sideData ${activeItem === path.LOGIN ? "active" : ""}`}
                >
                    <div className="mr-8 text-[1.7rem]"><IoIosLogOut /></div>
                    <div className={`${toggle ? "opacity-0 " : "transition-opacity "} text-[14px] whitespace-pre`}>Đăng xuất</div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
