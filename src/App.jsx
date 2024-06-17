import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Login from "./components/Login";
import Meals from "./components/Meals";
import Signup from './components/Signup';
import Forgotpassword from './components/Forgotpassword';
import { CartContextProvider } from "./components/store/CartContext";
import { UserProgressContextProvider } from "./components/store/UserProgressContext";
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
      <Router>
        <Routes>
          <Route path='/Signup' element={<Signup setIsAuthenticated={setIsAuthenticated}/>}/>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/forgotpassword" element={<Forgotpassword setIsAuthenticated={setIsAuthenticated} />} />
          {isAuthenticated ? (
            <>
                <Route path="/meals" element={<>
                  <Header />
                  <Meals />
                </>} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<Navigate to="/meals"/> } />
              
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
