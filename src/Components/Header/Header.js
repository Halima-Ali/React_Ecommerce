import React from "react";
import "./header.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {Link} from "react-router-dom"
import { useStateValue } from "../../Context/StateProvider";
import { auth } from "../../firebase";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {

  const [state, dispatch] = useStateValue();

  

  function signOut() {
    if (state.user) {
      auth.signOut();
    }
  }

  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="header__logo">
          <ShoppingBagIcon className="header__logoIcon" />
          <span>
            Shop<span className="orange">Cart</span>
          </span>
        </div>
      </Link>
      <div className="header__search">
        <input
          className="header__searchInput"
          type="text"
          placeholder="Search Product"
        />
        <SearchOutlinedIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <div className="header__option">
          <PersonOutlineOutlinedIcon className="header__optionIcon" />
          <span>{state.user ? state.user.email : "Guest"}</span>
        </div>
        <Link to={!state.user && "/login"} style={{ textDecoration: "none" }}>
          <div className="header__option" onClick={signOut}>
            {state.user ? (
              <LogoutIcon className="header__optionIcon" />
            ) : (
              <LoginIcon className="header__optionIcon" />
            )}
            <span>{state.user ? "Sign Out" : "Sign In"}</span>
          </div>
        </Link>
        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <div className="header__option">
            <ShoppingCartOutlinedIcon className="header__optionIcon" />
            <span>Cart</span>
            {state.basket.length > 0 && (
              <div className="header__optionCartNo">{state.basket.length}</div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
