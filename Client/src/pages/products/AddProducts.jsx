import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProducts() {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [baseChildCategories, setBaseChildCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Fetch categories data from the server using Axios
        // axios.get('http://localhost:5000/api/category/getCategory')
        axios.get('https://product-listing-app.onrender.com/api/category/getCategory')
            .then(response => {
                // Extract base child categories recursively
                const extractBaseChildCategories = (categories) => {
                    let result = [];
                    categories.forEach(category => {
                        if (category.children && category.children.length > 0) {
                            const children = extractBaseChildCategories(category.children);
                            result = [...result, ...children];
                        } else {
                            result.push(category); 
                        }
                    });
                    return result;
                };

                const baseChildren = extractBaseChildCategories(response.data);
                setBaseChildCategories(baseChildren);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Prepare the form data
        const formData = {
            name: productName,
            price: productPrice,
            description: productDescription,
            category: selectedCategory
        };
    
        // Send the form data to the server using Axios
        axios.post('https://product-listing-app.onrender.com/api/product/addProducts', formData)
            .then(response => {
               
                console.log('Product added successfully:', response.data);
            })
            .catch(error => {
               
                console.error('Error adding product:', error);
            });
    
       
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setSelectedCategory('');
        navigate("/products");

    };
    

    return (
        <div className="container mx-auto my-8 p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Product Name:</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Price:</label>
                    <input
                        type="number"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Description:</label>
                    <textarea
                        className="mt-1 p-2 w-full border rounded-md"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Category:</label>
                    <select
                        className="mt-1 p-2 w-full border rounded-md"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {baseChildCategories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}

export default AddProducts;





