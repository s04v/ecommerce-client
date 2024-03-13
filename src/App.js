import { Route, Routes } from 'react-router-dom';
import Admin from './layouts/Admin';
import Base from './layouts/Base';
import logo from './logo.svg';
import AdminCreateProduct from './screens/AdminCreateProduct';
import AdminOrders from './screens/AdminOrders';
import AdminPanel from './screens/AdminPanel';
import AdminProducts from './screens/AdminProducts';
import AdminSingleOrder from './screens/AdminSingleOrder';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Product from './screens/Product';
import Shop from './screens/Shop';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <Base>
            <Shop />
          </Base>
        } />

        <Route path="/product/:id" element={
          <Base>
            <Product />
          </Base>
        } />

        <Route path="/cart" element={
          <Base>
            <Cart />
            </Base>
        } />

        <Route path="/login" element={
          <Base>
            <Login />
          </Base>
        } />

        <Route path="/admin" element={
          <Admin>
            <AdminPanel />
          </Admin>
        } />

        <Route path="/admin/orders" element={
          <Admin>
            <AdminOrders />
          </Admin>
        } />

        <Route path="/admin/orders/:id" element={
          <Admin>
            <AdminSingleOrder />
          </Admin>
        } />

        <Route path="/admin/products" element={
          <Admin>
            <AdminProducts />
          </Admin>
        } />

        <Route path="/admin/create-product" element={
          <Admin>
            <AdminCreateProduct />
          </Admin>
        } />

        <Route path="/admin/edit-product/:id" element={
          <Admin>
            <AdminCreateProduct edit />
          </Admin>
        } />

      </Routes>
      
    </div>
  );
}

export default App;
