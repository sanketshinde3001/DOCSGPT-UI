import React, { useState } from 'react';
import { FiLoader } from 'react-icons/fi';

const CollectFromWebsiteForm: React.FC = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    link: '',
  });
  const [selectedOption, setSelectedOption] = useState('From URL');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLinkPaste = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      link: value,
    });

    // Simulate fetching animation for link paste
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
      // Handle link fetching logic here (API call, etc.)
    }, 2000);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-700">Collect from a website</h2>

      <div className="space-y-4">
        {/* Dropdown */}
        <select
          value={selectedOption}
          onChange={handleSelectChange}
          className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 p-2 text-gray-600"
        >
          <option value="From URL">From URL</option>
          <option value="From API">From API</option>
          <option value="From HTML">From HTML</option>
        </select>

        {/* Name input field */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 p-2 text-gray-600"
          placeholder="Enter name"
        />

        {/* Link input field */}
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleLinkPaste}
          className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 p-2 text-gray-600"
          placeholder="URL Link"
        />

        {/* Fetching animation */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm">Fetching</span>
          {isFetching && <FiLoader className="animate-spin text-indigo-500 text-lg" />}
        </div>
      </div>
    </div>
  );
};

export default CollectFromWebsiteForm;
