import { useEffect, useState } from "react";
import { Guitar } from "./components/Guitar.jsx";
import { Header } from "./components/Header.jsx";
import { db } from "./data/db.js";

function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data, setData] = useState(db);

  const [cart, setCart] = useState(initialCart); //carrito vacio

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    //

    // "SI" Existe => -1  - NO EXISTE nos dara la posicion del indice del
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id); //findIndex === retorna 1er INDICE k cumple y si no cumple retorna -1
    //Existe en el carrito
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      const updateCart = [...cart]; // copia carrito actual
      updateCart[itemExists].quantity++; //Incrementa la cantidad del ítem en el carrito EN EL INDICE ENCONTRADO.
      setCart(updateCart); // Actualiza el estado del carrito.
    } else {
      // -1 == -1
      item.quantity = 1;
      setCart([...cart, item]);
    }
  };

  function removeFromCard(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id) {
    const updateQuantity = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updateQuantity);
  }

  function decreaseQuantity(id) {
    const updateQuantity = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updateQuantity);
  }

  function cleartCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCard={removeFromCard}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleartCart={cleartCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitarla) => (
            <Guitar guitar={guitarla} key={guitarla.id} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
