import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducers";

const cartInitialState = {
    cartList: [],
    total: 0,
}

const cartContext = createContext(cartInitialState);

export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer,cartInitialState);

    function addToCart(product){
        const updatedList = state.cartList.concat(product);
        const updatedtotal = state.total + product.price;

        dispatch({
            type : "ADD_TO_CART",
            payload:{
                products : updatedList,
                total: updatedtotal 
            }
        })
    }

    function removeFromCart(product){
        const updatedList = state.cartList.filter((item)=> item.id !== product.id);
        const updatedtotal = state.total - product.price 

        dispatch({
            type : "REMOVE_FROM_CART",
            payload : {
                products:updatedList,
                total:updatedtotal
            }
        })
    }

    function clearCart(){
        dispatch({
            type : "CLEAR_CART",
            payload: {
                products : [],
                total:0
            }
        })
    }


    const value = {
        cartList : state.cartList,
        total : state.total,
        addToCart,
        removeFromCart,
        clearCart
    }

    return(
        <cartContext.Provider value={value}>
            {children}
        </cartContext.Provider>
    )
}
    export const useCart = () => {
        const context = useContext(cartContext);
        return context;
    }
