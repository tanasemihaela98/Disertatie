import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Auth from './customer/Auth';
import Navbar from './customer/Navbar';
import ForgotPassword from './customer/ForgotPassword';
import VerifyEmailToken from './customer/VerifyEmailToken';
import Categories from './customer/Categories';
import Products from './customer/Products';
import ChangePassword from './customer/ChangePassword';
import UpdateProfile from './customer/UpdateProfile';
import AboutArtist from './customer/AboutArtist';
import Gallery from './customer/Gallery';
import Museums from './customer/Museums';
import Contact from './customer/Contact';
import Paint from './customer/Paint';
import Cart from './customer/Cart';
import Checkout from './customer/Checkout';


function App() {
  return (
    <div>
     <Navbar/>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutArtist />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/museums" element={<Museums />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/paint/:id" element={<Paint />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/verify-email-token" element={<VerifyEmailToken />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
