import { FaHome, FaUser, FaCog, FaEnvelope, FaSignOutAlt, FaBook, FaBriefcase, FaQuestionCircle } from "react-icons/fa";
import { path } from "./containts";

// menu dropdown
export const dropMenuItems = (type) => [
    {
        id: 1,
        label: "Trang chủ",
        icon: <FaHome className="w-5 h-5" />,
        path: type === 1 ? path.MAIN : path.ADMIN
    },
    {
        id: 2,
        label: "Thông tin cá nhân",
        icon: <FaUser className="w-5 h-5" />,
        submenu: [
            { id: "2-1", label: "View Profile", icon: <FaUser className="w-4 h-4" /> },
            { id: "2-2", label: "Edit Profile", icon: <FaCog className="w-4 h-4" /> },
        ],
        path: path.PROFILE
    },
    {
        id: 3,
        label: "Dịch vụ",
        icon: <FaBriefcase className="w-5 h-5" />,
        submenu: [
            { id: "3-1", label: "Consulting", icon: <FaBook className="w-4 h-4" /> },
            { id: "3-2", label: "Support", icon: <FaQuestionCircle className="w-4 h-4" /> },
        ],
        // path: path.CONTROLL
    },
    {
        id: 4,
        label: "Tin nhắn",
        icon: <FaEnvelope className="w-5 h-5" />,
    },
    {
        id: 5,
        label: "Đăng xuất",
        icon: <FaSignOutAlt className="w-5 h-5" />,
    },
];