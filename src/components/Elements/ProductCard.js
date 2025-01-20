import { useState } from "react";
import { useEffect } from "react";
import {Link} from "react-router-dom";
import {useCart} from "../../context";
import {Rating} from "./Rating";

export const ProductCard = ({product}) => {
  const {cartList, addToCart, removeFromCart} = useCart();
  const [inCart, setInCart] = useState(false);
  const {id, name, overview, poster, price, rating, best_seller} = product;

  useEffect(() => {
    const productInCart = cartList.find(item => item.id === id)
  
    if(productInCart){
      setInCart(true);
    } else {
      setInCart(false);
    }

  }, [cartList, id]);
  
  return (
    <div className="m-3 max-w-sm bg-white rounded-lg borger border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/products/${id}`} className="relative">
        {best_seller && <span className="absolute top-4 left-2 bg-orange-500 bg-opacity-90 text-white rounded px-2">Best Seller</span> }
        <img className="rounded-t-lg w-full h-64" src={poster} alt={name} />
      </Link>
      <div className="p-5">
        <Link to={`/products/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>  
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{overview}</p>
        
        <div  className="flex items-center my-2">
        <Rating rating={rating} />
       
        </div>
        <p className="mt-4 flex justify-between">
          <span className="text-xl dark:text-gray-200">${price}</span>
         {inCart ? 
         (<button onClick={() => removeFromCart(product)} className="inline-flex flex-center px-2 py-3 rounded-lg bg-red-600 hover:bg-red-800 text-white" >Remove Item<i className="bi bi-dash"></i></button>) :
         (<button onClick = {() => addToCart(product)} className={`inline-flex flex-center px-3 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white ${product.in_stock ? "": "cursor-not-allowed"}  `}  disabled={ product.in_stock ? "" : "disabled" }>Add To Cart<i className="bi bi-plus"></i></button>)
         }
          
        
        </p>
      </div>
    </div>
    
  )
}


