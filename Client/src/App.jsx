import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Addcategories from "./pages/categories/Addcategories"
import ListCategory from "./pages/categories/ListCategory"
import AddProducts from "./pages/products/AddProducts"
import ListProducts from "./pages/products/ListProducts"
import PrivateRoutes from './components/privateRoutes/PrivateRoutes';
import Home from './pages/home/Home';



function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>
        <Route path="/" element={<PrivateRoutes />} >
          <Route index element={<Home/>}/>
          <Route path="category" element={<ListCategory />} />
          <Route path="addCategory" element={<Addcategories />} />
          <Route path="products" element={<ListProducts />} />
          <Route path="addProducts" element={<AddProducts />} />
          </Route>

        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App
