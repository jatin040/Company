import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
  const navigate = useNavigate();


  const validationSchema = Yup.object({
    name: Yup.string().required('Employee name is required'),
    post: Yup.string().required('Employee post is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  
  const onSubmit = (values, { resetForm }) => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const newEmployee = {
      id: employees.length + 1,
      name: values.name,
      post: values.post,
      username: values.username,
      password: values.password,
      createdAt: new Date().toISOString()
    };

    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));

    alert('Employee created successfully!');
    resetForm();
    navigate('/vendor');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Employee</h2>
      <Formik
        initialValues={{ name: '', post: '', username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Employee Name</label>
            <Field type="text" id="name" name="name" className="mt-1 p-2 border w-full rounded" />
            <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="post" className="block text-gray-700">Employee Post</label>
            <Field type="text" id="post" name="post" className="mt-1 p-2 border w-full rounded" />
            <ErrorMessage name="post" component="div" className="text-red-600 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <Field type="text" id="username" name="username" className="mt-1 p-2 border w-full rounded" />
            <ErrorMessage name="username" component="div" className="text-red-600 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <Field type="password" id="password" name="password" className="mt-1 p-2 border w-full rounded" />
            <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Create Employee</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateEmployee;
