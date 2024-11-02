import React from "react";
import admin from "../assets/admin.jpg"
import user from "../assets/user.jpg"
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const UserProfile = ({ toggle }) => {

    const { token } = useSelector(state => state.auth)
    const id = token ? jwtDecode(token).id : "No user"
    const name = token ? jwtDecode(token).name : "Admin"
    const type = token ? jwtDecode(token).type : ""
    // console.log(jwtDecode(token).name)
    return (
        <div className={`flex items-center gap-5 py-3 rounded-xl ${toggle ? "bg-none transition-all " : "bg-white"}`}>
            <div className="min-w-[3.5rem] h-[3rem] flex items-center justify-around overflow-hidden">
                <img src={user} alt="" className={`w-[3rem] h-full rounded-full object-cover ${toggle ? "text-white transition-all" : "text-black"}`} />
            </div>
            <div className={toggle ? "opacity-0 transition-opacity text-white" : "opacity-100 duration-300"}>
                {
                    true && (
                        <p className="overflow-hidden text-sm whitespace-no-wrap overflow-ellipsis">User@gmail.com</p>
                    )
                }
                {
                    type === "Quản trị viên" && (
                        <p className="overflow-hidden text-sm whitespace-no-wrap overflow-ellipsis">Admin</p>
                    )
                }
                <p className="text-[0.75rem] opacity-60 mt-1">
                    {id}
                </p>
            </div>
        </div>
    );
}

export default UserProfile