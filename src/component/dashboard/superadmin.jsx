import React, { useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import { Link } from 'react-router-dom';

const SuperAdminDashboard = ({ onLogout }) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const storedVendors = JSON.parse(localStorage.getItem('vendors')) || [];
    setVendors(storedVendors);
  }, []);

  const handleRemoveVendor = (id) => {
    const updatedVendors = vendors.filter(vendor => vendor.id !== id);
    setVendors(updatedVendors);
    localStorage.setItem('vendors', JSON.stringify(updatedVendors));
  };

  const data = React.useMemo(() => vendors, [vendors]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Vendor Name',
        accessor: 'vendorName',
      },
      {
        Header: 'Vendor Username',
        accessor: 'vendorUsername',
      },
      {
        Header: 'Vendor Password',
        accessor: 'vendorPassword',
      },
      {
        Header: 'Created On',
        accessor: 'id',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <button
            onClick={() => handleRemoveVendor(row.original.id)}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition"
          >
            Remove
          </button>
        ),
        id: 'actions',
      },
    ],
    [vendors]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      pageSize: 5,
    },
    usePagination
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold mb-8">SuperAdmin</h2>
          <Link to="/create-vendor">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-4 transition">
              Create a Vendor
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
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Vendor Management</h1>

          {/* Table */}
          <div className="overflow-x-auto">
            <table {...getTableProps()} className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()} className="py-3 px-4 text-left">
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page?.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row?.getRowProps()} className="even:bg-gray-50 hover:bg-gray-100">
                      {row.cells?.map(cell => (
                        <td {...cell.getCellProps()} className="py-3 px-4">
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="px-4 py-2 mx-1 rounded-full border bg-white text-gray-800 border-gray-300 hover:bg-gray-200 transition"
            >
              Previous
            </button>
            <span className="px-4 py-2 mx-1">
              Page {pageIndex + 1} of {pageOptions.length}
            </span>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="px-4 py-2 mx-1 rounded-full border bg-white text-gray-800 border-gray-300 hover:bg-gray-200 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
