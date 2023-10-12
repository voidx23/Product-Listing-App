import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Category({ category, level }) {
  let bulletColorClass;
  switch (level) {
    case 0:
      bulletColorClass = 'text-red-500'; 
      break;
    case 1:
      bulletColorClass = 'text-green-500';
      break;
    case 2:
      bulletColorClass = 'text-blue-500'; 
      break;
    default:
      bulletColorClass = 'text-gray-500'; 
  }

  return (
    <li className={`mb-4 ml-${level * 4} ${bulletColorClass} list-disc`}>
      {category.name}
      {category.children && category.children.length > 0 && (
        <ul className="ml-4">
          {category.children.map((subcategory, index) => (
            <Category key={index} category={subcategory} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

function ListCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the server when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://product-listing-app.onrender.com/api/category/getCategory');

        console.log(response.data,"list category")
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className=' mx-20 my-10'>
        <div className='flex justify-between'>
      <h1 className='text-[30px]'>Categories</h1>
      <Link to={'/addCategory'}>Add Category</Link>

        </div>
        <div className='mt-10 ml-20'>
      <ul className="list-none text-[20px]">
        {categories.map((category, index) => (
          <Category key={index} category={category} level={0} />
        ))}
      </ul>

        </div>
    </div>
  );
}

export default ListCategory;
