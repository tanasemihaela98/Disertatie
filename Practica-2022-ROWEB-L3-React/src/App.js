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
import Payment from './customer/Payment';
import AdminPaints from './admin/paints';
import Navigation from './admin/components/navigation';
import AdminOrders from './admin/orders';
import AdminContacts from './admin/contacts';


function App() {
  return (
    <div>
     {/* <Navbar/> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar/><AboutArtist /></>} />
        <Route path="/auth" element={<><Navbar/><Auth /></>} />
        <Route path="/gallery" element={<><Navbar/><Gallery /></>} />
        <Route path="/cart" element={<><Navbar/><Cart /></>} />
        <Route path="/museums" element={<><Navbar/><Museums /></>} />
        <Route path="/checkout" element={<><Navbar/><Checkout /></>} />
        <Route path="/payment" element={<><Navbar/><Payment /></>} />
        <Route path="/contact" element={<><Navbar/><Contact /></>} />
        <Route path="/paint/:id" element={<><Navbar/><Paint /></>} />
        <Route path="/forgot-password" element={<><Navbar/><ForgotPassword /></>} />
        <Route path="/change-password" element={<><Navbar/><ChangePassword /></>} />
        <Route path="/verify-email-token" element={<><Navbar/><VerifyEmailToken /></>} />
        <Route path="/categories" element={<><Navbar/><Categories /></>} />
        <Route path="/products" element={<><Navbar/><Products /></>} />
        <Route path="/update-profile/" element={<><Navbar/><UpdateProfile /></>} />
        <Route path="/admin/paints" element={ <><Navigation/><AdminPaints/></> } />
        <Route path="/admin/orders" element={ <><Navigation/><AdminOrders/></> } />
        <Route path="/admin/contacts" element={ <><Navigation/><AdminContacts/></> } />

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
