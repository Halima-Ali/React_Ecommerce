import React from "react";
import "./header.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {Link} from "react-router-dom"
import { useStateValue } from "../../Context/StateProvider";

export default function Header() {

  const [state, dispatch] = useStateValue();

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
          <span>Account</span>
        </div>
        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <div className="header__option">
            <ShoppingCartOutlinedIcon className="header__optionIcon" />
            <span>Cart</span>
            {state.basket.length>0 && (
              <div className="header__optionCartNo">{state.basket.length}</div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
