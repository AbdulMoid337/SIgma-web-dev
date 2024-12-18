import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    url: "",
    name: "",
    password: "",
  });
  const [existingData, setExistingData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("InputValues")) || [];
    setExistingData(data);
  }, []);

  const notify = () => toast("Please Enter The Details");
  const notifyCopy = (data) => toast(`${data} copied to clipboard!`);
  const deleteToast = () => toast("Deleted Successfully");
  const editToast = () => toast("Updated Successfully");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.url || !formData.name || !formData.password) {
      notify();
      return;
    }

    if (editingId) {
      const updatedData = existingData.map((entry) =>
        entry.id === editingId ? { ...formData, id: editingId } : entry
      );
      localStorage.setItem("InputValues", JSON.stringify(updatedData));
      setExistingData(updatedData);
      editToast();
      setEditingId(null);
    } else {
      const newEntry = { ...formData, id: uuidv4() };
      const updatedData = [...existingData, newEntry];
      localStorage.setItem("InputValues", JSON.stringify(updatedData));
      setExistingData(updatedData);
    }

    setFormData({ url: "", name: "", password: "" });
  };

  const handleDelete = (id) => {
    const updatedData = existingData.filter((data) => data.id !== id);
    localStorage.setItem("InputValues", JSON.stringify(updatedData));
    setExistingData(updatedData);
  };

  const handleEdit = (data) => {
    setFormData({
      url: data.url,
      name: data.name,
      password: data.password,
    });
    setEditingId(data.id);
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-5 py-24 overflow-y-auto">
      <ToastContainer className="pt-12" />
      <div className="flex flex-col items-center mt-0 mb-5">
        <div className="logo font-bold text-white mt-0 text-3xl mb-2 top-24 absolute">
          <span className="text-green-500"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>
        <h2 className="text-white absolute top-32 text-xl">
          Your own password Manager
        </h2>
      </div>

      {/* Input Fields */}
      <form
        className="flex flex-col items-center w-full max-w-md mx-auto mb-2"
        onSubmit={handleSubmit}
      >
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
              <i className="ri-eye-close-fill"></i>
            ) : (
              <i className="ri-eye-fill"></i>
            )}
          </button>
        </div>
        <button className="bg-green-700 text-white rounded p-2 w-full flex items-center justify-center hover:bg-green-600 transition duration-300">
          Save
          <lord-icon
            src="https://cdn.lordicon.com/hqymfzvj.json"
            trigger="hover"
            className="cursor-pointer"
            style={{
              width: "25px",
              height: "25px",
              transition: "transform 0.3s",
              paddingLeft: "4px",
            }}
          />
        </button>
      </form>

      {/* Scrollable container for the table */}
      <div className=" w-auto mx-auto md:w-auto">
        {/* Table to display saved passwords */}
        {existingData.length === 0 ? (
          <p className="text-center text-gray-500">No passwords found.</p>
        ) : (
          <table className="min-w-full w-[70vw] bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden mb-16 mt-6 text-center">
            <thead className="bg-green-700 text-white sticky top-0">
              <tr>
                <th className="py-1 px-4 border-b text-center">URL</th>
                <th className="py-1 px-4 border-b text-center">Username</th>
                <th className="py-1 px-4  border-b text-center">Password</th>
                <th className="py-1 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {existingData.map((data) => (
                <tr key={data.id} className="hover:bg-gray-100">
                  <td className="py-1 border-b text-center">
                    <div className="flex items-center justify-center">
                      <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center"
                      >
                        {data.url}
                      </a>
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{
                          cursor: "pointer",
                          width: "25px",
                          height: "25px",
                          transition: "transform 0.3s",
                          paddingLeft: "4px",
                        }}
                        onClick={() => {
                          navigator.clipboard.writeText(data.url);
                          notifyCopy("URL");
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-1 border-b text-center">
                    <div className="flex items-center justify-center">
                      {data.name}
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{
                          cursor: "pointer",
                          width: "25px",
                          height: "25px",
                          transition: "transform 0.3s",
                          paddingLeft: "4px",
                        }}
                        onClick={() => {
                          navigator.clipboard.writeText(data.name);
                          notifyCopy("Username");
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-1 border-b text-center">
                    <div className="flex items-center justify-center">
                      {data.password.length > 3
                        ? data.password.slice(0, 3) +
                          "*".repeat(data.password.length - 3)
                        : data.password}
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{
                          cursor: "pointer",
                          width: "25px",
                          height: "25px",
                          transition: "transform 0.3s",
                          paddingLeft: "4px",
                        }}
                        onClick={() => {
                          navigator.clipboard.writeText(data.password);
                          notifyCopy("Password");
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-1 px-4 border-b text-center">
                    <div className="flex gap-3">
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{
                          cursor: "pointer",
                          width: "25px",
                          height: "20px",
                          transition: "transform 0.3s",
                        }}
                        onClick={() => handleEdit(data)}
                      ></lord-icon>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{
                          cursor: "pointer",
                          width: "25px",
                          height: "20px",
                          transition: "transform 0.3s",
                        }}
                        onClick={() => {
                          handleDelete(data.id);
                          deleteToast();
                        }}
                      ></lord-icon>
                    </div>
                  </td>
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
