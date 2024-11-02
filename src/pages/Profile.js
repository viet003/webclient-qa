import React, { useState } from "react";
import { FaUser, FaCamera, FaExclamationCircle, FaEdit, FaUserCircle, FaPen } from "react-icons/fa";
import User from "../assets/user.jpg"

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    bio: "",
    gender: "",
    address: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      github: ""
    }
  });

  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState("images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80");
  const [isEditing, setIsEditing] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = !emailRegex.test(value) ? "Invalid email format" : "";
        break;
      case "dateOfBirth":
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        error = !dateRegex.test(value) ? "Invalid date format (YYYY-MM-DD)" : "";
        break;
      case "phone":
        const phoneRegex = /^\d{10}$/;
        error = !phoneRegex.test(value) ? "Invalid phone number (10 digits)" : "";
        break;
      default:
        error = value.trim() === "" ? "This field is required" : "";
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "socialLinks") {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-2 bg-gradient-to-br from-blue-50 to-indigo-50 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto overflow-hidden bg-white shadow-xl rounded-2xl">
        <div className="px-6 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Thông tin cá nhân</h1>
            <p className="mt-2 text-gray-600 text-md">Quản lý và sửa đổi thông tin của bạn</p>
          </div>

          <div className="flex flex-col items-center mb-12">
            <div className="relative group">
              <img
                src={User}
                alt="Profile"
                className="object-cover w-40 h-40 transition-transform duration-300 transform border-4 border-white rounded-full shadow-2xl hover:scale-105"
              />
              <label
                htmlFor="profile-image"
                className="absolute p-3 transition-all duration-200 bg-blue-600 rounded-full shadow-lg cursor-pointer bottom-2 right-2 hover:bg-blue-700 group-hover:scale-110"
              >
                <FaCamera className="text-xl text-white" />
                <input
                  type="file"
                  id="profile-image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  aria-label="Upload profile picture"
                />
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h2 className="flex items-center mb-4 text-xl font-semibold text-gray-900">
                    <FaUserCircle className="mr-2" /> Thông tin cá nhân
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Họ và đệm
                      </label>
                      <div className="relative mt-1">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`block w-full px-4 py-3 rounded-lg border ${errors.firstName ? "border-red-500" : "border-gray-300"} focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                          disabled={!isEditing}
                        />
                        {errors.firstName && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <FaExclamationCircle className="text-red-500" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Tên
                      </label>
                      <div className="relative mt-1">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`block w-full px-4 py-3 rounded-lg border ${errors.lastName ? "border-red-500" : "border-gray-300"} focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="Ngày sinh" className="block text-sm font-medium text-gray-700">
                        Ngày sinh
                      </label>
                      <div className="relative mt-1">
                        <input
                          type="text"
                          id="Ngày sinh"
                          name="Ngày sinh"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className={`block w-full px-4 py-3 rounded-lg border ${errors.lastName ? "border-red-500" : "border-gray-300"} focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Tuổi
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 mt-1 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        disabled={!isEditing}
                      >
                        <option value="">Lựa chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h2 className="flex items-center mb-4 text-xl font-semibold text-gray-900">
                    <FaUser className="mr-2" /> Thông tin liên hệ
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="relative mt-1">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`block w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Số điện thoại
                      </label>
                      <div className="relative mt-1">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`block w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Địa chỉ
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="block w-full px-4 py-3 mt-1 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <h2 className="flex items-center mb-4 text-xl font-semibold text-gray-900">
                <FaPen className="mr-2" /> Liên kết mạng xã hội
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                    className="block w-full px-4 py-3 mt-1 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://linkedin.com/in/username"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                    className="block w-full px-4 py-3 mt-1 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://twitter.com/username"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                    GitHub
                  </label>
                  <input
                    type="url"
                    id="github"
                    value={formData.socialLinks.github}
                    onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                    className="block w-full px-4 py-3 mt-1 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://github.com/username"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 text-white transition-colors duration-200 bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
              {isEditing && (
                <button
                  type="submit"
                  className="px-6 py-3 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;