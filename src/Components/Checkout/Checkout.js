import React from "react"
import "./checkout.css"
import { useStateValue } from "../../Context/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { nanoid } from "nanoid";
import Subtotal from "../Subtotal/Subtotal";

export default function Checkout() {
  const [state, dispatch] = useStateValue();
  
  const groupedData = {};

  console.log(state.basket)
  state.basket.forEach((item) => {
    const id = item.id;
    if (!groupedData[id]) {
      groupedData[id] = [];
    }
    groupedData[id].push(item);
  });

  console.log(groupedData); 

 return (
   <div className="checkout">
     <div className="checkout__left">
       <h2 className="checkout__title">Your Shopping Cart</h2>
       {
         Object.values(groupedData).map(item => {
           return (
             <CheckoutProduct
               key={nanoid()}
               id={item[0].id}
               description={item[0].description}
               title={item[0].title}
               image={item[0].image}
               category={item[0].category}
               price={item[0].price}
               quantity={item.length}
               rating ={item.rating}
             />
          )
        })
       }               
     </div>
     <div className="checkout__right">
       <Subtotal />
     </div>
   </div>
 );
}