import React from "react"
import "./productDetail.css"
import { useState } from "react";
import { useParams } from "react-router"
import { ProductData } from "../../Data/Product";
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "../../Context/StateProvider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ProductDetail() {
 const { productId } = useParams();
 const selectedProduct = ProductData.find((item) => item.id === productId);
 const [state, dispatch] = useStateValue();
 const [counter, setCounter] = useState(0);

  function addToCart() {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        ...selectedProduct,
      },
    });
 }
 
 function incrementCounter() {
  setCounter(prevState => {
   return prevState+1
  })
 }

  function decrementCounter() {
   setCounter((prevState) => {
     if(prevState>0){
     return prevState - 1;
    }
     else {
      return 0;
    }
    });
  }

 console.log(counter)


 return (
   <div className="details">
     <div className="details__left">
       <img src={selectedProduct.image} alt="productdetails" />
     </div>
     <div className="details__right">
       <div className="details__info">
         <h3>{selectedProduct.title}</h3>
         <p>{selectedProduct.description}</p>
         <div className="details__rating">
           {Array(selectedProduct.rating)
             .fill()
             .map((_, i) => {
               return (
                 <p>
                   <StarIcon fontSize="small" />
                 </p>
               );
             })}
           (121)
         </div>
       </div>
       <div className="details__info">
         <h4>
           {selectedProduct.price}/{(selectedProduct.price / 6).toFixed(2)} per
           month
         </h4>
         <p>Suggested Payments with 6 months special financing</p>
       </div>
       <div className="details__buttons">
         <div className="details__number">
           <RemoveIcon className="details_icon" onClick={decrementCounter} />
           {counter}
           <AddIcon className="details__icon" onClick={incrementCounter} />
         </div>
         <button className="details__button" onClick={addToCart}>
           Add to Cart
         </button>
       </div>
     </div>
   </div>
 );
}