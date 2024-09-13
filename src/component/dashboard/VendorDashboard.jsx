import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VendorDashboard = ({ onLogout }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  const handleRemoveEmployee = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold mb-8">Vendor Dashboard</h2>
          <Link to="/create-employee">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-4 transition">
              Add Employee
            </button>
          </Link>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee Management</h1>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Employee ID</th>
                  <th className="py-3 px-4 text-left">Employee Name</th>
                  <th className="py-3 px-4 text-left">Employee Post</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map(employee => (
                    <tr key={employee.id} className="even:bg-gray-50 hover:bg-gray-100">
                      <td className="py-3 px-4">{employee.id}</td>
                      <td className="py-3 px-4">{employee.name}</td>
                      <td className="py-3 px-4">{employee.post}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleRemoveEmployee(employee.id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">No employees found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
