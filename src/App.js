import React from "react"
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Checkout from "./Components/Checkout/Checkout";
import Login from "./Pages/Login/login"
import { auth } from "./firebase";
import { useStateValue } from "./Context/StateProvider";
import Payment from "./Components/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";


function App() {
  const [state, dispatch] = useStateValue();

    const promise = loadStripe(
      "pk_test_51KzdcZBuWfpOWtPjCWlSdDN3eFrsmDrY5VrePYQZpXCS120PhdIIU60VpnS0C2nK3nz9hb40rszv3FS6sNoQzwuV00ZiOF7Dbm"
    );

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
            <Route
              index
              element={
                <>
                  <Header /> <Home />
                </>
              }
            />
            <Route
              path="/checkout"
              element={
                <>
                  <Header /> <Checkout />
                </>
              }
            />
            <Route
              path="/product/:productId"
              element={
                <>
                  <Header /> <ProductDetail />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/payment"
              element={
                <>
                  <Header />{" "}
                  <Elements stripe={promise}>
                    <Payment />
                  </Elements>
                </>
              }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
