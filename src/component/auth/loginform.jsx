import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();

  const initialValues = {
    role: 'superadmin',
    username: '',
    password: ''
  };

  const validationSchema = Yup.object({
    role: Yup.string().required('Role is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const onSubmit = (values) => {
    try {
      const storedVendors = JSON.parse(localStorage.getItem('vendors')) || [];
      const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
      const storedSuperAdmin = {
        username: 'Admin',
        password: "Admin123"
      };

      if (values.role === 'superadmin') {
        if (
          storedSuperAdmin?.username.trim().toLowerCase() === values.username.trim().toLowerCase() &&
          storedSuperAdmin?.password === values.password
        ) {
          onLogin('superadmin');
          alert('Super Admin login successful!');
          navigate('/superadmin');
        } else {
          alert('Invalid username or password for Super Admin');
        }
      } else if (values.role === 'vendor') {
        const vendor = storedVendors.find(v => 
          v.username.trim().toLowerCase() === values.username.trim().toLowerCase() &&
          v.password.trim() === values.password
        );
        if (vendor) {
          onLogin('vendor');
          alert('Vendor login successful!');
          navigate('/vendor');
        } else {
          alert('Invalid username or password for Vendor');
        }
      } else if (values.role === 'employee') {
        const employee = storedEmployees.find(e => 
          e.username.trim().toLowerCase() === values.username.trim().toLowerCase() &&
          e.password.trim() === values.password
        );
        if (employee) {
          onLogin('employee');
          alert('Employee login successful!');
          navigate('/employee');
        } else {
          alert('Invalid username or password for Employee');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred while trying to log in. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="space-y-6">
            <div>
              <label htmlFor="role" className="block text-gray-700 font-medium">Role</label>
              <Field as="select" id="role" name="role" className="mt-1 p-2 border w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="superadmin">Super Admin</option>
                <option value="vendor">Vendor</option>
                <option value="employee">Employee</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
              <Field type="text" id="username" name="username" className="mt-1 p-2 border w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
              <Field type="password" id="password" name="password" className="mt-1 p-2 border w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
