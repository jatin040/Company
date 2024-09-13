import React, { useState, useEffect } from 'react';

const EmployeeDashboard = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-gray-800 text-white flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold mb-8">Employee Dashboard</h2>
          <button
            onClick={() => {
              const newProduct = {
                id: Date.now(),
                title: `Product ${products.length + 1}`,
                price: 0,
                category: 'Category',
                rating: { rate: 0, count: 0 },
                image: 'default.png',
              };
              setProducts([...products, newProduct]);
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-4 transition"
          >
            Add Product
          </button>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Management</h1>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Product ID</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Rating (Rate/Count)</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.id} className="even:bg-gray-50 hover:bg-gray-100">
                    <td className="py-3 px-4">{product.id}</td>
                    <td className="py-3 px-4">{product.title}</td>
                    <td className="py-3 px-4">{product.price}</td>
                    <td className="py-3 px-4">{product.category}</td>
                    <td className="py-3 px-4 text-center">
                      <img
                        src={product?.image}
                        alt={product.title}
                        className="w-12 h-12 rounded-full object-cover mx-auto"
                      />
                    </td>
                    <td className="py-3 px-4">
                      {product.rating.rate} / {product.rating.count}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setProducts(products.filter((p) => p.id !== product.id))}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4">
            {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-4 py-2 mx-1 rounded-full border ${
                  currentPage === number + 1
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-200 transition'
                }`}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
