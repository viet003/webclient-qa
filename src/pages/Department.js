import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiSearch, FiChevronLeft, FiChevronRight, FiPlusCircle } from "react-icons/fi";
import { FaSort } from "react-icons/fa";

const Department = () => {
  const [surveys, setSurveys] = useState([
    {
      id: 1,
      title: "Customer Satisfaction Survey 2024",
      surveyorName: "John Smith",
      status: "Published",
      remarks: "Annual feedback collection"
    },
    {
      id: 2,
      title: "Employee Engagement Survey",
      surveyorName: "Sarah Johnson",
      status: "Draft",
      remarks: "Q1 2024 Assessment"
    },
    {
      id: 3,
      title: "Product Feedback Survey",
      surveyorName: "Mike Wilson",
      status: "Closed",
      remarks: "Beta testing feedback"
    },
    {
      id: 4,
      title: "Market Research Survey",
      surveyorName: "Emma Davis",
      status: "Published",
      remarks: "Competitor analysis"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSurvey, setNewSurvey] = useState({
    title: "",
    surveyorName: "",
    status: "Draft",
    remarks: ""
  });
  const itemsPerPage = 5;

  const filteredSurveys = surveys.filter(survey =>
    Object.values(survey).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedSurveys = [...filteredSurveys].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const paginatedSurveys = sortedSurveys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedSurveys.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "ascending"
          ? "descending"
          : "ascending"
    });
  };

  const handleEdit = (survey) => {
    setEditingSurvey(survey);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setSurveys(surveys.filter(survey => survey.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSurveys(surveys.map(survey =>
      survey.id === editingSurvey.id ? editingSurvey : survey
    ));
    setShowModal(false);
    setEditingSurvey(null);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const id = surveys.length > 0 ? Math.max(...surveys.map(s => s.id)) + 1 : 1;
    setSurveys([...surveys, { ...newSurvey, id }]);
    setShowAddModal(false);
    setNewSurvey({
      title: "",
      surveyorName: "",
      status: "Draft",
      remarks: ""
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800 border-green-200";
      case "Draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Closed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <FiSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search surveys..."
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
          <span>Add New Survey</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {["title", "surveyorName", "status", "remarks"].map(key => (
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
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedSurveys.map((survey) => (
              <tr key={survey.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {survey.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {survey.surveyorName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(survey.status)}`}>
                    {survey.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {survey.remarks}
                </td>
                <td className="px-6 py-4 space-x-4 text-sm font-medium whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(survey)}
                    className="text-blue-600 hover:text-blue-900"
                    aria-label="Edit survey"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(survey.id)}
                    className="text-red-600 hover:text-red-900"
                    aria-label="Delete survey"
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
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedSurveys.length)} of {sortedSurveys.length} results
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
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Edit Survey</h2>
            <form onSubmit={handleSave}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={editingSurvey.title}
                    onChange={(e) => setEditingSurvey({...editingSurvey, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Surveyor Name</label>
                  <input
                    type="text"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={editingSurvey.surveyorName}
                    onChange={(e) => setEditingSurvey({...editingSurvey, surveyorName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={editingSurvey.status}
                    onChange={(e) => setEditingSurvey({...editingSurvey, status: e.target.value})}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Remarks</label>
                  <input
                    type="text"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={editingSurvey.remarks}
                    onChange={(e) => setEditingSurvey({...editingSurvey, remarks: e.target.value})}
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

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Add New Survey</h2>
            <form onSubmit={handleAdd}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={newSurvey.title}
                    onChange={(e) => setNewSurvey({...newSurvey, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Surveyor Name</label>
                  <input
                    type="text"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={newSurvey.surveyorName}
                    onChange={(e) => setNewSurvey({...newSurvey, surveyorName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={newSurvey.status}
                    onChange={(e) => setNewSurvey({...newSurvey, status: e.target.value})}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Remarks</label>
                  <input
                    type="text"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={newSurvey.remarks}
                    onChange={(e) => setNewSurvey({...newSurvey, remarks: e.target.value})}
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
                  Add Survey
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Department;
