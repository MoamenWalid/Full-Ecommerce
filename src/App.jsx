import { Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import Account from "./components/form/Account"
import Home from './components/pages/home/Home.jsx';
import Products from "./components/pages/products/Products.jsx";
import MyAccount from "./components/pages/myAccount/MyAccount.jsx";
import Wishlist from "./components/pages/wishlist/Wishlist.jsx";
import Cart from "./components/pages/cart/Cart.jsx";
import ProductBuying from "./components/pages/productBuying/ProductBuying.jsx";
import Contact from "./components/pages/contact/Contact.jsx";
import About from "./components/pages/about/About.jsx";
import Footer from "./components/footer/Footer"
import NotFound from "./components/pages/notFound/NotFound.jsx";
import { useSelector } from "react-redux";


function App() {
  const { userId } = useSelector(state => state.user);
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/sign-up" element={userId ? <NotFound /> : <Account heading='Create an account' statusUser='sign-up'/>}/>
        <Route path="/log-in" element={userId ? <NotFound /> : <Account heading='Log in to Exclusive' statusUser='log-in'/>}/>
        <Route path="/account" element={userId ? <MyAccount /> : <NotFound />}/>
        <Route path="products/:type" element={<Products />}/>
        <Route path="products/:cat/:id" element={<ProductBuying />}/>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </> 
  )
}

export default App
