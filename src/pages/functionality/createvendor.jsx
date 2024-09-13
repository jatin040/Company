import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CreateVendor = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    vendorName: Yup.string().required('Vendor name is required'),
    vendorUsername: Yup.string().required('Vendor username is required'),
    vendorPassword: Yup.string().required('Vendor password is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const vendor = {
      id: Date.now(),
      vendorName: values.vendorName,
      username: values.vendorUsername,
      password: values.vendorPassword,
    };

  
    const vendors = JSON.parse(localStorage.getItem('vendors')) || [];

    
    vendors.push(vendor);
    localStorage.setItem('vendors', JSON.stringify(vendors));

    
    resetForm();
    alert('Vendor added successfully!');
    navigate('/superadmin'); 
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create Vendor</h1>
      <Formik
        initialValues={{
          vendorName: '',
          vendorUsername: '',
          vendorPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="vendorName" className="block font-medium">
                Vendor Name
              </label>
              <Field
                type="text"
                name="vendorName"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="vendorName" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="vendorUsername" className="block font-medium">
                Vendor Username
              </label>
              <Field
                type="text"
                name="vendorUsername"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="vendorUsername" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="vendorPassword" className="block font-medium">
                Vendor Password
              </label>
              <Field
                type="password"
                name="vendorPassword"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="vendorPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                {isSubmitting ? 'Submitting...' : 'Create Vendor'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateVendor;
