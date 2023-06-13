import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Auth from './Auth';
import Navbar from './Navbar';
import ForgotPassword from './ForgotPassword';
import VerifyEmailToken from './VerifyEmailToken';
import Categories from './Categories';
import Products from './Products';
import ChangePassword from './ChangePassword';
import UpdateProfile from './UpdateProfile';
import AboutArtist from './AboutArtist';
import Gallery from './Gallery';
import Museums from './Museums';
import Contact from './Contact';
import Paint from './Paint';
import Cart from './Cart';
import Checkout from './Checkout';


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
