import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import logo from "../assets/logo.png"
import admin from "../assets/admin.jpg"
import user from "../assets/user.jpg"
import { BiChevronDown } from "react-icons/bi";
import { BiKey } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/actions"
import { path } from "../ultils/containts"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"

const Header = (props) => {
    const { content } = useSelector(state => state.state)
    const getValue = props.getValue;
    const setChange = props.setChange;
    const { token } = useSelector(state => state.auth)
    const email = token ? jwtDecode(token).email : "No user"
    // const type = jwtDecode(token).type

    const conTrolMenu = () => {
        getValue();
    }

    const [toggle, setToggle] = useState(false)
    const conTroler = () => {
        setToggle((prevToggle) => !prevToggle);
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="flex items-center justify-start h-full pl-6 md:justify-between z-100">
            <div className="flex items-center text-primary md:min-w-[0] min-w-[30%]">
                <div className="lg:hidden">
                    <div className="flex items-center justify-start">
                        <IoMdMenu className="text-[2rem] xl:text-[2rem] cursor-pointer" onClick={conTrolMenu} />
                        <p className="ml-2 text-[12px] lg:text-[1rem]">{content}</p>
                    </div>
                </div>
                <div className="hidden lg:flex">
                    <div className="flex items-center">
                        <IoMdMenu className="text-[1rem] xl:text-[2rem]" />
                        <p className="ml-2 text-[12px] lg:text-[1rem]">{content}</p>
                    </div>
                </div>
            </div>
            <div className="p-4 w-[250px]">
                <img src={logo} alt="" className="w-full h-full" />
            </div>
            <div onClick={conTroler} className="relative items-center hidden h-full mr-2 cursor-pointer md:flex text-primary z-100">
                <div className="flex items-center h-full mr-2 cursor-pointer hover:text-orange-600 text-primary">
                    <img src={user} alt="" className={`w-[41px] h-[41px] rounded-full object-cover sm:mr-4`} />
                    <p className="text-primary cursor-pointer text-[13px] scale-x-0 w-0 sm:w-[57%] sm:scale-100 lg:text-[1rem] mx-2">{email}</p>
                    <BiChevronDown className={`${toggle ? "rotate-180 transition-all duration-100" : "transition-all"} mx-2 text-[20px] xl:text-[25px] cursor-pointer`} />
                </div>
                <div className={` ${toggle ? "block transition-all duration-100" : "hidden"} absolute top-full right-0  shadow-xl rounded-xl z-80`}>
                    <div className="flex flex-col gap-2 px-4 py-3 bg-gray-100 rounded-xl z-100">
                        <div className="flex items-center gap-4 cursor-pointer hover:text-orange-700" onClick={() => setChange(true)}>
                            <BiKey className="text-[25px]" />
                            <p>Thay đổi mật khẩu</p>
                        </div>
                        <div className="flex items-center gap-4 cursor-pointer hover:text-orange-700" onClick={() => { dispatch(actions.logout()); navigate(path.LOGIN); dispatch(actions.state({ active: null, content: null})) }}>
                            <IoIosLogOut className="text-[25px]" />
                            <p>Đăng xuất</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default Header