import React, { useState, useEffect } from "react";
import { FiTrash2, FiSearch, FiChevronLeft, FiChevronRight, FiPlusCircle } from "react-icons/fi";
import { FaSort } from "react-icons/fa";
import * as apiService from "../services";
import { handleCheckError } from "../ultils/checkFunction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './../components/Spinner';
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const SalaryTax = () => {
  const [salarytaxes, setSalarytaxes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [filteredSalarytaxes, setFilteredSalarytaxes] = useState([]);
  const [paginatedSalarytaxes, setPaginatedSalarytaxes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 5;
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useSelector(state => state.auth)
  const type = token ? jwtDecode(token) : 0;
  const employee_id = token ? jwtDecode(token) : null

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const salarytaxResponse = await apiService.apiAllMonthSalaries(type === 2 ? { employee_id: employee_id } : {})

      if (salarytaxResponse?.status === 200 && salarytaxResponse?.data?.err === 0) {
        setSalarytaxes(salarytaxResponse.data.data);
      } else {
        toast.warn("Không thể tải dữ liệu.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi khi tải dữ liệu.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const filtered = salarytaxes
      .filter(salarytax =>
        salarytax.employee?.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key] || "";
        const bValue = b[sortConfig.key] || "";
        if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });

    setFilteredSalarytaxes(filtered);

    const paginated = filtered.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    setPaginatedSalarytaxes(paginated);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [salarytaxes, searchTerm, sortConfig, currentPage]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await apiService.apiDeleteSalaryTax({ id });
      if (response?.status === 200 && response?.data?.err === 0) {
        await fetchData();
      } else {
        toast.warn(response?.data?.msg);
      }
    } catch (error) {
      console.error("Error deleting salary tax data:", error);
      toast.error("Lỗi khi xóa dữ liệu thuế lương.");
    }
    setIsLoading(false);
  };

  function formatToVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <Spinner
        isOpen={isLoading}
        onClose={() => setIsLoading(false)}
        message="Loading....."
      />
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <FiSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            className="py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => {}}
          className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <FiPlusCircle />
          <span>Quyết toán</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {[
                { label: "Họ và tên", key: "employee.full_name" },
                { label: "Phòng ban", key: "employee.department.department_name" },
                { label: "Tháng", key: "month" },
                { label: "Năm", key: "year" },
                { label: "Lương cơ bản", key: "employee.salaries[0].base_salary" },
                { label: "Khấu trừ", key: "deduction" },
                { label: "Lương nhận", key: "total_salary" },
                { label: "Thuế", key: "tax" }
              ].map(({ label, key }) => (
                <th
                  key={key}
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    <FaSort className="text-gray-400" />
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedSalarytaxes.map((salary) => (
              <tr key={salary.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{salary.employee.full_name}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{salary.employee.department.department_name}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{salary.month}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{salary.year}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {formatToVND(salary.employee.salaries[0]?.base_salary)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{formatToVND(salary.deduction)}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{formatToVND(salary.total_salary)}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{formatToVND(salary.tax)}</td>
                <td className="flex justify-center px-6 py-4 space-x-4 text-sm font-medium whitespace-nowrap">
                  <button onClick={() => handleDelete(salary.id)} className="text-red-600 hover:text-red-900" aria-label="Delete salary">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Hiển thị trang {((currentPage - 1) * itemsPerPage) + 1} với {Math.min(currentPage * itemsPerPage, filteredSalarytaxes.length)} / {filteredSalarytaxes.length} kết quả
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer disabled:opacity-50"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer disabled:opacity-50"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalaryTax;