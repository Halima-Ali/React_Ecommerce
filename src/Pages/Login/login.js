import React from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { auth } from "../.././firebase";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    console.log("logged In");
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function signUp(e) {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
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
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Paasword</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login__button" onClick={login}>
            Login
          </button>
          <p>If you don't have an account, create an account here</p>
          <button className="login__signUpbutton" onClick={signUp}>
            Create a new Account
          </button>
        </form>
      </div>
      <p>Note by clicking login you agree to our terms and conditions</p>
    </div>
  );
}
