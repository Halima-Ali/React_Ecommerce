import React from "react"
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Checkout from "./Components/Checkout/Checkout";
import Login from "./Pages/Login/login"
import { auth } from "./firebase";
import { useStateValue } from "./Context/StateProvider";


function App() {
  const [state, dispatch] = useStateValue();

  React.useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    }
    );
  }, [dispatch]);



  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/">
            <Route index element={<><Header /> <Home /></>} />
            <Route path="/checkout" element={<><Header /> <Checkout /></>} />
            <Route path="/product/:productId" element={<><Header /> <ProductDetail /></>} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
