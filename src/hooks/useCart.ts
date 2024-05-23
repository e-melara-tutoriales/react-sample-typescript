import {useState, useEffect, useMemo } from 'react';

import { db } from "../db/db";
import type { CartItem, Guitarra, GuitarraId } from '../types';

const MAX_QUANTITY = 5;
const MIN_QUANTITY = 1;

const useCart = () => {
  const initialState = () : CartItem[] => {
    let carritoStorage : string = localStorage.getItem("carrito") || "[]";
    if (carritoStorage) {
      return JSON.parse(carritoStorage as string) as CartItem[];
    }
    return [];
  };

  const [guitarras] = useState<Guitarra[]>(db);
  const [carrito, setCarrito] = useState<CartItem[]>(initialState());
  
  const isEmptyCart = useMemo(() => carrito.length === 0, [carrito]);
  const total = useMemo(() => carrito.reduce((acc, item) => acc + item.price * item.quantity, 0), [carrito]);

  useEffect(() => {
    const state = initialState();
    setCarrito(state);
  }, []);

  useEffect(() => {
    saveLocalStorage();
  }, [carrito]);

  const incrementQuantity = (id: GuitarraId) : void => {
    const currentCart = [...carrito];
    const indexFind = currentCart.findIndex((item) => item.id === id);
    if (indexFind !== -1 && MAX_QUANTITY > currentCart[indexFind].quantity) {
      currentCart[indexFind].quantity += 1;
    }
    setCarrito(currentCart);
  };

  const decrementQuantity = (id: GuitarraId) : void => {
    const currentCart = [...carrito];
    const indexFind = currentCart.findIndex((item) => item.id === id);
    if (indexFind !== -1) {
      if (currentCart[indexFind].quantity > MIN_QUANTITY) {
        currentCart[indexFind].quantity -= 1;
      }
    }
    setCarrito(currentCart);
  };

  const handlerAddToCart = (guitarra : Guitarra) : void => {
    const currentCart = [...carrito];
    const indexFind = currentCart.findIndex((item) => item.id === guitarra.id);
    if (indexFind !== -1) {
      currentCart[indexFind].quantity += 1;
    } else {
      currentCart.push({ ...guitarra, quantity: 1 });
    }
    setCarrito(currentCart);
  };

  const removeGuitarra = (id : GuitarraId) : void => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const saveLocalStorage = () : void => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  const clearCart = () : void => {
    setCarrito([]);
  };

  return {
    carrito,
    guitarras,
    handlerAddToCart,
    removeGuitarra,
    clearCart,
    incrementQuantity,
    decrementQuantity,
    // state computed
    isEmptyCart,
    total,
  }
};

export default useCart;
