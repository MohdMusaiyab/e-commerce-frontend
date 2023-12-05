import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import Private from "./components/routes/Private";
import ForgotPassword from "./pages/ForgotPassword";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import SingleCategory from "./pages/SingleCategory";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/admin/AdminOrders";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        {/* Here we are makin the routes below to be private */}
        <Route path="/search" element={<Search></Search>}></Route>
        {/* For Proudct info */}
        <Route path="/product/:slug" element={<ProductDetail></ProductDetail>}></Route>
        {/* For All Categorie */}
        <Route path="/categories" element={<Category></Category>}></Route>
        {/* //For Single Category */}
        <Route path="/category/:slug" element={<SingleCategory></SingleCategory>}></Route>
        {/* now for the cart page */}
        <Route path="/cart" element={<CartPage></CartPage>}></Route>

    {/* Protected routes for User Dashboard */}
        <Route path="/dashboard" element={<Private></Private>}>
          <Route path="user" element={<Dashboard></Dashboard>} />
          <Route path="user/orders" element={<Orders></Orders>} />
          <Route path="user/profile" element={<Profile></Profile>} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute></AdminRoute>}>
          <Route
            path="admin"
            element={<AdminDashboard></AdminDashboard>}
          ></Route>
          <Route
            path="admin/create-category"
            element={<CreateCategory></CreateCategory>}
          ></Route>
          <Route
            path="admin/create-product"
            element={<CreateProduct></CreateProduct>}
          ></Route>
            <Route
            path="admin/product/:slug"
            element={<UpdateProduct></UpdateProduct>}
          ></Route>
           <Route
            path="admin/orders"
            element={<AdminOrders></AdminOrders>}
          ></Route>
          <Route path="admin/users" element={<Users></Users>}></Route>
          <Route path="admin/products" element={<Products></Products>}></Route>
        </Route>
        <Route
          path="/forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/policy" element={<Policy></Policy>}></Route>
        <Route path="/login" element={<Login> </Login>}></Route>
        {/* ye wala tab kaam krega jab uppr ka koi bhi link naa kaaam kre */}
        <Route path="*" element={<Pagenotfound></Pagenotfound>}></Route>
      </Routes>
    </>
  );
}

export default App;
