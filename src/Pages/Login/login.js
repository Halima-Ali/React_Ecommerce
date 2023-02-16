import React from "react";
import "./login.css";
import { Link } from "react-router-dom"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";


export default function Login() {
  return (
    <div className="login">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="login__logo">
          <ShoppingBagIcon className="login__logoIcon" />
          <span>
            Shop<span className="orange">Cart</span>
          </span>
        </div>
      </Link>
      <div className="login__container">
        <form>
          <h5>Email Address</h5>
          <input type="text" />
          <h5>Paasword</h5>
          <input type="password" />
          <button className="login__button">Login</button>
          <p>If you don't have an account, create an account here</p>
          <button className="login__signInbutton">Create a new Account</button>
        </form>
      </div>
      <p>Note by clicking login you agree to our terms and conditions</p>
    </div>
  );
}
