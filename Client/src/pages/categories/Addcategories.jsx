import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Addcategories() {
  const [categoryName, setCategoryName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    
    axios.get('http://localhost:5000/api/category/getAllCategory')
      .then(response => {

        console.log(response.data,"response data")
        
        setAvailableCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []); 

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleParentCategoryChange = (event) => {
    setParentCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //The data to be sent in the request body
      const data = {
        name: categoryName,
        parentCategory: parentCategory
      };

     
      const response = await axios.post('http://localhost:5000/api/category/addCategories', data, {
        headers: {
          'Content-Type': 'application/json'
          
        }
      });

    
      if (response.status == 201) {
        console.log('Category added successfully!');

        navigate('/category')

       
      } else {
       
        console.error('Failed to add category.');
      }
    } catch (error) {
     
      console.error('Error:', error);
    }

    
    setCategoryName('');
    setParentCategory('');
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg rounded-lg my-20">
    <h2 className="text-3xl font-bold mb-4">Add Category</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Category Name:</label>
        <input
          className="w-full px-4 py-2 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          value={categoryName}
          onChange={handleCategoryNameChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Parent Category:</label>
        <select
          className="w-full px-4 py-2 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring focus:border-blue-300"
          value={parentCategory}
          onChange={handleParentCategoryChange}
        >
          <option value="">Select Parent Category</option>
          {availableCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button className="w-full bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300" type="submit">Add Category</button>
    </form>
  </div>
  
  
  );
}

export default Addcategories;
