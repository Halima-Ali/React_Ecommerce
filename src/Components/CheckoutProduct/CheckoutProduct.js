import React from "react"
import "./checkoutProduct.css";
// import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useStateValue } from "../../Context/StateProvider";


export default function CheckoutProduct(props) {
  const [state, dispatch] = useStateValue();
  
  function addItem() {
    dispatch({
      type: "ADD_TO_BASKET",
      number: 1,
      item: {
        id: props.id,
        description: props.description,
        title:props.title,            
        image:props.image,
        category:props.category,
        price:props.price,
        rating:props.rating,
      },
    });
  }

  function deleteItem() {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: props.id
    })
  }

 return (
   <div className="checkoutProduct">
     <img
       src={props.image}
       alt="checkoutProduct"
       className="checkoutProduct__image"
     />
     <div className="checkoutProduct__info">
       <div>
         <h3>{props.title}</h3>
         <p>{props.category}</p>
       </div>
       <div>
         <h4>${props.price}</h4>
         <p>
           Quantity : <strong>{props.quantity}</strong>
         </p>
       </div>
     </div>
     <div className="checkoutProduct__number">
       <RemoveIcon className="checkoutProduct_icon" onClick={deleteItem} />
       {props.quantity}
       <AddIcon className="checkoutProduct__icon" onClick={addItem} />
     </div>
   </div>
 );
}

    //  <DeleteIcon className="checkoutProduct__delete" />;
