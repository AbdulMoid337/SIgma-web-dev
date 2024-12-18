import React, { useState } from "react";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    name: '',
    password: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create or retrieve existing array from localStorage
    const existingData = JSON.parse(localStorage.getItem('InputValues')) || [];
    // Ensure existingData is an array
    const dataArray = Array.isArray(existingData) ? existingData : [];
    // Add new formData to the array
    dataArray.push(formData);
    // Save updated array back to localStorage
    localStorage.setItem('InputValues', JSON.stringify(dataArray));
    // Optionally, you can clear the form after saving
    setFormData({ url: '', name: '', password: '' });
  };

  // Retrieve existing data from localStorage
  const existingData = JSON.parse(localStorage.getItem('InputValues')) || [];

  return (
    <div className="absolute inset-0 -z-10 h-full w-full flex flex-col items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] overflow-y-auto">
      {/* PassOP Logo */}
      <div className="flex flex-col items-center mb-5">
        <div className="logo font-bold text-white text-3xl mb-2">
          <span className="text-green-500"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>
        <h2 className="text-white text-xl">Your own password Manager</h2>
      </div>

      {/* Input Fields */}
      <form className="flex flex-col items-center w-full max-w-md mx-auto mb-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="Enter URL Link"
          className="mb-2 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Name"
          className="mb-2 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="relative mb-2 w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-2"
          >
            {showPassword ? (
              <i className="ri-eye-off-line" style={{ fontSize: '20px', color: 'white' }}></i>
            ) : (
              <i className="ri-eye-line" style={{ fontSize: '20px', color: 'white' }}></i>
            )}
          </button>
        </div>
        <button className="bg-green-700 text-white rounded p-2 w-full flex items-center justify-center hover:bg-green-600 transition duration-300">
          Add Password
          <lord-icon
            src="https://cdn.lordicon.com/hqymfzvj.json"
            trigger="hover"
            style={{ width: '25px', height: '25px', transition: 'transform 0.3s', paddingLeft: '4px' }}
          />
        </button>
      </form>

      {/* Scrollable container for the table */}
      <div className="overflow-y-auto max-h-60 w-auto mx-auto">
        {/* Table to display saved passwords */}
        {existingData.length === 0 ? (
          <p className="text-center text-gray-500">No passwords found.</p>
        ) : (
          <table className="min-w-full w-[70vw] bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-green-700 text-white sticky top-0">
              <tr>
                <th className="py-1 px-4 border-b text-center">URL</th>
                <th className="py-1 px-4 border-b text-center">Username</th>
                <th className="py-1 px-4 border-b text-center">Password</th>
              </tr>
            </thead>
            <tbody>
              {existingData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-1 px-4 border-b text-center">{data.url}</td>
                  <td className="py-1 px-4 border-b text-center">{data.name}</td>
                  <td className="py-1 px-4 border-b text-center">{data.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
