import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiSearch, FiChevronLeft, FiChevronRight, FiPlusCircle } from "react-icons/fi";
import { FaSort } from "react-icons/fa";

const Employee = () => {
  const [employees, setEmployees] = useState([
    {
      full_name: "John Doe",
      dob: "1985-01-15T00:00:00.000Z",
      gender: 1,
      phone_number: "123456789",
      address: "123 Main St",
      dependent_number: 2,
      updatedAt: "2024-11-02T14:19:03.870Z",
      department: { department_name: "HR" }
    },
    {
      full_name: "Jane Smith",
      dob: "1990-06-20T00:00:00.000Z",
      gender: 2,
      phone_number: "987654321",
      address: "456 Elm St",
      dependent_number: 1,
      updatedAt: "2024-11-02T14:19:03.870Z",
      department: { department_name: "Engineering" }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [paginatedEmployees, setPaginatedEmployees] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  const [newEmployee, setNewEmployee] = useState({
    full_name: "",
    dob: "",
    gender: 1,
    phone_number: "",
    address: "",
    dependent_number: 0,
    updatedAt: new Date().toISOString(),
    department: { department_name: "" }
  });

  useEffect(() => {
    const filtered = employees
      .filter((employee) =>
        employee.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key] || "";
        const bValue = b[sortConfig.key] || "";
        if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });

    setFilteredEmployees(filtered);

    const paginated = filtered.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    setPaginatedEmployees(paginated);

    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [employees, searchTerm, sortConfig, currentPage]);

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

  const handleDelete = (phone_number) => {
    setEmployees(employees.filter(employee => employee.phone_number !== phone_number));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEmployees(employees.map(employee =>
      employee.phone_number === editingEmployee.phone_number ? { ...editingEmployee, updatedAt: new Date().toISOString() } : employee
    ));
    setShowModal(false);
    setEditingEmployee(null);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newEmployeeData = { ...newEmployee, updatedAt: new Date().toISOString() };
    setEmployees([...employees, newEmployeeData]);
    setShowAddModal(false);
    setNewEmployee({
      full_name: "",
      dob: "",
      gender: 1,
      phone_number: "",
      address: "",
      dependent_number: 0,
      updatedAt: new Date().toISOString(),
      department: { department_name: "" }
    });
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
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
              {[
                { label: "Họ tên", key: "full_name" },
                { label: "Ngày sinh", key: "dob" },
                { label: "Giới tính", key: "gender" },
                { label: "Số điện thoại", key: "phone_number" },
                { label: "Địa chỉ", key: "address" },
                { label: "Phòng ban", key: "department.department_name" },
                { label: "Phụ thuộc", key: "dependent_number" },
                { label: "Cập nhật", key: "updatedAt" }
              ].map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
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
            {paginatedEmployees.map((employee) => (
              <tr key={employee.phone_number} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {employee.full_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {new Date(employee.dob).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {employee.gender === 0 ? "Male" : "Female"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {employee.phone_number}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {employee.address}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {employee.department.department_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {employee.dependent_number}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {new Date(employee.updatedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 space-x-4 text-sm font-medium whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="text-blue-600 hover:text-blue-900"
                    aria-label="Edit employee"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(employee.phone_number)}
                    className="text-red-600 hover:text-red-900"
                    aria-label="Delete employee"
                  >
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
          Hiển thị trang {((currentPage - 1) * itemsPerPage) + 1} với {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} / {filteredEmployees.length} kết quả
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-[700px]">
            <h2 className="mb-4 text-xl font-bold">Cập nhật thông tin</h2>
            <form onSubmit={handleSave}>
              <div className="flex flex-row items-start gap-5 space-y-4">
                <div className="flex flex-col w-full mt-4">
                  <label className="block mt-2 text-sm font-medium text-gray-700">Họ và tên</label>
                  <input type="text" value={editingEmployee.full_name} onChange={(e) => setEditingEmployee({ ...editingEmployee, full_name: e.target.value })} className="w-full p-2 border rounded" />

                  <label className="block mt-2 text-sm font-medium text-gray-700">Ngày sinh</label>
                  <input type="date" value={editingEmployee.dob.split('T')[0]} onChange={(e) => setEditingEmployee({ ...editingEmployee, dob: e.target.value })} className="w-full p-2 border rounded" />

                  <label className="block mt-2 text-sm font-medium text-gray-700">Giới tính</label>
                  <select value={editingEmployee.gender} onChange={(e) => setEditingEmployee({ ...editingEmployee, gender: parseInt(e.target.value) })} className="w-full p-2 border rounded">
                    <option value={0}>Nam</option>
                    <option value={1}>Nữ</option>
                  </select>
                </div>

                <div className="flex flex-col w-full">
                  <label className="block mt-2 text-sm font-medium text-gray-700">Số điện thoại</label>
                  <input type="text" value={editingEmployee.phone_number} onChange={(e) => setEditingEmployee({ ...editingEmployee, phone_number: e.target.value })} className="w-full p-2 border rounded" />

                  <label className="block mt-2 text-sm font-medium text-gray-700">Địa chỉ</label>
                  <input type="text" value={editingEmployee.address} onChange={(e) => setEditingEmployee({ ...editingEmployee, address: e.target.value })} className="w-full p-2 border rounded" />

                  <label className="block mt-2 text-sm font-medium text-gray-700">Phòng ban</label>
                  <input type="text" value={editingEmployee.department.department_name} onChange={(e) => setEditingEmployee({ ...editingEmployee, department: { department_name: e.target.value } })} className="w-full p-2 border rounded" />

                  <label className="block mt-2 text-sm font-medium text-gray-700">Số người phụ thuộc</label>
                  <input type="number" value={editingEmployee.dependent_number} onChange={(e) => setEditingEmployee({ ...editingEmployee, dependent_number: parseInt(e.target.value) })} className="w-full p-2 border rounded" />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">Đóng</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Cập nhật</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-[700px]">
            <h2 className="mb-4 text-xl font-bold">Thêm mới</h2>
            <form onSubmit={handleAdd}>
              <div className="flex flex-row items-start gap-5 space-y-4">
                <div className="flex flex-col w-full mt-4">
                  <label className="block mt-2 text-sm font-medium text-gray-700">Họ và tên</label>
                  <input type="text" value={newEmployee.full_name} onChange={(e) => setNewEmployee({ ...newEmployee, full_name: e.target.value })} className="w-full p-2 border rounded" />

                  <label className="block mt-2 text-sm font-medium text-gray-700">Ngày sinh</label>
                  <input type="date" value={newEmployee.dob} onChange={(e) => setNewEmployee({ ...newEmployee, dob: e.target.value })} className="w-full p-2 border rounded" />

                  <label className="block mt-2 text-sm font-medium text-gray-700">Giới tính</label>
                  <select value={newEmployee.gender} onChange={(e) => setNewEmployee({ ...newEmployee, gender: parseInt(e.target.value) })} className="w-full p-2 border rounded">
                    <option value={0}>Nam</option>
                    <option value={1}>Nữ</option>
                  </select>
                </div>

                <div className="flex flex-col w-full">
                  <label className="block mt-2 text-sm font-medium text-gray-700">Số điện thoại</label>
                  <input type="text" value={newEmployee.phone_number} onChange={(e) => setNewEmployee({ ...newEmployee, phone_number: e.target.value })} className="w-full p-2 border rounded" />

                  <label className="block mt-2 text-sm font-medium text-gray-700">Địa chỉ</label>
                  <input type="text" value={newEmployee.address} onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })} className="w-full p-2 border rounded" />

                  <label className="block mt-2 text-sm font-medium text-gray-700">Phòng ban</label>
                  <input type="text" value={newEmployee.department.department_name} onChange={(e) => setNewEmployee({ ...newEmployee, department: { department_name: e.target.value } })} className="w-full p-2 border rounded" />

                  <label className="block mt-2 text-sm font-medium text-gray-700">Số người phụ thuộc</label>
                  <input type="number" value={newEmployee.dependent_number} onChange={(e) => setNewEmployee({ ...newEmployee, dependent_number: parseInt(e.target.value) })} className="w-full p-2 border rounded" />
                </div>
              </div>

              <div className="flex justify-end mt-4 space-x-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">Đóng</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Thêm mới</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
