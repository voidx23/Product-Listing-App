import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductListing() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://product-listing-app.onrender.com/api/product/getData')
            .then(response => {
                setProducts(response.data.products);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div className="container mx-auto my-8 p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Product Listing</h2>
            {products.map(product => (
                <div key={product._id} className="mb-4">
                    <h3 className="text-lg font-semibold">{product.productName}</h3>
                    <p>Price: ${product.productPrice}</p>
                    <p>Description: {product.productDescription}</p>
                </div>
            ))}
        </div>
    );
}

export default ProductListing;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ProductListing() {
//     const [categories, setCategories] = useState([]);
//     const [totalElectronicsProducts, setTotalElectronicsProducts] = useState(0);

//     useEffect(() => {
//         axios.get('https://product-listing-app.onrender.com/api/product/getData') 
//             .then(response => {
//                 setCategories(response.data.category);
//                 console.log(response.data)

//                 const electronicsCategory = response.data.category.find(category => category.name === 'Electronics');
//                 if (electronicsCategory) {
//                     const totalProducts = countProductsInCategory(electronicsCategory, response.data.products);
//                     setTotalElectronicsProducts(totalProducts);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     }, []);

//     const countProductsInCategory = (category, products) => {
//         let totalCount = 0;
//         if (category.products) {
//             totalCount += category.products.length;
//         }
//         if (category.children) {
//             category.children.forEach(child => {
//                 totalCount += countProductsInCategory(child, products);
//             });
//         }
//         return totalCount;
//     };

//     return (
//         <div className="container mx-auto my-8 p-8 bg-white shadow-lg rounded-lg">
//             <h2 className="text-2xl font-semibold mb-4">Product Listing</h2>
//             <div className="mb-4">
//                 <h3 className="text-lg font-semibold">Electronics</h3>
//                 <p>Total Products: {totalElectronicsProducts}</p>
//             </div>
//             {categories.map(category => (
//     <div key={category._id} className="mb-4">
//         <h3 className="text-lg font-semibold">{category.name}</h3>
//         <p>Total Products: {countProductsInCategory(category, products)}</p>
//         {category.children && category.children.map(childCategory => (
//             <div key={childCategory._id} className="ml-4">
//                 <h4 className="text-md font-semibold">{childCategory.name}</h4>
//                 <p>Total Products: {countProductsInCategory(childCategory, products)}</p>
//                 {childCategory.products && childCategory.products.map(product => (
//                     <div key={product._id} className="ml-4">
//                         <h5 className="text-sm font-semibold">{product.productName}</h5>
//                         <p>Price: ${product.productPrice}</p>
//                         <p>Description: {product.productDescription}</p>
//                     </div>
//                 ))}
//             </div>
//         ))}
//         {category.products && category.products.map(product => (
//             <div key={product._id} className="ml-4">
//                 <h4 className="text-md font-semibold">{product.productName}</h4>
//                 <p>Price: ${product.productPrice}</p>
//                 <p>Description: {product.productDescription}</p>
//             </div>
//         ))}
//     </div>
// ))}

//         </div>
//     );
// }

// export default ProductListing;
