import React from "react"
import { ProductData } from "../../Data/Product"
import "./home.css"
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "../../Context/StateProvider";
import { Link } from "react-router-dom";
import {nanoid} from "nanoid"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Home() {
  const [state, dispatch] = useStateValue();

  // filter menu
  // find all categories in data
  const allCategories = [
    "all",
    ...new Set(ProductData.map((product) => product.category)),
  ];
  const [products, setProducts] = React.useState(ProductData);

  function filterItems(category) {
    if(category === "all"){
      setProducts(ProductData);
      return;
    }
    const filteredProduct = ProductData.filter((item) => item.category === category);
    setProducts(filteredProduct);
  }

  const dataElement = products.map((item) => {
    return (
      <div className="card" key={item.id}>
        <Link to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
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
      number: 1,
      item: {
        ...itemProduct,
      },
    });
  }

  return (
    <div className="home">
      <div className="home__categories">
        {allCategories.map((category) => {
          return (
            <div>
              <button
                className="home__categoriesButtons"
                key={category}
                onClick={() => filterItems(category)}
              >
                {category}
              </button>
              <ExpandMoreIcon className="home__categoriesIcon" />
            </div>
          );
        })}
      </div>
      <div className="home__title">
        <h2>Popular Picks</h2>
        <p>See All</p>
      </div>
      <div className="cards">{dataElement}</div>
    </div>
  );
}