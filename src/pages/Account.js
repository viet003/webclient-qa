import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiSearch, FiChevronLeft, FiChevronRight, FiPlusCircle } from "react-icons/fi";
import { FaSort } from "react-icons/fa";

const Account = () => {
  const [employees, setEmployees] = useState([
    {
      email: "a@gmail.com",
      employee_id: "1017403282006769665",
      type: 1,
      updatedAt: "2024-11-02T16:21:37.078Z",
      employee: { full_name: "John Doe" }
    },
    {
      email: "b@gmail.com",
      employee_id: "1017403282006900737",
      type: 2,
      updatedAt: "2024-11-02T16:21:37.078Z",
      employee: { full_name: "Jane Smith" }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    email: "",
    employee_id: "",
    type: 1,
    updatedAt: new Date().toISOString(),
    employee: { full_name: "" }
  });
  const itemsPerPage = 5;

  const filteredEmployees = employees.filter(employee =>
    Object.values(employee).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "ascending"
          ? "descending"
          : "ascending"
    });
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(employee => employee.employee_id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEmployees(employees.map(employee =>
      employee.employee_id === editingEmployee.employee_id ? editingEmployee : employee
    ));
    setShowModal(false);
    setEditingEmployee(null);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setEmployees([...employees, newEmployee]);
    setShowAddModal(false);
    setNewEmployee({
      email: "",
      employee_id: "",
      type: 1,
      updatedAt: new Date().toISOString(),
      employee: { full_name: "" }
    });
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <FiSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm theo email..."
            className="py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <FiPlusCircle />
          <span>Thêm mới</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {["Email", "Loại tài khoản", "Cập nhật", "Họ và tên"].map(key => (
                <th
                  key={key}
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <FaSort className="text-gray-400" />
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedEmployees.map((employee) => (
              <tr key={employee.employee_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{employee.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{employee.type === 0 ? "Nhân viên" : employee.type === 1 ? "Quản lý" : "Kế toán"}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{employee.updatedAt}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{employee.employee.full_name}</td>
                <td className="px-6 py-4 space-x-4 text-sm font-medium whitespace-nowrap">
                  <button onClick={() => handleEdit(employee)} className="text-blue-600 hover:text-blue-900" aria-label="Edit employee">
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(employee.employee_id)} className="text-red-600 hover:text-red-900" aria-label="Delete employee">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Hiển thị trang {((currentPage - 1) * itemsPerPage) + 1} với {Math.min(currentPage * itemsPerPage, sortedEmployees.length)} / {sortedEmployees.length} kết quả
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Edit Employee</h2>
            <form onSubmit={handleSave}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={editingEmployee.email}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={editingEmployee.employee.full_name}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, employee: { full_name: e.target.value } })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <input
                    type="number"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={editingEmployee.type}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, type: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Add New Employee</h2>
            <form onSubmit={handleAdd}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={newEmployee.employee.full_name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, employee: { full_name: e.target.value } })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <input
                    type="number"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={newEmployee.type}
                    onChange={(e) => setNewEmployee({ ...newEmployee, type: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
