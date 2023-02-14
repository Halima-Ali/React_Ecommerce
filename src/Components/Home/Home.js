import React from "react"
import { ProductData } from "../../Data/Product"
import "./home.css"
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "../../Context/StateProvider";
import { Link } from "react-router-dom";
import {nanoid} from "nanoid"

export default function Home() {

  const [state, dispatch] = useStateValue();
  
  const dataElement = ProductData.map((item) => {
    return (
      <div className="card" key={item.id}>
        <Link to={`/product/${item.id}`} style={{textDecoration:"none"}}>
          <img className="card__image" src={item.image} alt="item" />
          <div className="card__title">
            <p>{item.title}</p>
            <p>$ {item.price}</p>
          </div>
          <p className="card__description">{item.description}</p>
          <div className="card__rating">
            {Array(item.rating)
              .fill()
              .map((_, i) => {
                return (
                  <p key={nanoid()}>
                    <StarIcon fontSize="small" />
                  </p>
                );
              })}
            (121)
          </div>
        </Link>
        <button className="card__button" onClick={() => addToCart(item.id)}>
          Add to Cart
        </button>
      </div>
    );
  });

  function addToCart(id) {
    const product = ProductData.filter((item) => item.id === id);
    const itemProduct = product[0];
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        ...itemProduct
      },
    });    
  }


 return (
   <div className="home">
   <div className="home__title">
    <h2>Popular Picks</h2>
    <p>See All</p>
     </div>
     <div className="cards">{dataElement}</div>
   </div>
 );
}